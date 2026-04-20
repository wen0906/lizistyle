<template>
  <div class="admin-users">
    <div class="admin-header">
      <h1>用户管理</h1>
      <button @click="showCreateForm = true" class="create-btn">
        新建用户
      </button>
    </div>
    
    <div v-if="showCreateForm" class="user-form">
      <h2>{{ editingUser ? '编辑用户' : '新建用户' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">用户名</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="form.password" :required="!editingUser">
        </div>
        <div class="form-actions">
          <button type="button" @click="showCreateForm = false" class="cancel-btn">
            取消
          </button>
          <button type="submit" :disabled="loading" class="save-btn">
            {{ loading ? '保存中...' : '保存' }}
          </button>
        </div>
      </form>
    </div>
    
    <div v-else class="users-list">
      <div v-if="loading" class="loading">
        加载中...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
        <button @click="fetchUsers" class="retry-btn">重试</button>
      </div>
      <div v-else>
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>邮箱</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td class="actions">
                <button @click="editUser(user)" class="edit-btn">编辑</button>
                <button @click="deleteUser(user.id)" class="delete-btn" :disabled="user.id === 1">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="users.length === 0" class="empty">
          暂无用户
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { authApi } from '../../services/auth'

const users = ref([])
const loading = ref(false)
const error = ref(null)
const showCreateForm = ref(false)
const editingUser = ref(null)

const form = ref({
  name: '',
  email: '',
  password: ''
})

onMounted(() => {
  fetchUsers()
})

const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await authApi.getUsers()
    users.value = data
  } catch (err) {
    error.value = '获取用户列表失败'
    console.error('获取用户列表失败:', err)
  } finally {
    loading.value = false
  }
}

const editUser = (user) => {
  editingUser.value = user
  form.value = {
    name: user.name,
    email: user.email,
    password: ''
  }
  showCreateForm.value = true
}

const handleSubmit = async () => {
  try {
    loading.value = true
    if (editingUser.value) {
      await authApi.updateUser(editingUser.value.id, form.value)
    } else {
      await authApi.register(form.value)
    }
    showCreateForm.value = false
    editingUser.value = null
    form.value = {
      name: '',
      email: '',
      password: ''
    }
    await fetchUsers()
  } catch (err) {
    console.error('保存用户失败:', err)
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id) => {
  if (id === 1) {
    alert('不能删除管理员账号')
    return
  }
  if (confirm('确定要删除这个用户吗？')) {
    try {
      await authApi.deleteUser(id)
      await fetchUsers()
    } catch (err) {
      console.error('删除用户失败:', err)
    }
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}
</script>

<style scoped>
.admin-users {
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}

.admin-header h1 {
  margin: 0;
  color: #333;
}

.create-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-btn:hover {
  background-color: #218838;
}

.user-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.user-form h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background-color: #f8f9fa;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-btn:hover {
  background-color: #0069d9;
}

.save-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.users-list {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.loading,
.error,
.empty {
  padding: 4rem;
  text-align: center;
  color: #666;
}

.error {
  color: #dc3545;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.users-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.users-table tr:hover {
  background-color: #f8f9fa;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn {
  padding: 0.5rem 1rem;
  background-color: #ffc107;
  color: #212529;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}

.delete-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .admin-users {
    padding: 1rem;
  }
  
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .users-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
