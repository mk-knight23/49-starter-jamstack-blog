# Deployment Workflow

## Pre-Deployment Checklist

- [ ] All posts have complete frontmatter
- [ ] No draft posts marked as `featured`
- [ ] Test build locally: `npm run build`
- [ ] Preview production build: `npm run preview`
- [ ] Check SEO files are generated (sitemap.xml, robots.txt, rss.xml)
- [ ] Verify all routes work correctly
- [ ] Test on mobile viewport
- [ ] Validate accessibility

## Deployment Options

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configuration:** Already configured in `vercel.json`

### Netlify

1. **Connect repository** in Netlify dashboard
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Configuration:** Already configured in `netlify.toml`

### GitHub Pages

1. **Push to main branch**
2. **GitHub Actions** will auto-deploy
3. **Configuration:** `.github/workflows/deploy.yml`

## Post-Deployment

- [ ] Check deployment URL
- [ ] Verify sitemap.xml is accessible
- [ ] Test RSS feed at /rss.xml
- [ ] Validate robots.txt
- [ ] Run Lighthouse audit
- [ ] Check social sharing previews
