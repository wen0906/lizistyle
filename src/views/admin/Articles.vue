<template>
  <div class="admin-articles">
    <div class="page-header">
      <div class="header-content">
        <h1>文章管理</h1>
        <p>管理您的博客文章，创建、编辑或删除文章</p>
      </div>
      <button @click="openCreateForm" class="create-btn">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>新建文章</span>
      </button>
    </div>
    
    <div v-if="showCreateForm" class="article-form-overlay" @click.self="closeForm">
      <div class="article-form">
        <div class="form-header">
          <h2>{{ editingArticle ? '编辑文章' : '新建文章' }}</h2>
          <button @click="closeForm" class="close-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7V4H20V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>文章标题</span>
            </label>
            <input type="text" id="title" v-model="form.title" required placeholder="请输入文章标题">
          </div>
          <div class="form-group">
            <label for="content">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="17" y1="10" x2="3" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="21" y1="6" x2="3" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="21" y1="14" x2="3" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="17" y1="18" x2="3" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>文章内容</span>
            </label>
            <textarea id="content" v-model="form.content" rows="12" required placeholder="请输入文章内容（支持HTML格式）"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="categoryId">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>选择分类</span>
              </label>
              <select id="categoryId" v-model="form.categoryId" required>
                <option value="">请选择分类</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="7" cy="7" r="1" fill="currentColor"/>
                </svg>
                <span>选择标签</span>
              </label>
              <div class="tags-selector">
                <label v-for="tag in tags" :key="tag.id" class="tag-checkbox" :class="{ active: form.tagIds.includes(tag.id) }">
                  <input type="checkbox" :value="tag.id" v-model="form.tagIds">
                  <span>{{ tag.name }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" @click="closeForm" class="cancel-btn">取消</button>
            <button type="submit" :disabled="loading" class="save-btn">
              <span v-if="!loading">保存文章</span>
              <span v-else>保存中...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <div class="articles-list">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
      <div v-else-if="error" class="error">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchArticles" class="retry-btn">重试</button>
      </div>
      <div v-else-if="articles.length === 0" class="empty">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>暂无文章</p>
        <button @click="openCreateForm" class="create-btn-small">创建第一篇文章</button>
      </div>
      <div v-else class="table-container">
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
              <td class="id-cell">#{{ article.id }}</td>
              <td class="title-cell">{{ article.title }}</td>
              <td>
                <span class="category-badge" :style="{ background: getCategoryColor(article.Category?.name) }">
                  {{ article.Category?.name || '未分类' }}
                </span>
              </td>
              <td class="date-cell">{{ formatDate(article.createdAt) }}</td>
              <td class="actions">
                <button @click="editArticle(article)" class="edit-btn" title="编辑">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button @click="deleteArticle(article.id)" class="delete-btn" title="删除">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

const categoryColors = {
  '前端技术': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  '个人成长': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  '生活感悟': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
}

const getCategoryColor = (name) => {
  return categoryColors[name] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}

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

const openCreateForm = () => {
  editingArticle.value = null
  form.value = {
    title: '',
    content: '',
    categoryId: '',
    tagIds: []
  }
  showCreateForm.value = true
}

const closeForm = () => {
  showCreateForm.value = false
  editingArticle.value = null
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
    closeForm()
    await fetchArticles()
  } catch (err) {
    console.error('保存文章失败:', err)
    alert('保存失败，请重试')
  } finally {
    loading.value = false
  }
}

const deleteArticle = async (id) => {
  if (confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
    try {
      await api.articles.delete(id)
      await fetchArticles()
    } catch (err) {
      console.error('删除文章失败:', err)
      alert('删除失败，请重试')
    }
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.admin-articles {
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-content h1 {
  margin: 0 0 0.5rem 0;
  color: #1a1a2e;
  font-size: 1.75rem;
  font-weight: 700;
}

.header-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.95rem;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  font-weight: 600;
}

.create-btn svg {
  width: 20px;
  height: 20px;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.article-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.article-form {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.form-header h2 {
  margin: 0;
  color: #1a1a2e;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #6c757d;
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #1a1a2e;
}

.article-form form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
  font-size: 0.95rem;
}

.form-group label svg {
  width: 18px;
  height: 18px;
  color: #667eea;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.tags-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.tag-checkbox input {
  display: none;
}

.tag-checkbox:hover {
  border-color: #667eea;
}

.tag-checkbox.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e9ecef;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #495057;
}

.cancel-btn:hover {
  background-color: #f8f9fa;
  border-color: #6c757d;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.save-btn:disabled {
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.articles-list {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.loading,
.error,
.empty {
  padding: 4rem;
  text-align: center;
  color: #6c757d;
}

.loading .spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e9ecef;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error svg,
.empty svg {
  width: 60px;
  height: 60px;
  color: #dee2e6;
  margin-bottom: 1rem;
}

.error p,
.empty p {
  margin: 0 0 1.5rem;
  font-size: 1.1rem;
}

.retry-btn,
.create-btn-small {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.retry-btn:hover,
.create-btn-small:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.table-container {
  overflow-x: auto;
}

.articles-table {
  width: 100%;
  border-collapse: collapse;
}

.articles-table th,
.articles-table td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.articles-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.articles-table tr:hover {
  background-color: #f8f9fa;
}

.id-cell {
  color: #6c757d;
  font-weight: 600;
  font-size: 0.9rem;
}

.title-cell {
  font-weight: 600;
  color: #1a1a2e;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-badge {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
}

.date-cell {
  color: #6c757d;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.edit-btn svg,
.delete-btn svg {
  width: 20px;
  height: 20px;
}

.edit-btn {
  color: #ffc107;
}

.edit-btn:hover {
  background: rgba(255, 193, 7, 0.1);
}

.delete-btn {
  color: #dc3545;
}

.delete-btn:hover {
  background: rgba(220, 53, 69, 0.1);
}

@media (max-width: 768px) {
  .admin-articles {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .articles-table th:nth-child(3),
  .articles-table td:nth-child(3) {
    display: none;
  }
}
</style>
