import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { schemaSQL } from './schema'

const DB_DIR = path.resolve(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'blog.db')

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)

    // Enable foreign keys
    db.pragma('foreign_keys = ON')

    // Initialize schema
    db.exec(schemaSQL)

    // Create default admin user if not exists
    const adminExists = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number }
    if (adminExists.count === 0) {
      const bcrypt = require('bcryptjs')
      const passwordHash = bcrypt.hashSync('admin123', 10)
      db.prepare('INSERT INTO admin_users (username, password_hash, created_at) VALUES (?, ?, ?)').run(
        'admin',
        passwordHash,
        new Date().toISOString()
      )
      console.log('Created default admin user: admin / admin123')
    }
  }

  return db
}

export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}

// Post operations
export const postDb = {
  findAll: (publishedOnly = true): any[] => {
    const db = getDb()
    const query = publishedOnly
      ? 'SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC'
      : 'SELECT * FROM posts ORDER BY created_at DESC'
    return db.prepare(query).all()
  },

  findById: (id: number): any => {
    const db = getDb()
    return db.prepare('SELECT * FROM posts WHERE id = ?').get(id)
  },

  findBySlug: (slug: string): any => {
    const db = getDb()
    return db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug)
  },

  create: (post: any): any => {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO posts (title, slug, content, excerpt, author, category, tags, featured, published, draft, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    return stmt.run(
      post.title,
      post.slug,
      post.content,
      post.excerpt || null,
      post.author,
      post.category,
      post.tags || null,
      post.featured ? 1 : 0,
      post.published !== false ? 1 : 0,
      post.draft ? 1 : 0,
      new Date().toISOString(),
      new Date().toISOString()
    )
  },

  update: (id: number, post: any): any => {
    const db = getDb()
    const stmt = db.prepare(`
      UPDATE posts
      SET title = ?, slug = ?, content = ?, excerpt = ?, author = ?, category = ?, tags = ?, featured = ?, published = ?, draft = ?, updated_at = ?
      WHERE id = ?
    `)
    return stmt.run(
      post.title,
      post.slug,
      post.content,
      post.excerpt || null,
      post.author,
      post.category,
      post.tags || null,
      post.featured ? 1 : 0,
      post.published !== false ? 1 : 0,
      post.draft ? 1 : 0,
      new Date().toISOString(),
      id
    )
  },

  delete: (id: number): any => {
    const db = getDb()
    return db.prepare('DELETE FROM posts WHERE id = ?').run(id)
  },

  getFeatured: (): any[] => {
    const db = getDb()
    return db.prepare('SELECT * FROM posts WHERE featured = 1 AND published = 1 ORDER BY created_at DESC').all()
  },

  getByCategory: (category: string): any[] => {
    const db = getDb()
    return db.prepare('SELECT * FROM posts WHERE category = ? AND published = 1 ORDER BY created_at DESC').all(category)
  },

  getByTag: (tag: string): any[] => {
    const db = getDb()
    const posts = db.prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC').all() as any[]
    return posts.filter(post => {
      const tags = post.tags ? post.tags.split(',').map((t: string) => t.trim()) : []
      return tags.includes(tag)
    })
  },
}

// Comment operations
export const commentDb = {
  findByPostId: (postId: number, approvedOnly = true): any[] => {
    const db = getDb()
    const query = approvedOnly
      ? 'SELECT * FROM comments WHERE post_id = ? AND approved = 1 ORDER BY created_at ASC'
      : 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC'
    return db.prepare(query).all(postId)
  },

  create: (comment: any): any => {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO comments (post_id, author_name, author_email, content, parent_id, approved, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    return stmt.run(
      comment.post_id,
      comment.author_name,
      comment.author_email,
      comment.content,
      comment.parent_id || null,
      comment.approved ? 1 : 0,
      new Date().toISOString()
    )
  },

  approve: (id: number): any => {
    const db = getDb()
    return db.prepare('UPDATE comments SET approved = 1 WHERE id = ?').run(id)
  },

  delete: (id: number): any => {
    const db = getDb()
    return db.prepare('DELETE FROM comments WHERE id = ?').run(id)
  },

  getPending: (): any[] => {
    const db = getDb()
    return db.prepare('SELECT c.*, p.title as post_title FROM comments c JOIN posts p ON c.post_id = p.id WHERE c.approved = 0 ORDER BY c.created_at DESC').all()
  },
}

// Analytics operations
export const analyticsDb = {
  findByPostId: (postId: number): any => {
    const db = getDb()
    return db.prepare('SELECT * FROM analytics WHERE post_id = ?').get(postId)
  },

  incrementViews: (postId: number, isUnique = false): void => {
    const db = getDb()
    const existing = db.prepare('SELECT * FROM analytics WHERE post_id = ?').get(postId) as any

    if (existing) {
      const stmt = db.prepare(`
        UPDATE analytics
        SET page_views = page_views + 1,
            unique_visitors = unique_visitors + ?,
            last_viewed = ?
        WHERE post_id = ?
      `)
      stmt.run(isUnique ? 1 : 0, new Date().toISOString(), postId)
    } else {
      const stmt = db.prepare(`
        INSERT INTO analytics (post_id, page_views, unique_visitors, last_viewed)
        VALUES (?, 1, ?, ?)
      `)
      stmt.run(postId, isUnique ? 1 : 0, new Date().toISOString())
    }
  },

  getPopularPosts: (limit = 10): any[] => {
    const db = getDb()
    return db.prepare(`
      SELECT p.*, a.page_views, a.unique_visitors
      FROM posts p
      JOIN analytics a ON p.id = a.post_id
      WHERE p.published = 1
      ORDER BY a.page_views DESC
      LIMIT ?
    `).all(limit)
  },

  getAllStats: (): any[] => {
    const db = getDb()
    return db.prepare(`
      SELECT p.*, a.page_views, a.unique_visitors, a.last_viewed
      FROM posts p
      LEFT JOIN analytics a ON p.id = a.post_id
      ORDER BY a.page_views DESC
    `).all()
  },
}

// Tag operations
export const tagDb = {
  findAll: (): any[] => {
    const db = getDb()
    return db.prepare('SELECT * FROM tags ORDER BY post_count DESC, name').all()
  },

  findOrCreate: (name: string): any => {
    const db = getDb()
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    const existing = db.prepare('SELECT * FROM tags WHERE slug = ?').get(slug)

    if (existing) {
      return existing
    }

    const stmt = db.prepare('INSERT INTO tags (name, slug, post_count) VALUES (?, ?, 1)')
    stmt.run(name, slug)
    return db.prepare('SELECT * FROM tags WHERE slug = ?').get(slug)
  },

  updateCount: (name: string): void => {
    const db = getDb()
    db.prepare('UPDATE tags SET post_count = post_count + 1 WHERE name = ?').run(name)
  },
}

// Category operations
export const categoryDb = {
  findAll: (): any[] => {
    const db = getDb()
    return db.prepare('SELECT * FROM categories ORDER BY post_count DESC, name').all()
  },

  findOrCreate: (name: string): any => {
    const db = getDb()
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    const existing = db.prepare('SELECT * FROM categories WHERE slug = ?').get(slug)

    if (existing) {
      return existing
    }

    const stmt = db.prepare('INSERT INTO categories (name, slug, post_count) VALUES (?, ?, 1)')
    stmt.run(name, slug)
    return db.prepare('SELECT * FROM categories WHERE slug = ?').get(slug)
  },

  updateCount: (name: string): void => {
    const db = getDb()
    db.prepare('UPDATE categories SET post_count = post_count + 1 WHERE name = ?').run(name)
  },
}
