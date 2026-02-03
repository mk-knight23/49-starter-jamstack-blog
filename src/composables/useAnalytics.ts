import { onMounted } from 'vue'
import { useApi } from './useApi'

const VIEWED_KEY = 'viewed_posts'

export function useAnalytics(postId: number) {
  const api = useApi()

  function getViewedPosts(): Set<number> {
    if (typeof window === 'undefined') return new Set()
    const viewed = localStorage.getItem(VIEWED_KEY)
    return viewed ? new Set(JSON.parse(viewed)) : new Set()
  }

  function saveViewedPosts(viewed: Set<number>): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(VIEWED_KEY, JSON.stringify(Array.from(viewed)))
  }

  async function trackPageView(): Promise<void> {
    const viewed = getViewedPosts()
    const isUnique = !viewed.has(postId)

    if (isUnique) {
      viewed.add(postId)
      saveViewedPosts(viewed)
    }

    try {
      await api.trackPageView(postId, isUnique)
    } catch (error) {
      console.error('Failed to track page view:', error)
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      trackPageView()
    }
  })

  return {
    trackPageView,
  }
}

export function usePopularPosts() {
  const api = useApi()

  async function getPopularPosts(limit = 10) {
    try {
      const response = await api.getPopularPosts(limit)
      return response.data || []
    } catch (error) {
      console.error('Failed to fetch popular posts:', error)
      return []
    }
  }

  return {
    getPopularPosts,
  }
}
