<template>
  <div class="about">
    <h1>关于我</h1>
    <div class="about-content">
      <div class="about-avatar">
        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20portrait%20avatar&image_size=square" alt="博主头像" class="avatar">
      </div>
      <div class="about-info">
        <h2>你好，我是一名前端开发者</h2>
        <p>我热爱前端技术，喜欢探索新的框架和工具。拥有多年的前端开发经验，专注于构建高性能、用户友好的Web应用。</p>
        <p>技术栈：Vue、React、TypeScript、Node.js、Webpack、Vite等</p>
        <p>除了编程，我还喜欢阅读、旅行和摄影。希望通过这个博客分享我的技术心得和生活感悟。</p>
        <div class="social-links">
          <a href="#" class="social-link">GitHub</a>
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
        </div>
      </div>
    </div>
    <div class="about-skills">
      <h3>技术技能</h3>
      <div class="skills-list">
        <div class="skill-item">
          <span class="skill-name">HTML/CSS</span>
          <div class="skill-bar">
            <div class="skill-progress" style="width: 95%"></div>
          </div>
        </div>
        <div class="skill-item">
          <span class="skill-name">JavaScript</span>
          <div class="skill-bar">
            <div class="skill-progress" style="width: 90%"></div>
          </div>
        </div>
        <div class="skill-item">
          <span class="skill-name">Vue</span>
          <div class="skill-bar">
            <div class="skill-progress" style="width: 85%"></div>
          </div>
        </div>
        <div class="skill-item">
          <span class="skill-name">TypeScript</span>
          <div class="skill-bar">
            <div class="skill-progress" style="width: 80%"></div>
          </div>
        </div>
        <div class="skill-item">
          <span class="skill-name">Node.js</span>
          <div class="skill-bar">
            <div class="skill-progress" style="width: 75%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// About.vue
</script>

<style scoped>
.about {
  padding: 2rem 0;
}

.about h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.about-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: flex-start;
}

.about-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.about-info {
  flex: 1;
}

.about-info h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.about-info p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #666;
}

.social-links {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.social-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #007bff;
  color: #fff;
}

.about-skills {
  margin-top: 3rem;
}

.about-skills h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: #333;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-name {
  font-weight: 500;
  color: #333;
}

.skill-bar {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: #007bff;
  border-radius: 4px;
  transition: width 1s ease;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>
