// 认证服务配置
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-api.onrender.com/api' 
  : 'http://localhost:5000/api';

// 基础请求函数
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 添加认证头
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || '请求失败');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API请求失败:', error);
    // 模拟数据作为fallback
    return useMockAuthData(endpoint, options);
  }
}

// 模拟认证数据
function useMockAuthData(endpoint, options) {
  // 模拟用户数据
  const mockUsers = [
    {
      id: 1,
      name: '管理员',
      email: 'admin@example.com',
      createdAt: '2026-01-01T00:00:00.000Z'
    }
  ];
  
  // 模拟登录
  if (endpoint === '/auth/login' && options.method === 'POST') {
    const { email, password } = JSON.parse(options.body);
    if (email === 'admin@example.com' && password === 'admin123') {
      return {
        token: 'mock-token-123',
        user: mockUsers[0]
      };
    }
    throw new Error('邮箱或密码错误');
  }
  
  // 模拟获取用户列表
  if (endpoint === '/auth/users' && options.method === 'GET') {
    return mockUsers;
  }
  
  // 模拟注册
  if (endpoint === '/auth/register' && options.method === 'POST') {
    const userData = JSON.parse(options.body);
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return newUser;
  }
  
  // 模拟更新用户
  if (endpoint.match(/\/auth\/users\/\d+/) && options.method === 'PUT') {
    const userId = parseInt(endpoint.split('/').pop());
    const userData = JSON.parse(options.body);
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      return mockUsers[userIndex];
    }
    throw new Error('用户不存在');
  }
  
  // 模拟删除用户
  if (endpoint.match(/\/auth\/users\/\d+/) && options.method === 'DELETE') {
    const userId = parseInt(endpoint.split('/').pop());
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1);
      return { success: true };
    }
    throw new Error('用户不存在');
  }
  
  throw new Error('请求失败');
}

// 认证API
export const authApi = {
  // 登录
  login: (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  // 注册
  register: (userData) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  // 获取用户列表
  getUsers: () => request('/auth/users'),
  
  // 更新用户
  updateUser: (id, userData) => request(`/auth/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),
  
  // 删除用户
  deleteUser: (id) => request(`/auth/users/${id}`, {
    method: 'DELETE'
  }),
  
  // 检查认证状态
  checkAuth: () => request('/auth/check')
};
