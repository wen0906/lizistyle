<template>
  <div class="home">
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="onMounted" class="retry-btn">重试</button>
    </div>
    <div v-else class="row">
      <div class="col-md-8">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <h2 class="article-title">
            <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
          </h2>
          <div class="article-meta">
            <span>{{ article.createdAt || article.date }}</span>
            <span>•</span>
            <router-link :to="`/category/${article.Category?.id || article.category?.id}`">{{ article.Category?.name || article.category?.name }}</router-link>
            <span>•</span>
            <span>{{ article.readCount }} 阅读</span>
          </div>
          <div class="article-excerpt">{{ article.excerpt }}</div>
          <router-link :to="`/post/${article.id}`" class="read-more">阅读更多 →</router-link>
        </div>
        
        <div class="pagination">
          <li class="page-item">
            <a href="#" class="page-link" :class="{ 'disabled': currentPage === 1 }">上一页</a>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item">
            <a href="#" class="page-link" :class="{ 'active': currentPage === page }" @click.prevent="currentPage = page">{{ page }}</a>
          </li>
          <li class="page-item">
            <a href="#" class="page-link" :class="{ 'disabled': currentPage === totalPages }">下一页</a>
          </li>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="sidebar">
          <h3 class="sidebar-title">关于博主</h3>
          <p>欢迎来到我的个人博客，这里记录了我的学习心得、技术分享和生活感悟。</p>
        </div>
        
        <div class="sidebar">
          <h3 class="sidebar-title">最新文章</h3>
          <ul class="sidebar-list">
            <li v-for="article in recentArticles" :key="article.id">
              <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
            </li>
          </ul>
        </div>
        
        <div class="sidebar">
          <h3 class="sidebar-title">分类</h3>
          <ul class="sidebar-list">
            <li v-for="category in categories" :key="category.id">
              <router-link :to="`/category/${category.id}`">{{ category.name }} ({{ category.count }})</router-link>
            </li>
          </ul>
        </div>
        
        <div class="sidebar">
          <h3 class="sidebar-title">标签云</h3>
          <div class="tag-cloud">
            <router-link v-for="tag in tags" :key="tag.id" :to="`/tag/${tag.id}`" class="tag">{{ tag.name }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../services/api'

const articles = ref([])
const recentArticles = ref([])
const categories = ref([])
const tags = ref([])
const loading = ref(true)
const error = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)

onMounted(async () => {
  try {
    loading.value = true
    // 并行请求数据
    const [articlesData, categoriesData, tagsData] = await Promise.all([
      api.articles.getAll(),
      api.categories.getAll(),
      api.tags.getAll()
    ])
    
    articles.value = articlesData
    recentArticles.value = articlesData.slice(0, 4).map(article => ({ id: article.id, title: article.title }))
    categories.value = categoriesData
    tags.value = tagsData
  } catch (err) {
    error.value = '获取数据失败，请稍后重试'
    console.error('获取数据失败:', err)
    // 使用模拟数据作为 fallback
    useMockData()
  } finally {
    loading.value = false
  }
})

// 模拟数据作为 fallback
function useMockData() {
  articles.value = [
    {
      id: 1,
      title: 'Vue 3 组合式 API 入门指南',
      date: '2026-04-10',
      Category: { id: 1, name: '前端技术' },
      readCount: 120,
      excerpt: 'Vue 3 的组合式 API 为我们提供了一种更灵活、更可维护的代码组织方式。本文将带你快速入门组合式 API 的核心概念和使用方法。'
    },
    {
      id: 2,
      title: '如何优化前端性能',
      date: '2026-04-08',
      Category: { id: 1, name: '前端技术' },
      readCount: 98,
      excerpt: '前端性能优化是一个永恒的话题。本文将从多个角度探讨如何提升前端应用的性能，包括代码分割、懒加载、缓存策略等。'
    },
    {
      id: 3,
      title: 'TypeScript 高级类型技巧',
      date: '2026-04-05',
      Category: { id: 1, name: '前端技术' },
      readCount: 156,
      excerpt: 'TypeScript 提供了强大的类型系统，本文将介绍一些高级类型技巧，帮助你写出更安全、更可维护的代码。'
    },
    {
      id: 4,
      title: '个人成长：如何持续学习',
      date: '2026-04-01',
      Category: { id: 2, name: '个人成长' },
      readCount: 87,
      excerpt: '在快速发展的技术领域，持续学习是保持竞争力的关键。本文分享一些个人学习方法和习惯，希望能对你有所帮助。'
    }
  ]
  
  recentArticles.value = articles.value.slice(0, 4).map(article => ({ id: article.id, title: article.title }))
  
  categories.value = [
    { id: 1, name: '前端技术', count: 3 },
    { id: 2, name: '个人成长', count: 1 },
    { id: 3, name: '生活感悟', count: 0 }
  ]
  
  tags.value = [
    { id: 1, name: 'Vue', count: 1 },
    { id: 2, name: 'TypeScript', count: 1 },
    { id: 3, name: '性能优化', count: 1 },
    { id: 4, name: '学习方法', count: 1 },
    { id: 5, name: '前端', count: 3 }
  ]
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.col-md-8 {
  grid-column: 1;
}

.col-md-4 {
  grid-column: 2;
}

.sidebar-list {
  list-style: none;
}

.sidebar-list li {
  margin-bottom: 0.5rem;
}

.sidebar-list a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.sidebar-list a:hover {
  color: #007bff;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
}

.tag:hover {
  background-color: #007bff;
  color: #fff;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }
  
  .col-md-4 {
    grid-column: 1;
  }
}

.loading,
.error {
  text-align: center;
  padding: 4rem 0;
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
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background-color: #0069d9;
}
</style>
