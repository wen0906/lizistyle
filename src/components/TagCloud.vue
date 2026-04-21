<template>
  <div class="tag-cloud">
    <router-link
      v-for="tag in tags"
      :key="tag.id"
      :to="`/tag/${tag.id}`"
      class="tag"
    >
      {{ tag.name }}
      <span v-if="tag.count" class="tag-count">({{ tag.count }})</span>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: #007bff;
  color: #fff;
}

.tag-count {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>
