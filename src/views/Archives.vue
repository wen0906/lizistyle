<template>
  <div class="archives">
    <h1>文章归档</h1>
    <Loading v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" @retry="fetchArticles" />
    <div v-else class="archives-list">
      <div v-if="Object.keys(groupedArticles).length === 0" class="empty-state">
        <p>暂无文章</p>
      </div>
      <div v-else>
        <div v-for="(yearGroup, year) in groupedArticles" :key="year" class="year-group">
          <h2 class="year">{{ year }}年</h2>
          <div class="month-group" v-for="(monthGroup, month) in yearGroup" :key="month">
            <h3 class="month">{{ month }}月</h3>
            <ul class="article-list">
              <li v-for="article in monthGroup" :key="article.id" class="article-item">
                <router-link :to="`/post/${article.id}`" class="article-link">
                  <span class="article-date">{{ formatDate(article.createdAt || article.date) }}</span>
                  <span class="article-title">{{ article.title }}</span>
                  <span class="article-category">{{ article.Category?.name || article.category?.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from '../composables/useApi'
import Loading from '../components/Loading.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const { articles: api } = useApi()

const articles = ref([])
const loading = ref(true)
const error = ref(null)

const groupedArticles = computed(() => {
  const grouped = {}

  articles.value.forEach(article => {
    const date = new Date(article.createdAt || article.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    if (!grouped[year]) {
      grouped[year] = {}
    }

    if (!grouped[year][month]) {
      grouped[year][month] = []
    }

    grouped[year][month].push(article)
  })

  const sorted = {}
  Object.keys(grouped)
    .sort((a, b) => b - a)
    .forEach(year => {
      sorted[year] = {}
      Object.keys(grouped[year])
        .sort((a, b) => b - a)
        .forEach(month => {
          sorted[year][month] = grouped[year][month]
        })
    })

  return sorted
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getMonth() + 1}-${date.getDate()}`
}

async function fetchArticles() {
  try {
    loading.value = true
    error.value = null
    const data = await api.getAll()
    articles.value = data
  } catch (err) {
    error.value = '获取文章失败，请稍后重试'
    console.error('获取文章失败:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.archives {
  padding: 2rem 0;
  max-width: 900px;
  margin: 0 auto;
}

.archives h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
}

.archives-list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.year-group {
  margin-bottom: 2rem;
}

.year {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.month-group {
  margin-left: 1rem;
  margin-bottom: 1.5rem;
}

.month {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #666;
  font-weight: 500;
}

.article-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.article-item {
  margin-bottom: 0;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.article-item:last-child {
  border-bottom: none;
}

.article-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 0.25rem 0;
}

.article-link:hover {
  color: #667eea;
}

.article-date {
  color: #999;
  font-size: 0.9rem;
  margin-right: 1rem;
  min-width: 50px;
}

.article-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-category {
  color: #667eea;
  font-size: 0.85rem;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 1rem;
}

@media (max-width: 768px) {
  .archives {
    padding: 1rem;
  }

  .archives-list {
    padding: 1rem;
  }

  .month-group {
    margin-left: 0.5rem;
  }

  .article-link {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .article-date {
    margin-right: 0.5rem;
  }

  .article-category {
    margin-left: 0;
    order: -1;
  }
}
</style>
