import { ref, onMounted } from 'vue'

export function useFetchData(fetcher, options = {}) {
  const { immediate = true, onSuccess, onError } = options

  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null

    try {
      const result = await fetcher(...args)
      data.value = result
      if (onSuccess) onSuccess(result)
      return result
    } catch (err) {
      error.value = err.message
      if (onError) onError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function refresh() {
    return execute()
  }

  if (immediate) {
    onMounted(() => execute())
  }

  return {
    data,
    loading,
    error,
    execute,
    refresh,
  }
}
