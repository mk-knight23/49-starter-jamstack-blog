# Design System | CINEMA. Theme

## Theme Identity

**Theme Name:** Movie / Series Inspired UI
**Primary Color:** Gold (`#d4af37`)
**Background:** Deep Black (`#0a0a0a`)

## Design Principles

1. **Cinematic Feel** - Dark backgrounds mimic movie theater environments
2. **Premium Aesthetics** - Gold accents suggest quality and prestige
3. **Editorial Layout** - Magazine-style layout for reviews and articles
4. **Visual Hierarchy** - Star ratings, badges, and poster cards guide attention

## Color System

### Primary Palette

```css
--color-cinema-gold: #d4af37;
--color-cinema-gold-dim: #9a7b2d;
--color-cinema-gold-light: #f4d160;
--color-cinema-red: #c41e3a;
--color-cinema-red-dim: #8b1528;
```

### Backgrounds

```css
--color-cinema-bg: #0a0a0a;
--color-cinema-bg-light: #141414;
--color-cinema-card: #1a1a1a;
--color-cinema-border: rgba(255, 255, 255, 0.1);
```

### Text Colors

```css
--color-cinema-white: #f5f5f5;
--color-cinema-muted: #737373;
```

## Typography

- **Playfair Display** - Headlines, titles, hero text
- **Inter** - Body copy, descriptions
- **JetBrains Mono** - Dates, metadata, ratings

## Component Patterns

### Movie Poster Card

```html
<div class="cinema-poster cinema-card group">
  <div class="aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-900"></div>
  <div class="cinema-poster-overlay">
    <!-- Hover content -->
  </div>
</div>
```

### Star Rating

```html
<div class="cinema-rating">
  <Star class="cinema-star" :size="16" fill="currentColor" />
  <span class="font-mono text-sm">4.5/5</span>
</div>
```

### Movie Badge

```html
<span class="cinema-badge">
  <Star :size="12" fill="currentColor" /> PREMIERE
</span>
```

### Review Button

```html
<button class="cinema-button">
  <Play :size="16" fill="currentColor" /> WATCH TRAILER
</button>
```

## Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| fade-in | 0.5s | Page content reveal |
| slide-up | 0.6s | Hero sections |
| scale-in | 0.3s | Modal/overlay open |
| glow | 2s | Gold accent pulse |

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Reduced motion preference respected
- Sufficient color contrast for gold on dark

## Mobile Considerations

- Responsive grid layouts (1/2/3 columns)
- Touch-friendly button sizes (minimum 44px)
- Collapsible navigation on mobile
- Aspect ratio preserved for posters
