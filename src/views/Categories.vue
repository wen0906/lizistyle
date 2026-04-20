<template>
  <div class="categories">
    <h1>文章分类</h1>
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="onMounted" class="retry-btn">重试</button>
    </div>
    <div v-else class="categories-list">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <h2 class="category-name">{{ category.name }}</h2>
        <p class="category-count">{{ category.count }} 篇文章</p>
        <ul class="category-articles">
          <li v-for="article in category.articles" :key="article.id" class="article-item">
            <router-link :to="`/post/${article.id}`" class="article-link">
              <span class="article-title">{{ article.title }}</span>
              <span class="article-date">{{ article.createdAt || article.date }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../services/api'

const categories = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const categoriesData = await api.categories.getAll()
    categories.value = categoriesData
    
    // 为每个分类获取文章
    for (const category of categories.value) {
      try {
        const articlesData = await api.articles.getByCategory(category.id)
        category.articles = articlesData
      } catch (err) {
        console.error(`获取分类 ${category.name} 的文章失败:`, err)
        category.articles = []
      }
    }
  } catch (err) {
    error.value = '获取分类数据失败，请稍后重试'
    console.error('获取分类数据失败:', err)
    // 使用模拟数据作为 fallback
    useMockData()
  } finally {
    loading.value = false
  }
})

// 模拟数据作为 fallback
function useMockData() {
  categories.value = [
    {
      id: 1,
      name: '前端技术',
      count: 4,
      articles: [
        { id: 1, title: 'Vue 3 组合式 API 入门指南', createdAt: '2026-04-10' },
        { id: 2, title: '如何优化前端性能', createdAt: '2026-04-08' },
        { id: 3, title: 'TypeScript 高级类型技巧', createdAt: '2026-04-05' },
        { id: 5, title: '2026年前端发展趋势', createdAt: '2026-03-25' }
      ]
    },
    {
      id: 2,
      name: '个人成长',
      count: 1,
      articles: [
        { id: 4, title: '个人成长：如何持续学习', createdAt: '2026-04-01' }
      ]
    },
    {
      id: 3,
      name: '生活感悟',
      count: 0,
      articles: []
    }
  ]
}
</script>

<style scoped>
.categories {
  padding: 2rem 0;
}

.categories h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.category-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.category-name {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.category-count {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.category-articles {
  list-style: none;
}

.article-item {
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.article-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.article-link:hover {
  color: #007bff;
}

.article-title {
  flex: 1;
  margin-right: 1rem;
}

.article-date {
  color: #999;
  font-size: 0.8rem;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .categories-list {
    grid-template-columns: 1fr;
  }
  
  .article-link {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .article-date {
    margin-right: 0;
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
