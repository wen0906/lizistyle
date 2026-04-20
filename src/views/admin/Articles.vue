<template>
  <div class="admin-articles">
    <div class="admin-header">
      <h1>文章管理</h1>
      <button @click="showCreateForm = true" class="create-btn">
        新建文章
      </button>
    </div>
    
    <div v-if="showCreateForm" class="article-form">
      <h2>{{ editingArticle ? '编辑文章' : '新建文章' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">标题</label>
          <input type="text" id="title" v-model="form.title" required>
        </div>
        <div class="form-group">
          <label for="content">内容</label>
          <textarea id="content" v-model="form.content" rows="10" required></textarea>
        </div>
        <div class="form-group">
          <label for="categoryId">分类</label>
          <select id="categoryId" v-model="form.categoryId" required>
            <option value="">选择分类</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>标签</label>
          <div class="tags-selector">
            <label v-for="tag in tags" :key="tag.id" class="tag-checkbox">
              <input type="checkbox" :value="tag.id" v-model="form.tagIds">
              {{ tag.name }}
            </label>
          </div>
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
    
    <div v-else class="articles-list">
      <div v-if="loading" class="loading">
        加载中...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
        <button @click="fetchArticles" class="retry-btn">重试</button>
      </div>
      <div v-else>
        <table class="articles-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>标题</th>
              <th>分类</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td>{{ article.id }}</td>
              <td>{{ article.title }}</td>
              <td>{{ article.Category?.name || '未分类' }}</td>
              <td>{{ formatDate(article.createdAt) }}</td>
              <td class="actions">
                <button @click="editArticle(article)" class="edit-btn">编辑</button>
                <button @click="deleteArticle(article.id)" class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="articles.length === 0" class="empty">
          暂无文章
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from '../../services/api'

const articles = ref([])
const categories = ref([])
const tags = ref([])
const loading = ref(false)
const error = ref(null)
const showCreateForm = ref(false)
const editingArticle = ref(null)

const form = ref({
  title: '',
  content: '',
  categoryId: '',
  tagIds: []
})

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  await Promise.all([
    fetchArticles(),
    fetchCategories(),
    fetchTags()
  ])
}

const fetchArticles = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await api.articles.getAll()
    articles.value = data
  } catch (err) {
    error.value = '获取文章列表失败'
    console.error('获取文章列表失败:', err)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const data = await api.categories.getAll()
    categories.value = data
  } catch (err) {
    console.error('获取分类失败:', err)
  }
}

const fetchTags = async () => {
  try {
    const data = await api.tags.getAll()
    tags.value = data
  } catch (err) {
    console.error('获取标签失败:', err)
  }
}

const editArticle = (article) => {
  editingArticle.value = article
  form.value = {
    title: article.title,
    content: article.content,
    categoryId: article.categoryId,
    tagIds: article.Tags?.map(tag => tag.id) || []
  }
  showCreateForm.value = true
}

const handleSubmit = async () => {
  try {
    loading.value = true
    if (editingArticle.value) {
      await api.articles.update(editingArticle.value.id, form.value)
    } else {
      await api.articles.create(form.value)
    }
    showCreateForm.value = false
    editingArticle.value = null
    form.value = {
      title: '',
      content: '',
      categoryId: '',
      tagIds: []
    }
    await fetchArticles()
  } catch (err) {
    console.error('保存文章失败:', err)
  } finally {
    loading.value = false
  }
}

const deleteArticle = async (id) => {
  if (confirm('确定要删除这篇文章吗？')) {
    try {
      await api.articles.delete(id)
      await fetchArticles()
    } catch (err) {
      console.error('删除文章失败:', err)
    }
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}
</script>

<style scoped>
.admin-articles {
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

.article-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.article-form h2 {
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

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
}

.tags-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tag-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
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

.articles-list {
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

.articles-table {
  width: 100%;
  border-collapse: collapse;
}

.articles-table th,
.articles-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.articles-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.articles-table tr:hover {
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
  .admin-articles {
    padding: 1rem;
  }
  
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .articles-table {
    display: block;
    overflow-x: auto;
  }
  
  .tag-checkbox {
    flex: 0 0 50%;
  }
}
</style>
