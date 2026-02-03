import { ref, onMounted } from 'vue'
import { useApi } from './useApi'

export function useComments(postId: number) {
  const api = useApi()
  const comments = ref<any[]>([])
  const loading = ref(true)
  const submitting = ref(false)

  async function loadComments() {
    loading.value = true
    try {
      const response = await api.getComments(postId)
      comments.value = response.data || []
    } catch (error) {
      console.error('Failed to load comments:', error)
    } finally {
      loading.value = false
    }
  }

  async function submitComment(data: {
    author_name: string
    author_email: string
    content: string
  }) {
    submitting.value = true
    try {
      const response = await api.createComment({
        post_id: postId,
        ...data,
      })
      if (response.success) {
        // Comment will be visible after moderation
        return { success: true, message: 'Comment submitted for moderation' }
      }
      return { success: false, error: response.error || 'Failed to submit comment' }
    } catch (error) {
      return { success: false, error: 'Network error' }
    } finally {
      submitting.value = false
    }
  }

  onMounted(() => {
    loadComments()
  })

  return {
    comments,
    loading,
    submitting,
    submitComment,
    loadComments,
  }
}
