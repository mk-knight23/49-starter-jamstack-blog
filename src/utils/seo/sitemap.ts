import type { Post } from '@/utils/content/schema'
import { writeFile } from 'fs/promises'
import { join } from 'path'

const siteUrl = 'https://49-starter-jamstack-blog.vercel.app'

export async function generateSitemap(posts: Post[], distPath: string) {
  const staticPages = [
    {
      url: siteUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
  ]

  const postPages = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'weekly' as const,
    priority: 0.7,
  }))

  const allPages = [...staticPages, ...postPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  await writeFile(join(distPath, 'sitemap.xml'), sitemap)
}

export async function generateRobotsTxt(distPath: string) {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml

# Disallow specific paths if needed
# Disallow: /private/
`

  await writeFile(join(distPath, 'robots.txt'), robotsTxt)
}
