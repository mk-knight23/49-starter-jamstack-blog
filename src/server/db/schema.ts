export interface PostRow {
  id?: number
  title: string
  slug: string
  content: string
  excerpt?: string
  author: string
  category: string
  tags?: string
  featured: boolean
  published: boolean
  draft: boolean
  created_at: string
  updated_at: string
}

export interface CommentRow {
  id?: number
  post_id: number
  author_name: string
  author_email: string
  content: string
  parent_id?: number
  approved: boolean
  created_at: string
}

export interface AnalyticsRow {
  id?: number
  post_id: number
  page_views: number
  unique_visitors: number
  last_viewed: string
}

export interface AdminUserRow {
  id?: number
  username: string
  password_hash: string
  created_at: string
}

export interface TagRow {
  id?: number
  name: string
  slug: string
  color?: string
  post_count: number
}

export interface CategoryRow {
  id?: number
  name: string
  slug: string
  color?: string
  post_count: number
}

// Database schema SQL
export const schemaSQL = `
-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT,
  featured INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1,
  draft INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id INTEGER,
  approved INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL UNIQUE,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  last_viewed TEXT,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT,
  post_count INTEGER DEFAULT 0
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT,
  post_count INTEGER DEFAULT 0
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);
CREATE INDEX IF NOT EXISTS idx_analytics_post_id ON analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_analytics_page_views ON analytics(page_views);
`
