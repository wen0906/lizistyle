<template>
  <div class="post">
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="onMounted" class="retry-btn">重试</button>
    </div>
    <div v-else class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-meta">
        <span class="post-date">{{ post.createdAt || post.date }}</span>
        <span>•</span>
        <router-link :to="`/category/${post.Category?.id || post.category?.id}`" class="post-category">{{ post.Category?.name || post.category?.name }}</router-link>
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
import { api } from '../services/api'

const route = useRoute()
const postId = route.params.id

const post = ref({})
const prevPost = ref(null)
const nextPost = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const postData = await api.articles.getById(postId)
    post.value = postData
    
    // 获取前后文章（实际项目中可以通过API获取）
    // 这里使用模拟数据
    if (postId === '1') {
      prevPost.value = null
      nextPost.value = {
        id: 2,
        title: '如何优化前端性能'
      }
    } else if (postId === '2') {
      prevPost.value = {
        id: 1,
        title: 'Vue 3 组合式 API 入门指南'
      }
      nextPost.value = {
        id: 3,
        title: 'TypeScript 高级类型技巧'
      }
    } else if (postId === '3') {
      prevPost.value = {
        id: 2,
        title: '如何优化前端性能'
      }
      nextPost.value = {
        id: 4,
        title: '个人成长：如何持续学习'
      }
    } else if (postId === '4') {
      prevPost.value = {
        id: 3,
        title: 'TypeScript 高级类型技巧'
      }
      nextPost.value = null
    }
  } catch (err) {
    error.value = '获取文章失败，请稍后重试'
    console.error('获取文章失败:', err)
    // 使用模拟数据作为 fallback
    useMockData()
  } finally {
    loading.value = false
  }
})

// 模拟数据作为 fallback
function useMockData() {
  post.value = {
    id: postId,
    title: 'Vue 3 组合式 API 入门指南',
    createdAt: '2026-04-10',
    Category: { id: 1, name: '前端技术' },
    readCount: 120,
    Tags: [
      { id: 1, name: 'Vue' },
      { id: 5, name: '前端' }
    ],
    content: `
      <h2>什么是组合式 API？</h2>
      <p>组合式 API 是 Vue 3 引入的新特性，它允许我们使用函数式的方式组织组件逻辑，而不是通过选项式 API 的方式。</p>
      
      <h2>为什么使用组合式 API？</h2>
      <ul>
        <li>更好的代码组织</li>
        <li>更灵活的逻辑复用</li>
        <li>更好的类型推导</li>
        <li>更小的打包体积</li>
      </ul>
      
      <h2>基本使用</h2>
      <pre><code>import { ref, computed, onMounted } from 'vue'
      
export default {
        setup() {
          const count = ref(0)
          const doubleCount = computed(() => count.value * 2)
          
          const increment = () => {
            count.value++
          }
          
          onMounted(() => {
            console.log('组件挂载')
          })
          
          return {
            count,
            doubleCount,
            increment
          }
        }
      }</code></pre>
      
      <h2>组合式 API 的优势</h2>
      <p>组合式 API 最大的优势是可以将相关的逻辑组织在一起，而不是分散在不同的选项中。这使得代码更易于理解和维护，特别是对于大型组件。</p>
    `
  }
  
  prevPost.value = {
    id: 2,
    title: '如何优化前端性能'
  }
  
  nextPost.value = null
}
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
  transition: all 0.3s ease;
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

.post-body h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.post-body p {
  margin-bottom: 1rem;
}

.post-body ul {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.post-body li {
  margin-bottom: 0.5rem;
}

.post-body pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.post-body code {
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
  transition: color 0.3s ease;
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
