<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const { authState } = useAuth()
const api = useApi()

const posts = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  if (!authState.isAuthenticated) {
    router.push('/admin/login')
    return
  }

  try {
    const response = await api.getPosts(false)
    posts.value = response.data || []
  } catch (error) {
    console.error('Failed to load posts:', error)
  } finally {
    loading.value = false
  }
})

async function handleDelete(id: number) {
  if (!confirm('Are you sure you want to delete this post?')) return

  try {
    await api.deletePost(id)
    posts.value = posts.value.filter(p => p.id !== id)
  } catch (error) {
    console.error('Failed to delete post:', error)
    alert('Failed to delete post')
  }
}

function handleEdit(id: number) {
  router.push(`/admin/posts/${id}/edit`)
}

function handleNew() {
  router.push('/admin/posts/new')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Posts</h1>
        <div class="space-x-4">
          <button
            @click="handleNew"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Post
          </button>
          <router-link to="/admin/dashboard" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Back to Dashboard
          </router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="text-gray-600">Loading...</div>
      </div>

      <div v-else class="bg-white rounded-lg shadow">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="post in posts" :key="post.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ post.title }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ post.category }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="post.published" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                  <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(post.created_at).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="handleEdit(post.id)" class="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button @click="handleDelete(post.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>
