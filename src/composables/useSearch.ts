import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import type { Post } from '@/utils/content/schema'
import { usePostsStore } from '@/stores/posts'

export function useSearch() {
  const postsStore = usePostsStore()
  const query = ref('')
  const results = ref<Post[]>([])
  const searching = ref(false)

  // Initialize Fuse.js index
  let fuse: Fuse<Post> | null = null

  async function initializeIndex() {
    await postsStore.initialize()
    const posts = postsStore.posts

    fuse = new Fuse(posts, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'excerpt', weight: 2 },
        { name: 'content', weight: 1 },
        { name: 'category', weight: 2 },
        { name: 'tags', weight: 2 },
      ],
      includeScore: true,
      threshold: 0.3,
      ignoreLocation: true,
    })
  }

  function search(q: string) {
    query.value = q

    if (!q.trim()) {
      results.value = []
      return
    }

    if (!fuse) {
      initializeIndex().then(() => search(q))
      return
    }

    searching.value = true
    const searchResults = fuse.search(q)
    results.value = searchResults.map(r => r.item)
    searching.value = false
  }

  function clearSearch() {
    query.value = ''
    results.value = []
  }

  const hasResults = computed(() => results.value.length > 0)
  const resultCount = computed(() => results.value.length)

  return {
    query,
    results,
    searching,
    hasResults,
    resultCount,
    search,
    clearSearch,
    initializeIndex,
  }
}
