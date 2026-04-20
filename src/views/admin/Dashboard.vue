<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <h1>管理面板</h1>
      <div class="user-info">
        <span>{{ user?.name || '管理员' }}</span>
        <button @click="handleLogout" class="logout-btn">退出</button>
      </div>
    </div>
    <div class="admin-content">
      <div class="admin-sidebar">
        <nav>
          <ul>
            <li>
              <router-link to="/admin/articles">文章管理</router-link>
            </li>
            <li>
              <router-link to="/admin/categories">分类管理</router-link>
            </li>
            <li>
              <router-link to="/admin/tags">标签管理</router-link>
            </li>
            <li>
              <router-link to="/admin/users">用户管理</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="admin-main">
        <div class="dashboard-stats">
          <div class="stat-card">
            <h3>文章总数</h3>
            <p>{{ stats.articles }}</p>
          </div>
          <div class="stat-card">
            <h3>分类总数</h3>
            <p>{{ stats.categories }}</p>
          </div>
          <div class="stat-card">
            <h3>标签总数</h3>
            <p>{{ stats.tags }}</p>
          </div>
          <div class="stat-card">
            <h3>用户总数</h3>
            <p>{{ stats.users }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../services/api'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')))
const stats = ref({
  articles: 0,
  categories: 0,
  tags: 0,
  users: 1
})

onMounted(async () => {
  try {
    // 获取统计数据
    const [articles, categories, tags] = await Promise.all([
      api.articles.getAll(),
      api.categories.getAll(),
      api.tags.getAll()
    ])
    stats.value.articles = articles.length
    stats.value.categories = categories.length
    stats.value.tags = tags.length
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.admin-header {
  background: #343a40;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background: #c82333;
}

.admin-content {
  display: flex;
  min-height: calc(100vh - 72px);
}

.admin-sidebar {
  width: 200px;
  background: #212529;
  color: #fff;
  padding: 1rem 0;
}

.admin-sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.admin-sidebar nav ul li {
  margin: 0;
}

.admin-sidebar nav ul li a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.admin-sidebar nav ul li a:hover {
  background: #343a40;
}

.admin-sidebar nav ul li a.router-link-active {
  background: #007bff;
}

.admin-main {
  flex: 1;
  padding: 2rem;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #6c757d;
  font-size: 1rem;
  font-weight: 500;
}

.stat-card p {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #343a40;
}

@media (max-width: 768px) {
  .admin-content {
    flex-direction: column;
  }
  
  .admin-sidebar {
    width: 100%;
    padding: 1rem 0;
  }
  
  .admin-sidebar nav ul {
    display: flex;
    overflow-x: auto;
  }
  
  .admin-sidebar nav ul li {
    flex: 0 0 auto;
  }
  
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
}
</style>
