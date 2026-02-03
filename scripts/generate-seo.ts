import { loadAllPosts } from '../src/utils/content/loader'
import { generateSitemap, generateRobotsTxt } from '../src/utils/seo/sitemap'
import { generateRSSFeed } from '../src/utils/seo/rss'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')

async function generateSEOFiles() {
  console.log('🔍 Loading posts...')
  const posts = await loadAllPosts()

  console.log(`📝 Found ${posts.length} posts`)

  console.log('🗺️  Generating sitemap.xml...')
  await generateSitemap(posts, distPath)

  console.log('🤖 Generating robots.txt...')
  await generateRobotsTxt(distPath)

  console.log('📡 Generating RSS feed...')
  await generateRSSFeed(posts, distPath)

  console.log('✅ SEO files generated successfully!')
}

generateSEOFiles().catch(console.error)
