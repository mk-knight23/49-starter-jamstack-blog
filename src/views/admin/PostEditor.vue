<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const route = useRoute()
const { authState } = useAuth()
const api = useApi()

const postId = computed(() => route.params.id as string)
const isEdit = computed(() => postId.value !== 'new')

const post = ref({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  author: 'M. Kazi',
  category: '',
  tags: '',
  featured: false,
  published: true,
  draft: false,
})

const loading = ref(false)
const saving = ref(false)
const error = ref('')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

onMounted(async () => {
  if (!authState.isAuthenticated) {
    router.push('/admin/login')
    return
  }

  if (isEdit.value) {
    loading.value = true
    try {
      const response = await fetch(`/api/posts/id/${postId.value}`)
      const data = await response.json()
      if (data.success) {
        post.value = {
          ...data.data,
          tags: Array.isArray(data.data.tags) ? data.data.tags.join(', ') : data.data.tags,
        }
      }
    } catch (err) {
      error.value = 'Failed to load post'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
})

async function handleSave() {
  error.value = ''
  saving.value = true

  if (!post.value.slug) {
    post.value.slug = slugify(post.value.title)
  }

  try {
    const postData = {
      ...post.value,
      tags: post.value.tags.split(',').map(t => t.trim()).filter(t => t),
    }

    let response
    if (isEdit.value) {
      response = await api.updatePost(parseInt(postId.value), postData)
    } else {
      response = await api.createPost(postData)
    }

    if (response.success) {
      router.push('/admin/posts')
    } else {
      error.value = response.error || 'Failed to save post'
    }
  } catch (err) {
    error.value = 'Failed to save post'
    console.error(err)
  } finally {
    saving.value = false
  }
}

function handleCancel() {
  router.push('/admin/posts')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-bold">{{ isEdit ? 'Edit Post' : 'New Post' }}</h1>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="text-gray-600">Loading...</div>
      </div>

      <div v-else class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSave" class="space-y-6">
          <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-md">
            {{ error }}
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              v-model="post.title"
              @input="post.slug = slugify(post.title)"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              v-model="post.slug"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              v-model="post.excerpt"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                v-model="post.author"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                v-model="post.category"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              v-model="post.tags"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content (Markdown) *</label>
            <textarea
              v-model="post.content"
              rows="20"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            ></textarea>
          </div>

          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input v-model="post.featured" type="checkbox" class="mr-2" />
              <span class="text-sm text-gray-700">Featured</span>
            </label>
            <label class="flex items-center">
              <input v-model="post.published" type="checkbox" class="mr-2" />
              <span class="text-sm text-gray-700">Published</span>
            </label>
            <label class="flex items-center">
              <input v-model="post.draft" type="checkbox" class="mr-2" />
              <span class="text-sm text-gray-700">Draft</span>
            </label>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="handleCancel"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Post' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
