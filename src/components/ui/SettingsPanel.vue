<script setup lang="ts">
import { useSettingsStore } from '../../stores/settings'
import { useStatsStore } from '../../stores/stats'
import { useAudio } from '../../composables/useAudio'
import { KEYBOARD_SHORTCUTS } from '../../utils/constants'
import { X, Sun, Moon, Volume2, VolumeX, Keyboard, RotateCcw, Download, Settings } from 'lucide-vue-next'

const settingsStore = useSettingsStore()
const statsStore = useStatsStore()
const audio = useAudio()

const shortcutsList = [
  { action: 'Toggle Theme', keys: KEYBOARD_SHORTCUTS.TOGGLE_THEME },
  { action: 'Toggle Help', keys: KEYBOARD_SHORTCUTS.TOGGLE_HELP },
  { action: 'Toggle Settings', keys: KEYBOARD_SHORTCUTS.TOGGLE_SETTINGS },
  { action: 'Navigate Home', keys: KEYBOARD_SHORTCUTS.NAVIGATE_HOME },
  { action: 'Close', keys: KEYBOARD_SHORTCUTS.CLOSE }
]

function close() {
  settingsStore.hideHelp()
}

function cycleTheme() {
  audio.playClick()
  settingsStore.toggleTheme()
}

function toggleSound() {
  audio.playClick()
  settingsStore.toggleSound()
}

function exportSettings() {
  audio.playClick()
  const settings = settingsStore.exportSettings()
  const stats = statsStore.exportStats()
  const data = JSON.stringify({ settings: JSON.parse(settings), stats: JSON.parse(stats) }, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'editorial-data.json'
  a.click()
  URL.revokeObjectURL(url)
}

function resetSettings() {
  audio.playClick()
  settingsStore.resetSettings()
  statsStore.resetStats()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="settingsStore.settings.showHelp" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>
        <div class="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">
            <h2 class="text-xl font-display font-black uppercase tracking-tight dark:text-white flex items-center gap-3">
              <Settings :size="24" class="text-editorial-accent" />
              Settings
            </h2>
            <button @click="close" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <X :size="20" class="dark:text-white" />
            </button>
          </div>

          <div class="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
            <div class="space-y-6">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Appearance</h3>
              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-editorial-accent/20 rounded-xl">
                    <Sun v-if="settingsStore.isDarkMode" :size="20" class="text-amber-400" />
                    <Moon v-else :size="20" class="text-blue-600" />
                  </div>
                  <div>
                    <p class="font-bold dark:text-white">Theme</p>
                    <p class="text-sm text-slate-500">{{ settingsStore.themeLabel }} Mode</p>
                  </div>
                </div>
                <button @click="cycleTheme" class="px-4 py-2 bg-white dark:bg-slate-700 rounded-xl text-sm font-bold dark:text-white shadow-sm hover:shadow-md transition-all active:scale-95">
                  Cycle
                </button>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Sound</h3>
              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-editorial-accent/20 rounded-xl">
                    <Volume2 v-if="settingsStore.settings.soundEnabled" :size="20" class="text-editorial-accent" />
                    <VolumeX v-else :size="20" class="text-slate-500" />
                  </div>
                  <div>
                    <p class="font-bold dark:text-white">Sound Effects</p>
                    <p class="text-sm text-slate-500">{{ settingsStore.settings.soundEnabled ? 'Enabled' : 'Disabled' }}</p>
                  </div>
                </div>
                <button
                  @click="toggleSound"
                  class="w-14 h-8 rounded-full transition-colors duration-300"
                  :class="settingsStore.settings.soundEnabled ? 'bg-editorial-accent' : 'bg-slate-300 dark:bg-slate-600'"
                >
                  <div
                    class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
                    :class="settingsStore.settings.soundEnabled ? 'translate-x-7' : 'translate-x-1'"
                  ></div>
                </button>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Keyboard Shortcuts</h3>
              <div class="space-y-3">
                <div v-for="shortcut in shortcutsList" :key="shortcut.action" class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <div class="flex items-center gap-4">
                    <div class="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
                      <Keyboard :size="16" class="text-slate-600 dark:text-slate-400" />
                    </div>
                    <p class="font-bold dark:text-white capitalize">{{ shortcut.action }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <kbd v-for="key in shortcut.keys" :key="key" class="px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white">{{ key }}</kbd>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Statistics</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                  <p class="text-2xl font-black dark:text-white">{{ statsStore.stats.visits }}</p>
                  <p class="text-xs text-slate-500 uppercase tracking-wider">Visits</p>
                </div>
                <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                  <p class="text-2xl font-black dark:text-white">{{ statsStore.stats.totalClicks }}</p>
                  <p class="text-xs text-slate-500 uppercase tracking-wider">Clicks</p>
                </div>
                <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                  <p class="text-2xl font-black dark:text-white">{{ statsStore.stats.articlesRead }}</p>
                  <p class="text-xs text-slate-500 uppercase tracking-wider">Articles Read</p>
                </div>
                <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                  <p class="text-2xl font-black dark:text-white">{{ statsStore.stats.themeSwitches }}</p>
                  <p class="text-xs text-slate-500 uppercase tracking-wider">Theme Switches</p>
                </div>
              </div>
            </div>
          </div>

          <div class="px-8 py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between gap-4">
            <button @click="resetSettings" class="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-bold">
              <RotateCcw :size="16" />
              Reset All
            </button>
            <div class="flex items-center gap-2">
              <button @click="exportSettings" class="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-sm font-bold dark:text-white hover:shadow-md transition-all">
                <Download :size="16" />
                Export
              </button>
              <button @click="close" class="px-6 py-2 bg-editorial-accent hover:bg-editorial-primary text-white rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
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
