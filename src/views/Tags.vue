<template>
  <div class="tags">
    <h1>文章标签</h1>
    <div class="tags-cloud">
      <router-link 
        v-for="tag in tags" 
        :key="tag.id" 
        :to="`/tag/${tag.id}`" 
        class="tag-item"
        :style="{ fontSize: `${14 + tag.count * 2}px` }"
      >
        {{ tag.name }} <span class="tag-count">({{ tag.count }})</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tags = ref([
  { id: 1, name: 'Vue', count: 3 },
  { id: 2, name: 'TypeScript', count: 2 },
  { id: 3, name: '性能优化', count: 1 },
  { id: 4, name: '学习方法', count: 1 },
  { id: 5, name: '前端', count: 4 },
  { id: 6, name: 'React', count: 1 },
  { id: 7, name: '趋势', count: 1 }
])

onMounted(() => {
  // 实际项目中，这里会从后端获取数据
})
</script>

<style scoped>
.tags {
  padding: 2rem 0;
}

.tags h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.tags-cloud {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tag-item {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.tag-item:hover {
  background-color: #007bff;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tag-count {
  font-size: 0.8em;
  opacity: 0.8;
  margin-left: 0.25rem;
}

@media (max-width: 768px) {
  .tags-cloud {
    padding: 2rem;
    gap: 0.5rem;
  }
  
  .tag-item {
    padding: 0.4rem 0.8rem;
  }
}
</style>
