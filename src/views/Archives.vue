<template>
  <div class="archives">
    <h1>文章归档</h1>
    <div class="archives-list">
      <div v-for="(yearGroup, year) in groupedArticles" :key="year" class="year-group">
        <h2 class="year">{{ year }}</h2>
        <div class="month-group" v-for="(monthGroup, month) in yearGroup" :key="month">
          <h3 class="month">{{ month }}月</h3>
          <ul class="article-list">
            <li v-for="article in monthGroup" :key="article.id" class="article-item">
              <router-link :to="`/post/${article.id}`" class="article-link">
                <span class="article-date">{{ article.date }}</span>
                <span class="article-title">{{ article.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const articles = ref([
  {
    id: 1,
    title: 'Vue 3 组合式 API 入门指南',
    date: '2026-04-10',
    category: { id: 1, name: '前端技术' }
  },
  {
    id: 2,
    title: '如何优化前端性能',
    date: '2026-04-08',
    category: { id: 1, name: '前端技术' }
  },
  {
    id: 3,
    title: 'TypeScript 高级类型技巧',
    date: '2026-04-05',
    category: { id: 1, name: '前端技术' }
  },
  {
    id: 4,
    title: '个人成长：如何持续学习',
    date: '2026-04-01',
    category: { id: 2, name: '个人成长' }
  },
  {
    id: 5,
    title: '2026年前端发展趋势',
    date: '2026-03-25',
    category: { id: 1, name: '前端技术' }
  },
  {
    id: 6,
    title: 'React 18 新特性解析',
    date: '2026-03-10',
    category: { id: 1, name: '前端技术' }
  }
])

const groupedArticles = computed(() => {
  const grouped = {}
  
  articles.value.forEach(article => {
    const date = new Date(article.date)
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
  
  // 按年份降序排序
  return Object.fromEntries(
    Object.entries(grouped).sort(([yearA], [yearB]) => yearB - yearA)
  )
})

onMounted(() => {
  // 实际项目中，这里会从后端获取数据
})
</script>

<style scoped>
.archives {
  padding: 2rem 0;
}

.archives h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.archives-list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.year-group {
  margin-bottom: 2rem;
}

.year {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.month-group {
  margin-left: 1rem;
  margin-bottom: 1.5rem;
}

.month {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #666;
}

.article-list {
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

.article-date {
  color: #999;
  font-size: 0.9rem;
  margin-right: 1rem;
  min-width: 100px;
}

.article-title {
  flex: 1;
}

@media (max-width: 768px) {
  .archives-list {
    padding: 1rem;
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
</style>
