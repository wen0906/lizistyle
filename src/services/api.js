// API服务配置
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-api.onrender.com/api' 
  : 'http://localhost:5000/api';

// 通用请求方法
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 获取token
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API请求失败:', error);
    // 这里可以添加错误处理逻辑，比如显示错误提示
    throw error;
  }
}

// API方法
export const api = {
  // 文章相关
  articles: {
    getAll: () => request('/articles'),
    getById: (id) => request(`/articles/${id}`),
    getByCategory: (categoryId) => request(`/articles/category/${categoryId}`),
    getByTag: (tagId) => request(`/articles/tag/${tagId}`),
    create: (article) => request('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    }),
    update: (id, article) => request(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    }),
    delete: (id) => request(`/articles/${id}`, {
      method: 'DELETE',
    }),
  },
  
  // 分类相关
  categories: {
    getAll: () => request('/categories'),
    getById: (id) => request(`/categories/${id}`),
    create: (category) => request('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    }),
    update: (id, category) => request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    }),
    delete: (id) => request(`/categories/${id}`, {
      method: 'DELETE',
    }),
  },
  
  // 标签相关
  tags: {
    getAll: () => request('/tags'),
    getById: (id) => request(`/tags/${id}`),
    create: (tag) => request('/tags', {
      method: 'POST',
      body: JSON.stringify(tag),
    }),
    update: (id, tag) => request(`/tags/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tag),
    }),
    delete: (id) => request(`/tags/${id}`, {
      method: 'DELETE',
    }),
  },
  
  // 健康检查
  health: () => request('/health'),
};
