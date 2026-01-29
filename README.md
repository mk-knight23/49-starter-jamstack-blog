# CINEMA. | Movie & Series Blog Starter

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite-SSG](https://img.shields.io/badge/Vite--SSG-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A cinematic movie and series review blog starter built with Vue 3, Vite-SSG, and Tailwind CSS v4**

[Live Demo](https://49-starter-jamstack-blog.vercel.app) | [GitHub](https://github.com/mk-knight23/52-Jamstack-Static-Blog-Starter)

</div>

---

## Theme: Movie / Series Inspired UI

This starter kit features a cinematic, theater-inspired aesthetic:

- **Gold accent color** (`#d4af37`) for premium feel
- **Deep dark backgrounds** mimicking theater environments
- **Serif typography** (Playfair Display) for titles
- **Star ratings** and review scores
- **Poster-style cards** with hover effects
- **Play button** and film-related iconography

---

## Tech Stack

- **Framework**: Vue 3.5+ (Composition API)
- **SSG**: Vite-SSG for static generation
- **State**: Pinia 3.x
- **Styling**: Tailwind CSS v4
- **Routing**: Vue Router 4.x
- **Head Management**: @vueuse/head
- **Icons**: Lucide Vue Next
- **TypeScript**: 5.6+ with strict mode

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (SSG)
npm run build
```

---

## Movie Theme Components

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-cinema-bg` | `#0a0a0a` | Main background |
| `--color-cinema-card` | `#1a1a1a` | Card backgrounds |
| `--color-cinema-gold` | `#d4af37` | Primary accent |
| `--color-cinema-gold-dim` | `#9a7b2d` | Secondary gold |
| `--color-cinema-red` | `#c41e3a` | Alerts, ratings |
| `--color-cinema-white` | `#f5f5f5` | Primary text |
| `--color-cinema-muted` | `#737373` | Secondary text |

### Typography

- **Display:** Playfair Display (headings, titles)
- **Body:** Inter (body text)
- **Data:** JetBrains Mono (dates, meta info)

### Available Classes

```css
.cinema-container   /* Main wrapper */
.cinema-nav         /* Navigation bar */
.cinema-logo        /* Brand logo with gold glow */
.cinema-button      /* Gold gradient button */
.cinema-card        /* Hover-animated card */
.cinema-poster      /* Aspect ratio 2/3 for posters */
.cinema-badge       /* Rounded badge label */
.cinema-rating      /* Star rating display */
```

### Animations

```css
.animate-fade-in    /* Fade in effect */
.animate-slide-up   /* Slide up reveal */
.animate-scale-in   /* Scale reveal */
.animate-glow       /* Golden glow pulse */
```

---

## Project Structure

```
src/
├── composables/
│   ├── useAudio.ts
│   └── useTheme.ts
├── stores/
│   ├── posts.ts
│   ├── settings.ts
│   └── stats.ts
├── views/
│   ├── Home.vue        # Movie listing & reviews
│   └── Post.vue        # Individual review page
├── components/
│   └── ui/
│       └── SettingsPanel.vue
├── App.vue             # Main layout
├── main.ts             # Vite-SSG entry
└── index.css           # Tailwind v4 + Movie theme
```

---

## Deployment

```bash
# Build for production (SSG)
npm run build

# Preview production build
npm run preview
```

Compatible with Vercel, Netlify, GitHub Pages, and Cloudflare Pages.

---

<div align="center">

**CINEMA.** // YOUR PREMIER MOVIE DESTINATION

</div>
