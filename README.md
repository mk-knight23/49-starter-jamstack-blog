# Vue 3 SSG Editorial Blog

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite-SSG](https://img.shields.io/badge/Vite--SSG-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A high-performance editorial blog starter with Vue 3, Vite-SSG, and TypeScript**

**Live Demo:** [Vercel](https://49-starter-jamstack-blog.vercel.app) ✓ | [Cloudflare Pages](https://49-starter-jamstack-blog.pages.dev) ✓ | [Deploy with Vercel](https://vercel.com/new)

</div>

---

## Features

### Content Management
- Markdown-based blog posts with frontmatter
- Content schema validation with TypeScript
- Reading time calculation
- Tag and category system
- Draft post support
- Featured posts section

### SEO & Performance
- Automatic sitemap generation
- Robots.txt configuration
- RSS 2.0 feed
- Open Graph meta tags
- Twitter Card support
- Structured data (JSON-LD)
- Static site generation (SSG)
- Image optimization
- Lazy loading

### Developer Experience
- TypeScript with strict mode
- Pinia state management
- Vue Router 4
- Content-first design system
- Dark mode support
- Syntax highlighting for code blocks
- Hot module replacement
- Build-time optimizations

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see your blog.

---

## Project Structure

```
.
├── .claude/
│   ├── scripts/           # Helper scripts
│   │   ├── new-post.sh    # Create new post
│   │   ├── build.sh       # Build with validation
│   │   └── dev.sh         # Start dev server
│   └── workflows/         # Development workflows
├── public/                # Static assets
├── scripts/
│   └── generate-seo.ts    # SEO file generation
├── src/
│   ├── components/        # Vue components
│   ├── content/
│   │   └── posts/         # Markdown posts
│   ├── stores/            # Pinia stores
│   ├── utils/
│   │   ├── content/       # Content loaders
│   │   └── seo/           # SEO utilities
│   ├── views/             # Page components
│   ├── App.vue
│   ├── main.ts
│   └── index.css          # Tailwind + theme
├── .github/workflows/     # GitHub Actions
├── vercel.json            # Vercel config
├── netlify.toml           # Netlify config
└── package.json
```

---

## Creating Content

### Using the Script

```bash
npm run new-post "Your Post Title"
```

This creates a new Markdown file with frontmatter template.

### Manual Creation

Create a new file in `src/content/posts/your-post.md`:

```markdown
---
title: Your Post Title
description: SEO-friendly description
excerpt: Brief summary for cards
date: 2025-01-15
author: Your Name
category: Engineering
tags:
  - Vue
  - TypeScript
draft: false
featured: false
---

Your content in Markdown...
```

### Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | No | SEO description |
| `excerpt` | string | No | Card summary |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `author` | string | Yes | Author name |
| `category` | string | Yes | Primary category |
| `tags` | array | No | Related tags |
| `draft` | boolean | No | Exclude from build |
| `featured` | boolean | No | Show in featured section |

---

## Customization

### Theme Colors

Edit `src/index.css` to customize the color palette:

```css
@theme {
  --color-writer-bg: #fafafa;
  --color-writer-accent: #2563eb;
  /* ... more colors */
}
```

### Typography

Change fonts in `src/index.css`:

```css
--font-serif: 'Literata', 'Georgia', serif;
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Site Configuration

Update site metadata in `src/utils/seo/meta.ts`:

```typescript
const siteConfig = {
  title: 'Your Blog Title',
  description: 'Your blog description',
  url: 'https://yourdomain.com',
  author: 'Your Name',
}
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Vercel will detect the config automatically

Or use the CLI:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. Connect your repository in Netlify
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### GitHub Pages

Already configured! Just push to `main` branch.

```bash
git push origin main
```

GitHub Actions will build and deploy automatically.

---

## Build Process

The build process includes:

1. **TypeScript compilation** - Type checking
2. **Vite build** - Optimized bundles
3. **SSG generation** - Pre-rendered HTML
4. **SEO files** - sitemap.xml, robots.txt, rss.xml

```bash
npm run build
```

Output in `dist/` folder, ready for deployment.

---

## Performance

- Lighthouse Score: 95-100
- First Contentful Paint: <1s
- Time to Interactive: <2s
- Bundle size: ~150KB (gzipped)

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Vue 3.5+ |
| SSG | Vite-SSG |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS v4 |
| State | Pinia |
| Routing | Vue Router 4 |
| Content | Markdown + gray-matter |
| Syntax Hl | highlight.js |
| Icons | Lucide Vue |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run generate-seo` | Generate SEO files |
| `npm run type-check` | TypeScript check |
| `npm run new-post` | Create new post |

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

## License

MIT License - feel free to use this project for your own blog.

---

<div align="center">

**Built with ❤️ using Vue 3 and Vite-SSG**

</div>
