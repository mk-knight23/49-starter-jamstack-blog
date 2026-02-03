<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useComments } from '@/composables/useComments'
import { useAnalytics } from '@/composables/useAnalytics'
import { ArrowLeft, Clock, Share2, Bookmark, Calendar } from 'lucide-vue-next'
import CommentForm from '@/components/comments/CommentForm.vue'
import CommentList from '@/components/comments/CommentList.vue'

const route = useRoute()
const router = useRouter()
const store = usePostsStore()

const post = computed(() => {
  const id = route.params.id as string
  return store.posts.find(p => p.id === id)
})

const readingProgress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = (scrollTop / docHeight) * 100
}

onMounted(async () => {
  await store.initialize()
  window.addEventListener('scroll', updateProgress)
})

const goBack = () => router.push('/')

// Comments
const postIdNumber = computed(() => {
  // Try to convert ID to number, if it's already a string ID use a hash
  const id = route.params.id as string
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return hash
})

const { comments, loading: commentsLoading, submitComment } = useComments(postIdNumber.value)

// Analytics
useAnalytics(postIdNumber.value)

async function handleSubmitComment(data: { author_name: string; author_email: string; content: string }) {
  const result = await submitComment(data)
  if (result.success) {
    alert(result.message)
  } else {
    alert(result.error || 'Failed to submit comment')
  }
}
</script>

<template>
  <div v-if="post" class="writer-container">
    <!-- Reading Progress Bar -->
    <div
      class="reading-progress"
      :style="{ transform: `scaleX(${readingProgress / 100})` }"
    ></div>

    <article class="space-y-12">
      <!-- Back Button -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-sm text-writer-muted hover:text-writer-accent transition-colors"
      >
        <ArrowLeft :size="16" />
        Back to articles
      </router-link>

      <!-- Header -->
      <header class="space-y-6">
        <div class="flex items-center gap-4">
          <router-link
            :to="`/categories/${post.category}`"
            class="writer-tag"
          >
            {{ post.category }}
          </router-link>
          <div class="flex items-center gap-4 text-sm text-writer-muted">
            <span class="flex items-center gap-1.5">
              <Calendar :size="14" />
              {{ post.date }}
            </span>
            <span class="flex items-center gap-1.5">
              <Clock :size="14" />
              {{ post.readTimeCalc }}
            </span>
          </div>
        </div>

        <h1 class="writer-heading-display text-5xl md:text-7xl">
          {{ post.title }}
        </h1>

        <div class="flex items-center justify-between py-6 border-y border-writer-border dark:border-writer-border-dark">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-writer-accent to-writer-accent-hover"></div>
            <div>
              <p class="font-medium text-writer-text dark:text-writer-text-dark">{{ post.author }}</p>
              <p class="text-sm text-writer-muted">Author</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="p-2 rounded-lg text-writer-muted hover:text-writer-accent hover:bg-writer-bg dark:hover:bg-writer-bg-dark transition-colors"
              aria-label="Share post"
            >
              <Share2 :size="18" />
            </button>
            <button
              class="p-2 rounded-lg text-writer-muted hover:text-writer-accent hover:bg-writer-bg dark:hover:bg-writer-bg-dark transition-colors"
              aria-label="Bookmark post"
            >
              <Bookmark :size="18" />
            </button>
          </div>
        </div>
      </header>

      <!-- Tags -->
      <div v-if="post.tags" class="flex flex-wrap gap-2">
        <router-link
          v-for="tag in post.tags"
          :key="tag"
          :to="`/tags/${tag}`"
          class="writer-tag"
        >
          #{{ tag }}
        </router-link>
      </div>

      <!-- Content -->
      <div
        class="prose max-w-none"
        v-html="post.html"
      ></div>

      <!-- Footer -->
      <footer class="pt-16">
        <div class="writer-card p-12 text-center space-y-6">
          <h3 class="writer-heading text-3xl">Thanks for reading</h3>
          <p class="text-writer-muted max-w-md mx-auto">
            If you enjoyed this article, consider subscribing to get future posts delivered to your inbox.
          </p>
          <button class="writer-button">
            Subscribe to newsletter
          </button>
        </div>
      </footer>

      <!-- Related Posts -->
      <section v-if="post.tags" class="space-y-8">
        <h2 class="writer-heading text-2xl">Related articles</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <article
            v-for="relatedPost in store.posts
              .filter(p => p.id !== post.id && p.tags?.some(t => post.tags?.includes(t)))
              .slice(0, 2)"
            :key="relatedPost.id"
            class="writer-card p-6 group"
          >
            <router-link :to="`/post/${relatedPost.id}`" class="block space-y-3">
              <span class="writer-tag">{{ relatedPost.category }}</span>
              <h3 class="writer-heading text-xl group-hover:text-writer-accent transition-colors">
                {{ relatedPost.title }}
              </h3>
              <p class="text-sm text-writer-muted">{{ relatedPost.readTimeCalc }}</p>
            </router-link>
          </article>
        </div>
      </section>

      <!-- Comments Section -->
      <section class="space-y-8 pt-8 border-t border-writer-border dark:border-writer-border-dark">
        <h2 class="writer-heading text-2xl">Comments</h2>

        <!-- Comment Form -->
        <div class="writer-card p-6">
          <CommentForm @submit="handleSubmitComment" />
        </div>

        <!-- Comment List -->
        <CommentList :comments="comments" :loading="commentsLoading" />
      </section>
    </article>
  </div>

  <div v-else class="writer-container text-center py-20">
    <p class="text-xl text-writer-muted mb-4">Article not found</p>
    <router-link to="/" class="text-writer-accent hover:underline">
      Return to articles
    </router-link>
  </div>
</template>
