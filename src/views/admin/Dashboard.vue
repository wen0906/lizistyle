<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card articles">
        <div class="stat-bg"></div>
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">文章总数</span>
          <span class="stat-value">{{ stats.articles }}</span>
          <span class="stat-change positive">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            +12%
          </span>
        </div>
      </div>

      <div class="stat-card categories">
        <div class="stat-bg"></div>
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">分类总数</span>
          <span class="stat-value">{{ stats.categories }}</span>
          <span class="stat-change positive">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            +5%
          </span>
        </div>
      </div>

      <div class="stat-card tags">
        <div class="stat-bg"></div>
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="7" cy="7" r="1" fill="currentColor"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">标签总数</span>
          <span class="stat-value">{{ stats.tags }}</span>
          <span class="stat-change positive">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            +8%
          </span>
        </div>
      </div>

      <div class="stat-card users">
        <div class="stat-bg"></div>
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">用户总数</span>
          <span class="stat-value">{{ stats.users }}</span>
          <span class="stat-change neutral">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            0%
          </span>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-card welcome-card">
        <div class="welcome-greeting">
          <h2>早安，{{ user?.name || '管理员' }} ✨</h2>
          <p>今天有什么计划？来写一篇新文章吧！</p>
        </div>
        <div class="quick-actions">
          <router-link to="/admin/articles" class="action-btn primary">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            写文章
          </router-link>
          <router-link to="/" target="_blank" class="action-btn secondary">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21V9M21 3L14 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            查看博客
          </router-link>
        </div>
      </div>

      <div class="dashboard-card activity-card">
        <div class="card-header">
          <h3>最近活动</h3>
          <span class="badge">实时</span>
        </div>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-dot purple"></div>
            <div class="activity-content">
              <span class="activity-text">发布了新文章《Vue 3 组合式 API 入门指南》</span>
              <span class="activity-time">2小时前</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot blue"></div>
            <div class="activity-content">
              <span class="activity-text">更新了分类「前端技术」</span>
              <span class="activity-time">5小时前</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot green"></div>
            <div class="activity-content">
              <span class="activity-text">添加了新标签「JavaScript」</span>
              <span class="activity-time">昨天</span>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-card chart-card">
        <div class="card-header">
          <h3>文章发布趋势</h3>
        </div>
        <div class="chart-placeholder">
          <div class="chart-bars">
            <div class="chart-bar" style="--height: 60%">
              <span class="bar-label">一</span>
            </div>
            <div class="chart-bar" style="--height: 80%">
              <span class="bar-label">二</span>
            </div>
            <div class="chart-bar" style="--height: 45%">
              <span class="bar-label">三</span>
            </div>
            <div class="chart-bar" style="--height: 90%">
              <span class="bar-label">四</span>
            </div>
            <div class="chart-bar" style="--height: 65%">
              <span class="bar-label">五</span>
            </div>
            <div class="chart-bar" style="--height: 75%">
              <span class="bar-label">六</span>
            </div>
            <div class="chart-bar active" style="--height: 55%">
              <span class="bar-label">日</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'

const user = ref(JSON.parse(localStorage.getItem('user')))
const stats = ref({
  articles: 0,
  categories: 0,
  tags: 0,
  users: 1
})

onMounted(async () => {
  try {
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
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.stat-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
}

.stat-card.articles .stat-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card.categories .stat-bg {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-card.tags .stat-bg {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card.users .stat-bg {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.stat-card.articles .stat-icon {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  color: #667eea;
}

.stat-card.categories .stat-icon {
  background: linear-gradient(135deg, rgba(240, 147, 251, 0.2) 0%, rgba(245, 87, 108, 0.2) 100%);
  color: #f5576c;
}

.stat-card.tags .stat-icon {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%);
  color: #4facfe;
}

.stat-card.users .stat-icon {
  background: linear-gradient(135deg, rgba(67, 233, 123, 0.2) 0%, rgba(56, 249, 215, 0.2) 100%);
  color: #43e97b;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-content {
  position: relative;
  z-index: 1;
}

.stat-label {
  display: block;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
}

.stat-value {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-change {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.stat-change svg {
  width: 14px;
  height: 14px;
}

.stat-change.positive {
  color: #43e97b;
  background: rgba(67, 233, 123, 0.1);
}

.stat-change.neutral {
  color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.5rem;
}

.welcome-card {
  grid-column: 1 / 2;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.welcome-greeting h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.welcome-greeting p {
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
}

.quick-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: rgba(67, 233, 123, 0.2);
  color: #43e97b;
}

.activity-card {
  grid-column: 2 / 3;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 0.75rem;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.4rem;
  flex-shrink: 0;
}

.activity-dot.purple {
  background: #667eea;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.activity-dot.blue {
  background: #4facfe;
  box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
}

.activity-dot.green {
  background: #43e97b;
  box-shadow: 0 0 10px rgba(67, 233, 123, 0.5);
}

.activity-content {
  flex: 1;
}

.activity-text {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.chart-card {
  grid-column: 3 / 4;
}

.chart-placeholder {
  height: 160px;
  display: flex;
  align-items: flex-end;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
}

.chart-bar {
  flex: 1;
  height: var(--height);
  background: linear-gradient(180deg, rgba(102, 126, 234, 0.6) 0%, rgba(102, 126, 234, 0.1) 100%);
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  background: linear-gradient(180deg, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0.2) 100%);
}

.chart-bar.active {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
}

.bar-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }

  .welcome-card {
    grid-column: 1 / 3;
  }

  .chart-card {
    grid-column: 1 / 3;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .welcome-card,
  .activity-card,
  .chart-card {
    grid-column: 1;
  }

  .quick-actions {
    flex-direction: column;
  }
}
</style>
