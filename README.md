# Editorial - Modern Jamstack SSG Blog

A high-performance editorial blog architecture built with **Vue 3**, **Vite-SSG**, and **Tailwind CSS**. Designed for technical journals and editorial content with 100/100 performance goals.

## Overview
Editorial replaces legacy Liquid-based Jekyll templates with a modern reactive SSG engine. It provides instant page transitions, pre-rendered static performance, and a typography-first design system.

## Features Comparison

| Feature | Legacy (Jekyll) | Editorial (v2.0) |
| :--- | :--- | :--- |
| **Build Engine** | Ruby / Jekyll | **Vite-SSG (Node.js)** |
| **Reactivity** | None | **Vue 3 Composition API** |
| **Performance** | Basic Static | **Hydrated SSG (Instant Navigation)** |
| **Design** | Classic Blog | **Premium Editorial Typography** |
| **Markdown** | Standard | **Extended Markdown w/ Frontmatter** |
| **Theming** | CSS Variables | **Tailwind CSS + Dark Mode toggle** |

## Tech Stack
- **Framework:** Vue 3.5+
- **SSG:** Vite-SSG
- **State:** Pinia
- **Styling:** Tailwind CSS (Prose)
- **Icons:** Lucide Vue
- **Head Management:** @vueuse/head

## Project Structure
```text
src/
├── content/            # Markdown source files
├── layouts/            # Reusable page wrappers
├── views/              # Route components
└── composables/        # Content & SEO logic
```

## Setup & Build Instructions

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build (SSG)
```bash
npm run build
```

## Deployment
This project is pre-configured for **Vite-SSG** build output, making it compatible with any static host (Netlify, Vercel, GH Pages).

---

**License:** MIT
**Architect:** mk-knight23
