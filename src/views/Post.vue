<template>
  <div class="post">
    <Loading v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" @retry="fetchPost" />
    <div v-else class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.createdAt || post.date) }}</span>
        <span>•</span>
        <router-link :to="`/category/${post.Category?.id || post.category?.id}`" class="post-category">
          {{ post.Category?.name || post.category?.name }}
        </router-link>
        <span>•</span>
        <span class="post-readcount">{{ post.readCount }} 阅读</span>
      </div>
      <div class="post-tags">
        <router-link
          v-for="tag in post.Tags || post.tags"
          :key="tag.id"
          :to="`/tag/${tag.id}`"
          class="post-tag"
        >
          {{ tag.name }}
        </router-link>
      </div>
      <div class="post-body">
        <div v-html="post.content"></div>
      </div>
      <div class="post-nav">
        <div class="prev-post" v-if="prevPost">
          <span>上一篇</span>
          <router-link :to="`/post/${prevPost.id}`">{{ prevPost.title }}</router-link>
        </div>
        <div class="next-post" v-if="nextPost">
          <span>下一篇</span>
          <router-link :to="`/post/${nextPost.id}`">{{ nextPost.title }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '../composables/useApi'
import Loading from '../components/Loading.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const route = useRoute()
const { articles } = useApi()

const post = ref({})
const prevPost = ref(null)
const nextPost = ref(null)
const loading = ref(true)
const error = ref(null)

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

async function fetchPost() {
  const postId = route.params.id
  try {
    loading.value = true
    error.value = null
    post.value = await articles.getById(postId)
    prevPost.value = post.value.prevPost || null
    nextPost.value = post.value.nextPost || null
  } catch (err) {
    error.value = '获取文章失败，请稍后重试'
    console.error('获取文章失败:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<style scoped>
.post {
  padding: 2rem 0;
}

.post-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.post-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.3;
}

.post-meta {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.post-category {
  color: #007bff;
  text-decoration: none;
}

.post-category:hover {
  text-decoration: underline;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.post-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  transition: all 0.2s ease;
}

.post-tag:hover {
  background-color: #007bff;
  color: #fff;
}

.post-body {
  line-height: 1.8;
  color: #333;
  margin-bottom: 3rem;
}

.post-body :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.post-body :deep(p) {
  margin-bottom: 1rem;
}

.post-body :deep(ul) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.post-body :deep(li) {
  margin-bottom: 0.5rem;
}

.post-body :deep(pre) {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.post-body :deep(code) {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
}

.post-nav {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.prev-post,
.next-post {
  flex: 1;
}

.prev-post {
  text-align: left;
  margin-right: 1rem;
}

.next-post {
  text-align: right;
  margin-left: 1rem;
}

.prev-post span,
.next-post span {
  display: block;
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 0.5rem;
}

.prev-post a,
.next-post a {
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
}

.prev-post a:hover,
.next-post a:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .post-content {
    padding: 1.5rem;
  }

  .post-title {
    font-size: 1.5rem;
  }

  .post-nav {
    flex-direction: column;
    gap: 1rem;
  }

  .prev-post,
  .next-post {
    text-align: left;
    margin: 0;
  }
}
</style>
