import { ref } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { AUDIO_CONFIG } from '../utils/constants'

export function useAudio() {
  const settingsStore = useSettingsStore()
  const audioContext = ref<AudioContext | null>(null)
  const masterGain = ref<GainNode | null>(null)

  function initAudioContext() {
    if (audioContext.value) return

    try {
      audioContext.value = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      masterGain.value = audioContext.value.createGain()
      masterGain.value.connect(audioContext.value.destination)
      masterGain.value.gain.value = 0.3
    } catch {
      console.warn('Web Audio API not supported')
    }
  }

  function ensureContext() {
    if (!audioContext.value) {
      initAudioContext()
    }
    if (audioContext.value?.state === 'suspended') {
      audioContext.value.resume()
    }
  }

  function playClick() {
    if (!settingsStore.settings.soundEnabled) return
    ensureContext()

    if (!audioContext.value || !masterGain.value) return

    const oscillator = audioContext.value.createOscillator()
    const gainNode = audioContext.value.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(masterGain.value)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(AUDIO_CONFIG.CLICK_FREQUENCY, audioContext.value.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(AUDIO_CONFIG.CLICK_FREQUENCY * 0.5, audioContext.value.currentTime + AUDIO_CONFIG.CLICK_DURATION)

    gainNode.gain.setValueAtTime(0.3, audioContext.value.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.value.currentTime + AUDIO_CONFIG.CLICK_DURATION)

    oscillator.start(audioContext.value.currentTime)
    oscillator.stop(audioContext.value.currentTime + AUDIO_CONFIG.CLICK_DURATION)
  }

  function playHover() {
    if (!settingsStore.settings.soundEnabled) return
    ensureContext()

    if (!audioContext.value || !masterGain.value) return

    const oscillator = audioContext.value.createOscillator()
    const gainNode = audioContext.value.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(masterGain.value)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(AUDIO_CONFIG.HOVER_FREQUENCY, audioContext.value.currentTime)

    gainNode.gain.setValueAtTime(0.1, audioContext.value.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.value.currentTime + AUDIO_CONFIG.HOVER_DURATION)

    oscillator.start(audioContext.value.currentTime)
    oscillator.stop(audioContext.value.currentTime + AUDIO_CONFIG.HOVER_DURATION)
  }

  function playSuccess() {
    if (!settingsStore.settings.soundEnabled) return
    ensureContext()

    if (!audioContext.value || !masterGain.value) return

    const now = audioContext.value.currentTime

    ;[523.25, 659.25, 783.99].forEach((freq, i) => {
      const oscillator = audioContext.value!.createOscillator()
      const gainNode = audioContext.value!.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(masterGain.value!)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, now + i * 0.1)

      gainNode.gain.setValueAtTime(0.2, now + i * 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.15)

      oscillator.start(now + i * 0.1)
      oscillator.stop(now + i * 0.1 + 0.15)
    })
  }

  return {
    playClick,
    playHover,
    playSuccess
  }
}
