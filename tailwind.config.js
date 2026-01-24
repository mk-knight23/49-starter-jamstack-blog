/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: 'var(--editorial-bg)',
          dark: 'var(--editorial-dark)',
          primary: 'var(--editorial-primary)',
          accent: '#3b82f6',
          muted: 'var(--editorial-muted)'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
