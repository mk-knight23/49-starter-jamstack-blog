<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const { authState, logout } = useAuth()
const api = useApi()

const stats = ref({
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
  pendingComments: 0,
  totalViews: 0,
})

const popularPosts = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  if (!authState.value.isAuthenticated) {
    router.push('/admin/login')
    return
  }

  try {
    const [postsRes, commentsRes, analyticsRes] = await Promise.all([
      api.getPosts(false),
      api.getPendingComments(),
      api.getAllAnalytics(),
    ])

    const posts = postsRes.data || []
    stats.value.totalPosts = posts.length
    stats.value.publishedPosts = posts.filter((p: any) => p.published).length
    stats.value.draftPosts = posts.filter((p: any) => p.draft).length
    stats.value.pendingComments = commentsRes.data?.length || 0
    stats.value.totalViews = analyticsRes.data?.reduce((sum: number, a: any) => sum + (a.page_views || 0), 0) || 0

    popularPosts.value = analyticsRes.data?.slice(0, 5) || []
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  } finally {
    loading.value = false
  }
})

async function handleLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8 py-4">
          <router-link to="/admin/dashboard" class="text-blue-600 font-medium">Dashboard</router-link>
          <router-link to="/admin/posts" class="text-gray-600 hover:text-gray-900">Posts</router-link>
          <router-link to="/admin/comments" class="text-gray-600 hover:text-gray-900">Comments</router-link>
          <router-link to="/admin/analytics" class="text-gray-600 hover:text-gray-900">Analytics</router-link>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="text-gray-600">Loading...</div>
      </div>

      <div v-else>
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-3xl font-bold text-blue-600">{{ stats.totalPosts }}</div>
            <div class="text-gray-600 mt-2">Total Posts</div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-3xl font-bold text-green-600">{{ stats.publishedPosts }}</div>
            <div class="text-gray-600 mt-2">Published</div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-3xl font-bold text-yellow-600">{{ stats.pendingComments }}</div>
            <div class="text-gray-600 mt-2">Pending Comments</div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-3xl font-bold text-purple-600">{{ stats.totalViews }}</div>
            <div class="text-gray-600 mt-2">Total Views</div>
          </div>
        </div>

        <!-- Popular Posts -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-bold">Popular Posts</h2>
          </div>
          <div class="p-6">
            <div v-if="popularPosts.length === 0" class="text-gray-600">
              No posts yet
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="post in popularPosts"
                :key="post.id"
                class="flex justify-between items-center"
              >
                <div>
                  <div class="font-medium">{{ post.title }}</div>
                  <div class="text-sm text-gray-600">{{ post.category }}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-blue-600">{{ post.page_views || 0 }}</div>
                  <div class="text-sm text-gray-600">views</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
