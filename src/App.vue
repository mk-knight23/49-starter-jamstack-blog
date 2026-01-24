<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Editorial | Modern SSG Blog',
  meta: [
    { name: 'description', content: 'A high-performance editorial blog built with Vue 3 and Vite SSG.' },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Navigation -->
    <nav class="h-24 border-b border-slate-100 dark:border-white/5 flex items-center px-10 justify-between sticky top-0 bg-white/80 dark:bg-editorial-dark/80 backdrop-blur-md z-50">
       <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-editorial-primary dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-serif font-black italic text-lg">E</div>
          <span class="font-serif font-black text-xl tracking-tighter uppercase">Editorial.</span>
       </div>

       <div class="hidden md:flex items-center space-x-12">
          <router-link to="/" class="nav-link">Journal</router-link>
          <a href="#" class="nav-link">Archive</a>
          <a href="#" class="nav-link">About</a>
       </div>

       <div class="flex items-center space-x-6">
          <button class="text-xs font-black uppercase tracking-widest bg-editorial-primary text-white dark:bg-white dark:text-black px-6 py-2.5 rounded-full hover:scale-105 transition-all">Subscribe</button>
       </div>
    </nav>

    <!-- View Content -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="py-20 px-10 border-t border-slate-100 dark:border-white/5">
       <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-editorial-muted italic">Production Grade SSG Architecture</p>
          <div class="flex gap-10 text-[10px] font-black uppercase tracking-widest">
             <a href="#" class="hover:text-editorial-accent transition-colors">Privacy</a>
             <a href="#" class="hover:text-editorial-accent transition-colors">Terms</a>
             <a href="#" class="hover:text-editorial-accent transition-colors">Contact</a>
          </div>
       </div>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
