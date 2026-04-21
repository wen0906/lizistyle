<template>
  <aside class="sidebar">
    <div v-if="title" class="sidebar-section">
      <h3 class="sidebar-title">{{ title }}</h3>
      <slot />
    </div>
    <slot />
  </aside>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-section {
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.sidebar-title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #007bff;
}
</style>
