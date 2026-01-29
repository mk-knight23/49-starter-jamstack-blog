<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useTheme } from '@/composables/useTheme'
import SettingsPanel from './components/ui/SettingsPanel.vue'
import { useSettingsStore } from './stores/settings'
import { useStatsStore } from './stores/stats'
import { useAudio } from './composables/useAudio'
import { Sun, Moon, Github, Star, Play, Calendar } from 'lucide-vue-next'

useHead({
  title: 'CINEMA. | Movie & Series Blog',
  meta: [
    { name: 'description', content: 'Your premier destination for movie reviews, series recommendations, and cinematic insights.' },
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
  <div class="cinema-container" :class="{ 'dark': settingsStore.isDarkMode, 'light': !settingsStore.isDarkMode }">
    <!-- Main Navigation -->
    <nav class="cinema-nav">
       <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-cinema-gold/10 border border-cinema-gold/30 flex items-center justify-center">
             <Play class="text-cinema-gold" :size="20" fill="currentColor" />
          </div>
          <router-link to="/" class="cinema-logo">
            CINEMA.
          </router-link>
       </div>

       <div class="hidden md:flex items-center space-x-10" role="navigation" aria-label="Main navigation">
          <router-link to="/" class="cinema-nav-link">Now Showing</router-link>
          <a href="#" class="cinema-nav-link">Coming Soon</a>
          <a href="#" class="cinema-nav-link">Reviews</a>
          <a href="#" class="cinema-nav-link">Series</a>
       </div>

       <div class="flex items-center space-x-4">
          <button
            @click="toggleTheme"
            @click.capture="recordClick"
            class="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun v-if="isDark" :size="18" class="text-cinema-gold" />
            <Moon v-else :size="18" class="text-cinema-muted" />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="View source on GitHub"
          >
            <Github :size="18" class="text-cinema-muted" />
          </a>

          <button
            @click="recordClick"
            class="cinema-button"
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
    <footer class="cinema-footer">
       <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-lg bg-cinema-gold/10 border border-cinema-gold/20 flex items-center justify-center">
                <Star class="text-cinema-gold" :size="14" fill="currentColor" />
             </div>
             <p class="font-mono text-[10px] text-cinema-muted tracking-[0.3em]">
                CINEMA COLLECTIVE
             </p>
          </div>
          <div class="flex gap-8">
             <a href="#" class="font-mono text-[10px] text-cinema-muted hover:text-cinema-gold transition-colors tracking-wider">PRIVACY</a>
             <a href="#" class="font-mono text-[10px] text-cinema-muted hover:text-cinema-gold transition-colors tracking-wider">TERMS</a>
             <a href="#" class="font-mono text-[10px] text-cinema-muted hover:text-cinema-gold transition-colors tracking-wider">CONTACT</a>
          </div>
          <p class="font-mono text-[10px] text-cinema-muted tracking-wider">
             © 2026 CINEMA. ALL RIGHTS RESERVED
          </p>
       </div>
    </footer>

    <SettingsPanel />
  </div>
</template>
