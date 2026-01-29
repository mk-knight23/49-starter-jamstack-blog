<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import { ArrowRight, Star, Clock, Calendar } from 'lucide-vue-next'

const store = usePostsStore()
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-16 space-y-20">
    <!-- Hero Section -->
    <header class="max-w-4xl space-y-8 animate-slide-up">
       <div class="flex items-center gap-4">
          <span class="h-px flex-1 bg-gradient-to-r from-transparent to-cinema-gold/30"></span>
          <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-cinema-gold/10 border border-cinema-gold/20">
             <Star class="text-cinema-gold" :size="14" fill="currentColor" />
             <span class="font-mono text-[10px] font-bold uppercase tracking-widest text-cinema-gold">Featured Premiere</span>
          </div>
          <span class="h-px flex-1 bg-gradient-to-l from-transparent to-cinema-gold/30"></span>
       </div>

       <h2 class="cinema-section-title text-5xl md:text-7xl">
          Now <span class="italic text-cinema-gold">Showing</span><br />
          In Theaters
       </h2>

       <p class="font-mono text-sm text-cinema-muted max-w-lg leading-relaxed">
          Your premier destination for in-depth movie reviews, series analysis, and exclusive behind-the-scenes content.
       </p>
    </header>

    <!-- Featured Poster -->
    <section class="grid lg:grid-cols-3 gap-12 animate-fade-in" style="animation-delay: 0.2s">
       <div class="lg:col-span-1">
          <div class="cinema-poster cinema-card group">
             <div class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900"></div>
             <div class="cinema-poster-overlay flex flex-col justify-end p-6">
                <div class="flex items-center gap-2 mb-4">
                   <span class="cinema-badge">IN THEATERS</span>
                </div>
                <button class="cinema-button w-full flex items-center justify-center gap-2">
                   <Play :size="16" fill="currentColor" /> WATCH TRAILER
                </button>
             </div>
          </div>
       </div>

       <div class="lg:col-span-2 flex flex-col justify-center space-y-8">
          <div class="space-y-4">
             <div class="flex items-center gap-4">
                <span class="cinema-badge">EPIC</span>
                <span class="flex items-center gap-1 cinema-rating font-mono text-xs">
                   <Star :size="14" fill="currentColor" /> 4.8/5
                </span>
             </div>
             <h3 class="text-4xl md:text-5xl font-display font-black leading-tight">
                The Last <span class="italic text-cinema-gold">Empire</span>
             </h3>
             <p class="font-mono text-sm text-cinema-muted leading-relaxed max-w-xl">
                An epic saga spanning generations, where ancient prophecies collide with modern ambition in a battle for the soul of civilization.
             </p>
          </div>

          <div class="flex flex-wrap gap-6">
             <div class="flex items-center gap-2 text-cinema-muted">
                <Calendar :size="16" />
                <span class="font-mono text-xs uppercase tracking-wider">Dec 25, 2026</span>
             </div>
             <div class="flex items-center gap-2 text-cinema-muted">
                <Clock :size="16" />
                <span class="font-mono text-xs uppercase tracking-wider">2h 34m</span>
             </div>
             <div class="flex items-center gap-2 text-cinema-muted">
                <Star :size="16" class="text-cinema-gold" />
                <span class="font-mono text-xs uppercase tracking-wider">Adventure, Drama</span>
             </div>
          </div>

          <div class="pt-4">
             <router-link to="/post/1" class="cinema-button inline-flex items-center gap-2 group">
                Read Full Review
                <ArrowRight class="group-hover:translate-x-1 transition-transform" :size="16" />
             </router-link>
          </div>
       </div>
    </section>

    <div class="cinema-divider"></div>

    <!-- Post Grid -->
    <section class="space-y-10" role="list" aria-label="Latest reviews">
       <div class="flex items-center justify-between">
          <h3 class="cinema-section-title text-2xl">Latest <span class="italic text-cinema-gold">Releases</span></h3>
          <a href="#" class="font-mono text-xs text-cinema-muted hover:text-cinema-gold transition-colors tracking-wider">
             VIEW ALL →
          </a>
       </div>

       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in store.posts"
            :key="post.id"
            class="group cursor-pointer"
            role="listitem"
          >
             <router-link :to="'/post/' + post.id" class="block space-y-4">
               <div class="cinema-poster cinema-card group-hover:border-cinema-gold/30">
                  <div class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900"></div>
                  <div class="cinema-poster-overlay flex flex-col justify-end p-4">
                     <div class="flex items-center gap-2">
                        <span class="flex items-center gap-1 cinema-rating font-mono text-[10px]">
                           <Star :size="12" fill="currentColor" /> 4.5
                        </span>
                     </div>
                  </div>
               </div>
               <div class="space-y-3">
                  <div class="flex items-center justify-between">
                     <span class="font-mono text-[10px] text-cinema-gold uppercase tracking-wider">{{ post.category }}</span>
                     <span class="font-mono text-[10px] text-cinema-muted">{{ post.date }}</span>
                  </div>
                  <h3 class="cinema-title group-hover:text-cinema-gold transition-colors">
                    {{ post.title }}
                  </h3>
                  <p class="font-mono text-xs text-cinema-muted leading-relaxed line-clamp-2">
                    {{ post.excerpt }}
                  </p>
                  <span class="inline-flex items-center font-mono text-[10px] text-cinema-muted uppercase tracking-wider pt-2 group-hover:text-cinema-gold transition-colors">
                     Read Review <ArrowRight class="ml-1" :size="12" />
                  </span>
               </div>
            </router-link>
          </article>
       </div>
    </section>
  </div>
</template>

<script lang="ts">
export {}
</script>
