import type { Post } from '@/utils/content/schema'
import { writeFile } from 'fs/promises'
import { join } from 'path'

const siteConfig = {
  title: 'Vue SSG Editorial Blog',
  description: 'A high-performance editorial blog built with Vue 3, Vite-SSG, and TypeScript',
  url: 'https://49-starter-jamstack-blog.vercel.app',
  author: 'M. Kazi',
}

export async function generateRSSFeed(posts: Post[], distPath: string) {
  const feedItems = posts
    .map(
      post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt || post.description || '')}</description>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid>${siteConfig.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      ${post.tags ? post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ') : ''}
    </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${feedItems}
  </channel>
</rss>`

  await writeFile(join(distPath, 'rss.xml'), rss)
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
