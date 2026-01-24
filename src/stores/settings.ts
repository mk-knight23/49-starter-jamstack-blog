import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { STORAGE_KEYS } from '../utils/constants'

const isBrowser = typeof window !== 'undefined'

export type ThemeMode = 'light' | 'dark' | 'system'

interface SettingsState {
  theme: ThemeMode
  soundEnabled: boolean
  animationsEnabled: boolean
  reducedMotion: boolean
  showHelp: boolean
}

const DEFAULT_SETTINGS: SettingsState = {
  theme: 'system',
  soundEnabled: true,
  animationsEnabled: true,
  reducedMotion: false,
  showHelp: false
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SettingsState>(DEFAULT_SETTINGS)

  const isDarkMode = computed(() => {
    const theme = settings.value.theme
    if (theme === 'system' && isBrowser) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme === 'dark'
  })

  const themeLabel = computed(() => {
    const theme = settings.value.theme
    return theme.charAt(0).toUpperCase() + theme.slice(1)
  })

  function loadSettings() {
    if (!isBrowser) return

    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        settings.value = { ...DEFAULT_SETTINGS, ...parsed }
      } catch {
        settings.value = DEFAULT_SETTINGS
      }
    }

    if (settings.value.reducedMotion) {
      document.documentElement.classList.add('reduce-motion')
    }
  }

  function setTheme(theme: ThemeMode) {
    settings.value.theme = theme
    updateColorScheme()
  }

  function toggleTheme() {
    const nextTheme: Record<ThemeMode, ThemeMode> = {
      light: 'dark',
      dark: 'system',
      system: 'light'
    }
    setTheme(nextTheme[settings.value.theme])
  }

  function setSoundEnabled(enabled: boolean) {
    settings.value.soundEnabled = enabled
  }

  function toggleSound() {
    settings.value.soundEnabled = !settings.value.soundEnabled
  }

  function setAnimationsEnabled(enabled: boolean) {
    settings.value.animationsEnabled = enabled
    if (!enabled) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }

  function toggleAnimations() {
    setAnimationsEnabled(!settings.value.animationsEnabled)
  }

  function toggleHelp() {
    settings.value.showHelp = !settings.value.showHelp
  }

  function hideHelp() {
    settings.value.showHelp = false
  }

  function updateColorScheme() {
    if (!isBrowser) return
    const isDark = isDarkMode.value
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }

  function exportSettings() {
    return JSON.stringify(settings.value, null, 2)
  }

  function resetSettings() {
    settings.value = DEFAULT_SETTINGS
    updateColorScheme()
  }

  watch(settings, (newSettings) => {
    if (!isBrowser) return
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings))
  }, { deep: true })

  return {
    settings,
    isDarkMode,
    themeLabel,
    loadSettings,
    setTheme,
    toggleTheme,
    setSoundEnabled,
    toggleSound,
    setAnimationsEnabled,
    toggleAnimations,
    toggleHelp,
    hideHelp,
    exportSettings,
    resetSettings
  }
})
