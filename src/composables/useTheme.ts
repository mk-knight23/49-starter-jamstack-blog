import { useDark, useToggle } from '@vueuse/core'

export function useTheme() {
  const isDark = useDark({
    selector: 'body',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light'
  })
  const toggleTheme = useToggle(isDark)

  return { isDark, toggleTheme }
}
