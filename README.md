# Editorial - Modern Jamstack SSG Blog

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite-SSG](https://img.shields.io/badge/Vite--SSG-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A high-performance editorial blog architecture built with Vue 3 and Vite-SSG**

[Live Demo](https://editorial-blog.vercel.app) | [GitHub](https://github.com/mk-knight23/52-Jamstack-Static-Blog-Starter)

</div>

---

## Overview

Editorial is a production-grade static site generator blog starter built with Vue 3, Vite-SSG, and Tailwind CSS. It replaces legacy Jekyll/Liquid templates with a modern reactive SSG architecture.

### Problem Statement

Traditional static site generators like Jekyll require:
- Ruby runtime and dependencies
- Liquid template language with limited logic
- No client-side interactivity
- Complex theme development

### Solution

Editorial provides:
- **Instant Page Loads**: Pre-rendered HTML with Vue hydration
- **True SSG**: All pages pre-rendered at build time
- **Dark/Light Mode**: System-aware theme with toggle
- **Pinia State**: Centralized post management
- **Full TypeScript**: Type-safe development

---

## Features Comparison

| Feature | Legacy (Jekyll) | Editorial (v2.0) |
| :--- | :--- | :--- |
| **Build Engine** | Ruby / Jekyll | **Vite-SSG (Node.js)** |
| **Reactivity** | None | **Vue 3 Composition API** |
| **State Management** | None | **Pinia** |
| **Theme** | Fixed | **Dark + Light mode** |
| **Type Safety** | None | **TypeScript strict mode** |
| **Navigation** | Full page reload | **Client-side SPA transitions** |
| **SEO** | Basic meta | **@vueuse/head with full meta** |

---

## Tech Stack

- **Framework**: Vue 3.5+ with Composition API
- **SSG**: Vite-SSG for static generation
- **State**: Pinia with modular stores
- **Styling**: Tailwind CSS 3.4
- **Routing**: Vue Router 4
- **Head Management**: @vueuse/head
- **Icons**: Lucide Vue
- **TypeScript**: Strict mode enabled

---

## Architecture

```
src/
├── composables/
│   └── useTheme.ts              # Dark/Light mode management
├── stores/
│   └── posts.ts                 # Pinia store for blog posts
├── views/
│   ├── Home.vue                 # Blog listing page
│   └── Post.vue                 # Individual post page
├── router.ts                    # Vue Router configuration
├── App.vue                      # Root layout component
├── main.ts                      # Vite-SSG entry point
└── index.css                    # Global styles & theme
```

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/52-Jamstack-Static-Blog-Starter.git
cd 52-Jamstack-Static-Blog-Starter

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (SSG)
npm run build
```

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Production Build

```bash
npm run build
```

Generates pre-rendered static HTML for all routes using Vite-SSG.

---

## Theme System

The blog supports both dark and light modes with:

- **System Detection**: Automatically detects system preference
- **Manual Toggle**: Users can switch themes via the nav button
- **Persistence**: Theme preference saved in localStorage
- **Smooth Transitions**: 200ms CSS transitions between themes

### CSS Variables

```css
:root {
  --editorial-bg: #ffffff;
  --editorial-primary: #1a1a1a;
  --editorial-accent: #3b82f6;
  --editorial-muted: #737373;
}

.dark {
  --editorial-bg: #0a0a0a;
  --editorial-primary: #ffffff;
  --editorial-muted: #a1a1aa;
}
```

---

## Deployment

This project is pre-configured for **Vite-SSG** and deploys to any static host:

- **Vercel**: Automatic deployments from Git
- **Netlify**: Drop the `dist` folder or connect repo
- **GitHub Pages**: Use the `dist` output
- **Cloudflare Pages**: Supports Vite-SSG out of the box

```bash
# Deploy to Vercel
npx vercel --prod

# Preview production build locally
npm run preview
```

---

## SEO & Meta Tags

The blog uses `@vueuse/head` for comprehensive SEO:

```typescript
useHead({
  title: 'Editorial | Modern SSG Blog',
  meta: [
    { name: 'description', content: 'A high-performance editorial blog...' },
    { name: 'og:title', content: 'Editorial | Modern SSG Blog' },
    { name: 'og:description', content: 'A high-performance editorial blog...' },
  ],
})
```

---

## License

MIT License - See [LICENSE.md](LICENSE.md) for details.

---

<div align="center">

**Built with Vue 3 + Vite-SSG + Tailwind CSS**

</div>
