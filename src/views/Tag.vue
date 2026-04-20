<template>
  <div class="tag">
    <h1>标签：{{ tag.name }}</h1>
    <div class="article-list">
      <div v-for="article in articles" :key="article.id" class="article-card">
        <h2 class="article-title">
          <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
        </h2>
        <div class="article-meta">
          <span>{{ article.date }}</span>
          <span>•</span>
          <router-link :to="`/category/${article.category.id}`">{{ article.category.name }}</router-link>
          <span>•</span>
          <span>{{ article.readCount }} 阅读</span>
        </div>
        <div class="article-excerpt">{{ article.excerpt }}</div>
        <router-link :to="`/post/${article.id}`" class="read-more">阅读更多 →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tagId = route.params.id

const tag = ref({
  id: 1,
  name: 'Vue'
})

const articles = ref([
  {
    id: 1,
    title: 'Vue 3 组合式 API 入门指南',
    date: '2026-04-10',
    category: { id: 1, name: '前端技术' },
    readCount: 120,
    excerpt: 'Vue 3 的组合式 API 为我们提供了一种更灵活、更可维护的代码组织方式。本文将带你快速入门组合式 API 的核心概念和使用方法。'
  }
])

onMounted(() => {
  // 实际项目中，这里会根据 tagId 从后端获取数据
})
</script>

<style scoped>
.tag {
  padding: 2rem 0;
}

.tag h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.article-title a {
  color: #333;
  text-decoration: none;
}

.article-title a:hover {
  color: #007bff;
}

.article-meta {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.article-meta a {
  color: #007bff;
  text-decoration: none;
}

.article-meta a:hover {
  text-decoration: underline;
}

.article-excerpt {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
