<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <router-link to="/" class="logo">个人博客</router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/about" class="nav-link">关于我</router-link>
          <router-link to="/archives" class="nav-link">归档</router-link>
          <router-link to="/categories" class="nav-link">分类</router-link>
          <router-link to="/tags" class="nav-link">标签</router-link>
        </nav>
      </div>
    </header>
    
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} 个人博客. 保留所有权利.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// App.vue
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-active {
  color: #007bff;
}

.main {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 2rem 0;
  margin-top: 2rem;
}

/* 文章卡片样式 */
.article-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
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

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.page-item {
  list-style: none;
}

.page-link {
  display: block;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
}

.page-link:hover, .page-link.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

/* 侧边栏样式 */
.sidebar {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.sidebar-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .main {
    padding: 1rem 0;
  }
}
</style>
