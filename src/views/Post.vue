<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-vue-next'

const props = defineProps<{ id: string }>()

const post = ref({
  title: 'Mastering Static Site Generation',
  author: 'M. Kazi',
  date: 'Oct 12, 2025',
  readTime: '8 min read',
  content: `
    <p>Static Site Generation (SSG) has evolved from simple HTML emitters to sophisticated, hydration-aware build engines. In 2026, the boundary between static and dynamic is blurring.</p>
    <h2>The Performance Mandate</h2>
    <p>Modern users expect instant interactions. Pre-rendering the critical path ensures that the Initial Meaningful Paint happens within milliseconds, while subsequent client-side navigation feels native.</p>
    <blockquote>"The fastest request is the one that never leaves the edge."</blockquote>
    <p>By leveraging Vite-SSG, we distribute processed HTML to global CDNs, reducing Time to First Byte (TTFB) to negligible levels.</p>
  `
})
</script>

<template>
  <article class="max-w-4xl mx-auto px-10 py-24 space-y-12">
    <router-link to="/" class="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-editorial-primary transition-colors">
       <ArrowLeft class="mr-2" :size="14" /> Back to Journal
    </router-link>

    <header class="space-y-8">
       <div class="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-editorial-accent">
          <span>Engineering</span>
          <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span class="flex items-center gap-1.5"><Clock :size="12" /> {{ post.readTime }}</span>
       </div>
       <h1 class="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9]">
          {{ post.title }}
       </h1>
       <div class="flex items-center justify-between py-8 border-y border-slate-100 dark:border-white/5">
          <div class="flex items-center space-x-4">
             <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800"></div>
             <div>
                <p class="text-xs font-black uppercase tracking-tight">{{ post.author }}</p>
                <p class="text-[10px] text-slate-500 font-bold uppercase">{{ post.date }}</p>
             </div>
          </div>
          <div class="flex items-center space-x-4 text-slate-400">
             <button class="p-2 hover:text-editorial-primary transition-colors"><Share2 :size="18" /></button>
             <button class="p-2 hover:text-editorial-primary transition-colors"><Bookmark :size="18" /></button>
          </div>
       </div>
    </header>

    <div class="prose prose-slate dark:prose-invert max-w-none" v-html="post.content"></div>

    <footer class="pt-20">
       <div class="p-12 bg-slate-50 dark:bg-white/5 rounded-[3rem] text-center space-y-6">
          <h4 class="text-2xl font-serif font-black uppercase">Thanks for reading.</h4>
          <p class="text-slate-500 max-w-md mx-auto font-medium">If you enjoyed this exploration, consider subscribing to the weekly architectural briefing.</p>
          <button class="bg-editorial-primary text-white dark:bg-white dark:text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs">Subscribe Now</button>
       </div>
    </footer>
  </article>
</template>
