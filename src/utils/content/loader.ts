import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import hljs from 'markdown-it-highlightjs'
import type { Post, PostFrontmatter } from './schema'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

md.use(hljs)

const POSTS_DIR = path.resolve(__dirname, '../../../content/posts')

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function loadAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'))

  const posts: Post[] = files
    .map(filename => {
      const filePath = path.join(POSTS_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const frontmatter = data as PostFrontmatter

      // Skip draft posts in production
      if (frontmatter.draft && process.env.NODE_ENV === 'production') {
        return null
      }

      const id = filename.replace(/\.md$/, '')
      const slug = frontmatter.title ? slugify(frontmatter.title) : id

      return {
        id,
        slug,
        content,
        html: md.render(content),
        readTimeCalc: calculateReadTime(content),
        ...frontmatter,
      }
    })
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => {
      if (!a || !b) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

export async function loadPostById(id: string): Promise<Post | null> {
  const posts = await loadAllPosts()
  return posts.find(post => post.id === id) || null
}

export async function loadPostBySlug(slug: string): Promise<Post | null> {
  const posts = await loadAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await loadAllPosts()
  return posts.filter(post => post.tags?.includes(tag))
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await loadAllPosts()
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase())
}

export async function getAllTags(): Promise<string[]> {
  const posts = await loadAllPosts()
  const tags = new Set<string>()
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await loadAllPosts()
  const categories = new Set<string>()
  posts.forEach(post => categories.add(post.category))
  return Array.from(categories).sort()
}
