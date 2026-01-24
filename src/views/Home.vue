<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Tag } from 'lucide-vue-next'

const posts = ref([
  { id: 'mastering-ssg', title: 'Mastering Static Site Generation', excerpt: 'How SSG is redefining performance on the modern web.', date: 'Oct 12, 2025', category: 'Engineering' },
  { id: 'design-tokens', title: 'Scale with Design Tokens', excerpt: 'Building resilient systems with semantic variables.', date: 'Oct 10, 2025', category: 'Design' },
  { id: 'future-of-vue', title: 'The Future of Vue 3.5+', excerpt: 'Exploring Vapor mode and the evolution of reactivity.', date: 'Oct 08, 2025', category: 'Vue' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-24 space-y-24">
    <!-- Hero Section -->
    <header class="max-w-4xl space-y-6">
       <div class="flex items-center space-x-3 text-editorial-accent font-black uppercase tracking-widest text-[10px]">
          <span class="w-8 h-0.5 bg-editorial-accent"></span>
          <span>Editor's Pick</span>
       </div>
       <h2 class="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-[0.85]">
          Thoughts on <br />
          <span class="italic font-light">Architectural</span> <br />
          Precision.
       </h2>
       <p class="text-xl text-slate-500 max-w-lg font-medium">A journal exploring high-performance web systems, design systems, and the future of frontend engineering.</p>
    </header>

    <!-- Post Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
       <div v-for="post in posts" :key="post.id" class="group space-y-6 cursor-pointer">
          <div class="aspect-[4/3] bg-slate-100 dark:bg-white/5 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-[4rem] group-hover:scale-[0.98]">
             <!-- Placeholder for Post Image -->
             <div class="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 opacity-50"></div>
          </div>
          <div class="space-y-4">
             <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span class="flex items-center gap-1.5"><Tag :size="12" /> {{ post.category }}</span>
                <span>{{ post.date }}</span>
             </div>
             <h3 class="text-3xl font-serif font-black leading-tight group-hover:text-editorial-accent transition-colors">{{ post.title }}</h3>
             <p class="text-slate-500 line-clamp-2 font-medium leading-relaxed">{{ post.excerpt }}</p>
             <router-link :to="'/post/' + post.id" class="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] pt-4 group-hover:translate-x-2 transition-transform">
                Read Story <ArrowRight class="ml-2" :size="14" />
             </router-link>
          </div>
       </div>
    </section>
  </div>
</template>
