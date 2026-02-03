<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { ArrowLeft, Clock, Folder } from 'lucide-vue-next'

const route = useRoute()
const store = usePostsStore()

const category = computed(() => route.params.category as string)
const posts = computed(() =>
  store.posts.filter(p => p.category.toLowerCase() === category.value.toLowerCase())
)

onMounted(async () => {
  await store.initialize()
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-8 py-16 space-y-12">
    <router-link
      to="/"
      class="inline-flex items-center gap-2 text-sm text-cinema-muted hover:text-cinema-gold transition-colors"
    >
      <ArrowLeft :size="16" />
      Back to Home
    </router-link>

    <header class="space-y-4">
      <div class="flex items-center gap-3">
        <Folder class="text-cinema-gold" :size="24" />
        <h1 class="text-5xl font-display font-black">
          <span class="text-cinema-gold">{{ category }}</span>
        </h1>
      </div>
      <p class="font-mono text-sm text-cinema-muted">
        {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }} in this category
      </p>
    </header>

    <div class="space-y-8">
      <article
        v-for="post in posts"
        :key="post.id"
        class="group cursor-pointer cinema-card p-8 hover:border-cinema-gold/30"
      >
        <router-link :to="`/post/${post.id}`" class="block space-y-4">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xs text-cinema-gold uppercase tracking-wider">
              {{ post.category }}
            </span>
            <span class="flex items-center gap-1 font-mono text-xs text-cinema-muted">
              <Clock :size="12" />
              {{ post.readTimeCalc }}
            </span>
            <span class="font-mono text-xs text-cinema-muted">
              {{ post.date }}
            </span>
          </div>

          <h2 class="text-3xl font-display font-bold group-hover:text-cinema-gold transition-colors">
            {{ post.title }}
          </h2>

          <p class="text-cinema-muted leading-relaxed">
            {{ post.excerpt || post.description }}
          </p>

          <div v-if="post.tags" class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider border border-cinema-border text-cinema-muted hover:border-cinema-gold transition-colors"
            >
              #{{ tag }}
            </span>
          </div>
        </router-link>
      </article>
    </div>

    <div v-if="posts.length === 0" class="text-center py-20">
      <p class="text-xl text-cinema-muted">No posts found in this category.</p>
      <router-link to="/" class="text-cinema-gold hover:underline">
        Browse all posts
      </router-link>
    </div>
  </div>
</template>
