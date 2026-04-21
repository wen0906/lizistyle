<template>
  <div class="home">
    <Loading v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" @retry="fetchData" />
    <template v-else>
      <div class="row">
        <div class="col-main">
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />

          <nav v-if="totalPages > 1" class="pagination">
            <button
              class="page-btn"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              上一页
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              class="page-btn"
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button
              class="page-btn"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              下一页
            </button>
          </nav>
        </div>

        <Sidebar class="col-sidebar">
          <template #default>
            <div class="sidebar-section">
              <h3 class="sidebar-title">关于博主</h3>
              <p class="about-text">欢迎来到我的个人博客，这里记录了我的学习心得、技术分享和生活感悟。</p>
            </div>

            <div class="sidebar-section">
              <h3 class="sidebar-title">最新文章</h3>
              <ul class="sidebar-list">
                <li v-for="article in recentArticles" :key="article.id">
                  <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
                </li>
              </ul>
            </div>

            <div class="sidebar-section">
              <h3 class="sidebar-title">分类</h3>
              <ul class="sidebar-list">
                <li v-for="category in categories" :key="category.id">
                  <router-link :to="`/category/${category.id}`">
                    {{ category.name }}
                    <span class="count">({{ category.count || 0 }})</span>
                  </router-link>
                </li>
              </ul>
            </div>

            <div class="sidebar-section">
              <h3 class="sidebar-title">标签云</h3>
              <TagCloud :tags="tags" />
            </div>
          </template>
        </Sidebar>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from '../composables/useApi'
import ArticleCard from '../components/ArticleCard.vue'
import Sidebar from '../components/Sidebar.vue'
import TagCloud from '../components/TagCloud.vue'
import Loading from '../components/Loading.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const { articles: api, categories: catApi, tags: tagApi } = useApi()

const articles = ref([])
const recentArticles = ref([])
const categories = ref([])
const tags = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => Math.ceil(articles.value.length / pageSize))

async function fetchData() {
  try {
    loading.value = true
    error.value = null

    const [articlesData, categoriesData, tagsData] = await Promise.all([
      api.getAll(),
      catApi.getAll(),
      tagApi.getAll(),
    ])

    articles.value = articlesData
    recentArticles.value = articlesData.slice(0, 4).map(a => ({ id: a.id, title: a.title }))
    categories.value = categoriesData
    tags.value = tagsData
  } catch (err) {
    error.value = '获取数据失败，请稍后重试'
    console.error('获取数据失败:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
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

.col-main {
  grid-column: 1;
}

.col-sidebar {
  grid-column: 2;
}

.sidebar-section {
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.sidebar-title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #007bff;
}

.about-text {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.sidebar-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-list li {
  margin-bottom: 0.5rem;
}

.sidebar-list a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
}

.sidebar-list a:hover {
  color: #007bff;
}

.count {
  color: #999;
  font-size: 0.85rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

.page-btn.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }

  .col-sidebar {
    grid-column: 1;
  }
}
</style>
