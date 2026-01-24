<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useTheme } from '@/composables/useTheme'
import SettingsPanel from './components/ui/SettingsPanel.vue'
import { useSettingsStore } from './stores/settings'
import { useStatsStore } from './stores/stats'
import { useAudio } from './composables/useAudio'
import { Sun, Moon, Github, Info } from 'lucide-vue-next'

useHead({
  title: 'Editorial | Modern SSG Blog',
  meta: [
    { name: 'description', content: 'A high-performance editorial blog built with Vue 3 and Vite SSG.' },
  ],
})

const { isDark, toggleTheme } = useTheme()
const settingsStore = useSettingsStore()
const statsStore = useStatsStore()
const audio = useAudio()

function openSettings() {
  audio.playClick()
  statsStore.recordSettingsOpen()
}

function recordClick() {
  statsStore.recordClick()
}
</script>

<template>
  <div class="min-h-screen flex flex-col" :class="{ 'dark': settingsStore.isDarkMode, 'light': !settingsStore.isDarkMode }">
    <!-- Main Navigation -->
    <nav
      class="h-24 border-b border-slate-100 dark:border-white/5 flex items-center px-10 justify-between sticky top-0 z-50 transition-colors duration-300"
      :class="isDark ? 'bg-editorial-dark/80' : 'bg-white/80'"
    >
       <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-editorial-accent rounded-full flex items-center justify-center text-white font-serif font-black italic text-lg"
            aria-hidden="true"
          >E</div>
          <router-link to="/" class="font-serif font-black text-xl tracking-tighter uppercase hover:text-editorial-accent transition-colors">
            Editorial.
          </router-link>
       </div>

       <div class="hidden md:flex items-center space-x-12" role="navigation" aria-label="Main navigation">
          <router-link to="/" class="nav-link">Journal</router-link>
          <a href="#" class="nav-link">Archive</a>
          <a href="#" class="nav-link">About</a>
       </div>

       <div class="flex items-center space-x-6">
          <!-- Settings Button -->
          <button
            @click="openSettings"
            @click.capture="recordClick"
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Settings"
            :title="settingsStore.themeLabel + ' Mode'"
          >
            <Info :size="20" class="text-slate-600 dark:text-slate-400" />
          </button>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            @click.capture="recordClick"
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="isDark ? 'Light mode' : 'Dark mode'"
          >
            <Sun v-if="isDark" :size="20" class="text-amber-400" />
            <Moon v-else :size="20" class="text-slate-600" />
          </button>

          <!-- GitHub Link -->
          <a
            href="https://github.com/mk-knight23/52-Jamstack-Static-Blog-Starter"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-400 hover:text-editorial-primary dark:hover:text-white transition-colors"
            aria-label="View source on GitHub"
          >
            <Github :size="20" />
          </a>

          <button
            @click="recordClick"
            class="text-xs font-black uppercase tracking-widest bg-editorial-accent text-white px-6 py-2.5 rounded-full hover:scale-105 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-editorial-accent cursor-pointer"
          >
            Subscribe
          </button>
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
    <footer class="py-20 px-10 border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
       <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] italic" :class="isDark ? 'text-slate-600' : 'text-editorial-muted'">
             Production Grade SSG Architecture
          </p>
          <div class="flex gap-10 text-[10px] font-black uppercase tracking-widest">
             <a href="#" class="hover:text-editorial-accent transition-colors">Privacy</a>
             <a href="#" class="hover:text-editorial-accent transition-colors">Terms</a>
             <a href="#" class="hover:text-editorial-accent transition-colors">Contact</a>
          </div>
       </div>
    </footer>

    <SettingsPanel />
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

kbd {
  @apply px-2 py-1 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded;
}
</style>
