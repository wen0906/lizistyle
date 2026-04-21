<template>
  <div class="admin-tags">
    <div class="admin-header">
      <h1>标签管理</h1>
      <button @click="showCreateForm = true" class="create-btn">
        新建标签
      </button>
    </div>
    
    <div v-if="showCreateForm" class="tag-form">
      <h2>{{ editingTag ? '编辑标签' : '新建标签' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">标签名称</label>
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
    
    <div v-else class="tags-list">
      <div v-if="loading" class="loading">
        加载中...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
        <button @click="fetchTags" class="retry-btn">重试</button>
      </div>
      <div v-else>
        <table class="tags-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>标签名称</th>
              <th>文章数量</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag in tags" :key="tag.id">
              <td>{{ tag.id }}</td>
              <td>{{ tag.name }}</td>
              <td>{{ tag.count || 0 }}</td>
              <td>{{ formatDate(tag.createdAt) }}</td>
              <td class="actions">
                <button @click="editTag(tag)" class="edit-btn">编辑</button>
                <button @click="deleteTag(tag.id)" class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="tags.length === 0" class="empty">
          暂无标签
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'

const tags = ref([])
const loading = ref(false)
const error = ref(null)
const showCreateForm = ref(false)
const editingTag = ref(null)

const form = ref({
  name: ''
})

onMounted(() => {
  fetchTags()
})

const fetchTags = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await api.tags.getAll()
    tags.value = data
  } catch (err) {
    error.value = '获取标签列表失败'
    console.error('获取标签列表失败:', err)
  } finally {
    loading.value = false
  }
}

const editTag = (tag) => {
  editingTag.value = tag
  form.value = {
    name: tag.name
  }
  showCreateForm.value = true
}

const handleSubmit = async () => {
  try {
    loading.value = true
    if (editingTag.value) {
      await api.tags.update(editingTag.value.id, form.value)
    } else {
      await api.tags.create(form.value)
    }
    showCreateForm.value = false
    editingTag.value = null
    form.value = {
      name: ''
    }
    await fetchTags()
  } catch (err) {
    console.error('保存标签失败:', err)
  } finally {
    loading.value = false
  }
}

const deleteTag = async (id) => {
  if (confirm('确定要删除这个标签吗？')) {
    try {
      await api.tags.delete(id)
      await fetchTags()
    } catch (err) {
      console.error('删除标签失败:', err)
    }
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}
</script>

<style scoped>
.admin-tags {
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

.tag-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.tag-form h2 {
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

.tags-list {
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

.tags-table {
  width: 100%;
  border-collapse: collapse;
}

.tags-table th,
.tags-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tags-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.tags-table tr:hover {
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
  .admin-tags {
    padding: 1rem;
  }
  
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .tags-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
