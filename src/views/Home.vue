<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-vue-next'

const store = usePostsStore()

const featuredPosts = computed(() => store.posts.filter(p => p.featured))
const latestPosts = computed(() => store.posts.slice(0, 6))

onMounted(async () => {
  await store.initialize()
})
</script>

<template>
  <div class="writer-container space-y-20">
    <!-- Hero Section -->
    <header class="max-w-3xl space-y-8 animate-fade-in">
      <h1 class="writer-heading-display">
        Ideas worth<br />
        <span class="text-writer-accent">reading about</span>
      </h1>

      <p class="text-xl text-writer-muted leading-relaxed max-w-2xl">
        A high-performance editorial blog exploring engineering, design, and the future of web development.
      </p>

      <div class="flex items-center gap-4 pt-4">
        <div class="flex items-center gap-2 text-sm text-writer-muted">
          <Calendar :size="16" />
          <span>{{ new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}</span>
        </div>
        <span class="text-writer-muted">•</span>
        <div class="flex items-center gap-2 text-sm text-writer-muted">
          <span>{{ store.posts.length }} articles</span>
        </div>
      </div>
    </header>

    <div class="writer-divider"></div>

    <!-- Featured Posts -->
    <section v-if="featuredPosts.length > 0" class="space-y-10">
      <h2 class="writer-heading text-3xl">Featured</h2>

      <div class="grid md:grid-cols-2 gap-8">
        <article
          v-for="post in featuredPosts"
          :key="post.id"
          class="group"
        >
          <router-link :to="`/post/${post.id}`" class="block space-y-4">
            <div class="writer-card p-8 group-hover:border-writer-accent/30 transition-colors">
              <div class="flex items-center gap-4 mb-4">
                <span class="writer-tag">{{ post.category }}</span>
                <span class="writer-meta">{{ post.date }}</span>
              </div>

              <h3 class="writer-heading text-2xl group-hover:text-writer-accent transition-colors">
                {{ post.title }}
              </h3>

              <p class="text-writer-muted leading-relaxed">
                {{ post.excerpt || post.description }}
              </p>

              <div class="flex items-center gap-4 pt-4">
                <span class="flex items-center gap-1.5 text-sm text-writer-muted">
                  <Clock :size="14" />
                  {{ post.readTimeCalc }}
                </span>
                <span class="flex items-center gap-1.5 text-sm text-writer-accent group-hover:translate-x-1 transition-transform">
                  Read more <ArrowRight :size="14" />
                </span>
              </div>
            </div>
          </router-link>
        </article>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="space-y-10">
      <div class="flex items-center justify-between">
        <h2 class="writer-heading text-3xl">Latest</h2>
      </div>

      <div class="space-y-6">
        <article
          v-for="post in latestPosts"
          :key="post.id"
          class="group"
        >
          <router-link :to="`/post/${post.id}`" class="block space-y-3">
            <div class="flex items-center gap-3 text-sm">
              <span class="writer-tag">{{ post.category }}</span>
              <span class="writer-meta">{{ post.date }}</span>
              <span class="writer-meta">•</span>
              <span class="flex items-center gap-1 text-writer-muted">
                <Clock :size="14" />
                {{ post.readTimeCalc }}
              </span>
            </div>

            <h3 class="writer-heading text-2xl group-hover:text-writer-accent transition-colors">
              {{ post.title }}
            </h3>

            <p class="text-writer-muted leading-relaxed max-w-2xl">
              {{ post.excerpt || post.description }}
            </p>

            <div v-if="post.tags" class="flex flex-wrap gap-2">
              <router-link
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                :to="`/tags/${tag}`"
                class="flex items-center gap-1 text-sm text-writer-muted hover:text-writer-accent transition-colors"
                @click.stop
              >
                <Tag :size="12" />
                {{ tag }}
              </router-link>
            </div>
          </router-link>
        </article>
      </div>
    </section>

    <!-- Footer CTA -->
    <footer class="text-center py-20">
      <div class="writer-card p-12 max-w-2xl mx-auto">
        <h3 class="writer-heading text-3xl mb-4">Stay updated</h3>
        <p class="text-writer-muted mb-6">
          Get the latest articles delivered straight to your inbox.
        </p>
        <button class="writer-button">
          Subscribe to the newsletter
        </button>
      </div>
    </footer>
  </div>
</template>
