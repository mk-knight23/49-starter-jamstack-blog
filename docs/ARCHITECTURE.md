# Architecture | CINEMA. Vue Blog

## Overview

CINEMA. is a Vue 3 + Vite-SSG static site generator blog starter with a cinematic movie review aesthetic. It provides a production-ready foundation for movie blogs, series reviews, and entertainment content sites.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vue 3.5+ (Composition API) |
| SSG | Vite-SSG |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS v4 |
| State | Pinia 3.x |
| Routing | Vue Router 4.x |
| Head | @vueuse/head |
| Icons | Lucide Vue Next |

## Directory Structure

```
src/
├── composables/     # Vue composables
│   ├── useAudio.ts      # Sound effects
│   └── useTheme.ts      # Theme management
├── stores/          # Pinia stores
│   ├── posts.ts         # Blog posts data
│   ├── settings.ts      # User preferences
│   └── stats.ts         # Analytics tracking
├── views/           # Page components
│   ├── Home.vue         # Movie listings & reviews
│   └── Post.vue         # Individual review page
├── components/
│   └── ui/
│       └── SettingsPanel.vue
├── App.vue          # Root layout
├── main.ts          # Vite-SSG entry point
├── router.ts        # Router configuration
└── index.css        # Tailwind v4 + theme
```

## State Management

### Posts Store (`stores/posts.ts`)

Manages blog post data:

```typescript
const store = usePostsStore()
store.posts // Array of post objects
store.getPostById(id) // Single post lookup
```

### Settings Store (`stores/settings.ts`)

User preferences:
- Theme mode (dark/light)
- Reduced motion
- Sound effects

### Stats Store (`stores/stats.ts`)

Analytics tracking:
- Page views
- Click tracking
- Time on page

## Composables

### useTheme (`composables/useTheme.ts`)

Handles theme switching:

```typescript
const { isDark, toggleTheme } = useTheme()
```

### useAudio (`composables/useAudio.ts`)

UI sound effects management.

## Vite-SSG Configuration

Configured in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import SSG from 'vite-ssg'

export default defineConfig({
  plugins: [
    Vue(),
    Pages(),
    SSG({
      // SSG options
    })
  ]
})
```

## Build Output

```
dist/
├── index.html           # Generated from App.vue
├── post/
│   ├── 1/index.html     # Individual post pages
│   └── 2/index.html
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

## Development

```bash
# Start dev server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Performance

- **Vite-SSG:** Pre-rendered HTML for SEO
- **Tailwind v4:** Zero-runtime CSS
- **Vue 3.5:** Optimized reactivity
- **Code Splitting:** Automatic with Vite

## Deployment

Pre-configured for:
- Vercel (zero config)
- Netlify (zero config)
- GitHub Pages
- Cloudflare Pages

```bash
npm run build
# Deploy dist/ folder
```

## SEO

Uses `@vueuse/head` for meta tags:

```typescript
useHead({
  title: 'CINEMA. | Movie & Series Blog',
  meta: [
    { name: 'description', content: '...' },
    { property: 'og:title', content: '...' },
  ],
})
```
