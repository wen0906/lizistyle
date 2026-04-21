<template>
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <p class="error-message">{{ message }}</p>
    <button v-if="showRetry" @click="$emit('retry')" class="retry-btn">
      重试
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '出错了，请稍后重试',
  },
  showRetry: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['retry'])
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1rem;
  text-align: center;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #dc3545;
  font-size: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background-color: #0069d9;
}
</style>
