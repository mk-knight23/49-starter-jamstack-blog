<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useTheme } from '@/composables/useTheme'
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const store = usePostsStore()
const { isDark } = useTheme()

const post = computed(() => store.getPostById(route.params.id as string))

const goBack = () => router.push('/')
</script>

<template>
  <article v-if="post" class="max-w-4xl mx-auto px-10 py-24 space-y-12" role="article">
    <router-link
      to="/"
      class="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] transition-colors hover:text-editorial-accent"
      :class="isDark ? 'text-slate-500' : 'text-slate-400'"
    >
       <ArrowLeft class="mr-2" :size="14" /> Back to Journal
    </router-link>

    <header class="space-y-8">
       <div class="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-editorial-accent">
          <span>{{ post.category }}</span>
          <span class="w-1 h-1 rounded-full" :class="isDark ? 'bg-slate-600' : 'bg-slate-300'"></span>
          <span class="flex items-center gap-1.5">
            <Clock :size="12" /> {{ post.readTime }}
          </span>
       </div>
       <h1 class="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9]">
          {{ post.title }}
       </h1>
       <div class="flex items-center justify-between py-8 border-y transition-colors duration-300" :class="isDark ? 'border-white/5' : 'border-slate-100'">
          <div class="flex items-center space-x-4">
             <div class="w-10 h-10 rounded-full" :class="isDark ? 'bg-slate-800' : 'bg-slate-200'"></div>
             <div>
                <p class="text-xs font-black uppercase tracking-tight">{{ post.author }}</p>
                <p class="text-[10px] uppercase tracking-wider" :class="isDark ? 'text-slate-600' : 'text-slate-500'">{{ post.date }}</p>
             </div>
          </div>
          <div class="flex items-center space-x-4" :class="isDark ? 'text-slate-500' : 'text-slate-400'">
             <button
               class="p-2 hover:text-editorial-accent transition-colors"
               aria-label="Share post"
             >
               <Share2 :size="18" />
             </button>
             <button
               class="p-2 hover:text-editorial-accent transition-colors"
               aria-label="Bookmark post"
             >
               <Bookmark :size="18" />
             </button>
          </div>
       </div>
    </header>

    <div
      class="prose max-w-none"
      :class="isDark ? 'dark:prose-invert' : ''"
      v-html="post.content"
    ></div>

    <footer class="pt-20">
       <div
         class="p-12 rounded-[3rem] text-center space-y-6 transition-colors duration-300"
         :class="isDark ? 'bg-white/5' : 'bg-slate-50'"
       >
          <h4 class="text-2xl font-serif font-black uppercase">Thanks for reading.</h4>
          <p class="max-w-md mx-auto transition-colors duration-300" :class="isDark ? 'text-slate-500' : 'text-slate-500'">
            If you enjoyed this exploration, consider subscribing to the weekly architectural briefing.
          </p>
          <button class="bg-editorial-accent text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-editorial-accent">
            Subscribe Now
          </button>
       </div>
    </footer>
  </article>

  <div v-else class="max-w-4xl mx-auto px-10 py-24 text-center">
    <p class="text-xl">Post not found</p>
    <router-link to="/" class="text-editorial-accent hover:underline">Return to journal</router-link>
  </div>
</template>
