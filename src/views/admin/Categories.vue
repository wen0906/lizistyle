<template>
  <div class="admin-categories">
    <div class="admin-header">
      <h1>分类管理</h1>
      <button @click="showCreateForm = true" class="create-btn">
        新建分类
      </button>
    </div>
    
    <div v-if="showCreateForm" class="category-form">
      <h2>{{ editingCategory ? '编辑分类' : '新建分类' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">分类名称</label>
          <input type="text" id="name" v-model="form.name" required>
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
    
    <div v-else class="categories-list">
      <div v-if="loading" class="loading">
        加载中...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
        <button @click="fetchCategories" class="retry-btn">重试</button>
      </div>
      <div v-else>
        <table class="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>分类名称</th>
              <th>文章数量</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>{{ category.count || 0 }}</td>
              <td>{{ formatDate(category.createdAt) }}</td>
              <td class="actions">
                <button @click="editCategory(category)" class="edit-btn">编辑</button>
                <button @click="deleteCategory(category.id)" class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="categories.length === 0" class="empty">
          暂无分类
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'

const categories = ref([])
const loading = ref(false)
const error = ref(null)
const showCreateForm = ref(false)
const editingCategory = ref(null)

const form = ref({
  name: ''
})

onMounted(() => {
  fetchCategories()
})

const fetchCategories = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await api.categories.getAll()
    categories.value = data
  } catch (err) {
    error.value = '获取分类列表失败'
    console.error('获取分类列表失败:', err)
  } finally {
    loading.value = false
  }
}

const editCategory = (category) => {
  editingCategory.value = category
  form.value = {
    name: category.name
  }
  showCreateForm.value = true
}

const handleSubmit = async () => {
  try {
    loading.value = true
    if (editingCategory.value) {
      await api.categories.update(editingCategory.value.id, form.value)
    } else {
      await api.categories.create(form.value)
    }
    showCreateForm.value = false
    editingCategory.value = null
    form.value = {
      name: ''
    }
    await fetchCategories()
  } catch (err) {
    console.error('保存分类失败:', err)
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (id) => {
  if (confirm('确定要删除这个分类吗？')) {
    try {
      await api.categories.delete(id)
      await fetchCategories()
    } catch (err) {
      console.error('删除分类失败:', err)
    }
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}
</script>

<style scoped>
.admin-categories {
  width: 100%;
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

.category-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.category-form h2 {
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

.categories-list {
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

.categories-table {
  width: 100%;
  border-collapse: collapse;
}

.categories-table th,
.categories-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.categories-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.categories-table tr:hover {
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

@media (max-width: 768px) {
  .admin-categories {
    padding: 1rem;
  }
  
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .categories-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
