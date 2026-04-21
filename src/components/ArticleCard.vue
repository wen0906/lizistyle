<template>
  <article class="article-card">
    <h2 class="article-title">
      <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
    </h2>
    <div class="article-meta">
      <span>{{ formatDate(article.createdAt || article.date) }}</span>
      <span>•</span>
      <router-link :to="`/category/${article.Category?.id || article.category?.id}`">
        {{ article.Category?.name || article.category?.name }}
      </router-link>
      <span>•</span>
      <span>{{ article.readCount }} 阅读</span>
    </div>
    <p class="article-excerpt">{{ article.excerpt }}</p>
    <router-link :to="`/post/${article.id}`" class="read-more">阅读更多 →</router-link>
  </article>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>

<style scoped>
.article-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.article-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  line-height: 1.3;
}

.article-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
}

.article-title a:hover {
  color: #007bff;
}

.article-meta {
  color: #999;
  font-size: 0.875rem;
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
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.read-more:hover {
  color: #0056b3;
}
</style>
