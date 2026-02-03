import { loadAllPosts } from '../src/utils/content/loader.js'
import { getDb, closeDb, postDb } from '../src/server/db/index.js'

async function seedDatabase() {
  console.log('Loading posts from markdown files...')

  const posts = await loadAllPosts()
  console.log(`Found ${posts.length} posts`)

  console.log('Seeding database...')

  for (const post of posts) {
    try {
      postDb.create({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || post.description,
        author: post.author,
        category: post.category,
        tags: post.tags?.join(', ') || '',
        featured: post.featured || false,
        published: !post.draft,
        draft: post.draft || false,
      })
      console.log(`✓ Seeded: ${post.title}`)
    } catch (error: any) {
      if (error.message.includes('UNIQUE constraint')) {
        console.log(`- Skipped (exists): ${post.title}`)
      } else {
        console.error(`✗ Failed: ${post.title}`, error.message)
      }
    }
  }

  console.log('Database seeded successfully!')
  closeDb()
}

seedDatabase().catch(console.error)
