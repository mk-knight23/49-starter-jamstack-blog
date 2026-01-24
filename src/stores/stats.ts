import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { STORAGE_KEYS } from '../utils/constants'

const isBrowser = typeof window !== 'undefined'

interface StatsState {
  visits: number
  lastVisit: string
  totalClicks: number
  articlesRead: number
  themeSwitches: number
  settingsOpened: number
  keyboardShortcutsUsed: number
}

const INITIAL_STATS: StatsState = {
  visits: 0,
  lastVisit: '',
  totalClicks: 0,
  articlesRead: 0,
  themeSwitches: 0,
  settingsOpened: 0,
  keyboardShortcutsUsed: 0
}

export const useStatsStore = defineStore('stats', () => {
  const stats = ref<StatsState>(INITIAL_STATS)

  const statsSummary = computed(() => {
    const s = stats.value
    return {
      totalVisits: s.visits,
      totalClicks: s.totalClicks,
      articlesRead: s.articlesRead,
      themeSwitches: s.themeSwitches,
      shortcutsUsed: s.keyboardShortcutsUsed
    }
  })

  function loadStats() {
    if (!isBrowser) return
    const stored = localStorage.getItem(STORAGE_KEYS.STATS)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        stats.value = { ...INITIAL_STATS, ...parsed }
      } catch {
        stats.value = INITIAL_STATS
      }
    }
  }

  function recordVisit() {
    const now = new Date().toISOString()
    stats.value.visits++
    stats.value.lastVisit = now
  }

  function recordClick() {
    stats.value.totalClicks++
  }

  function recordArticleRead() {
    stats.value.articlesRead++
  }

  function recordThemeSwitch() {
    stats.value.themeSwitches++
  }

  function recordSettingsOpen() {
    stats.value.settingsOpened++
  }

  function recordKeyboardShortcut() {
    stats.value.keyboardShortcutsUsed++
  }

  function exportStats() {
    return JSON.stringify(stats.value, null, 2)
  }

  function resetStats() {
    stats.value = INITIAL_STATS
  }

  watch(stats, (newStats) => {
    if (!isBrowser) return
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats))
  }, { deep: true })

  return {
    stats,
    statsSummary,
    loadStats,
    recordVisit,
    recordClick,
    recordArticleRead,
    recordThemeSwitch,
    recordSettingsOpen,
    recordKeyboardShortcut,
    exportStats,
    resetStats
  }
})
