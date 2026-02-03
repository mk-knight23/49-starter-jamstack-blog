export interface PostFrontmatter {
  title: string
  description?: string
  excerpt?: string
  date: string
  author: string
  category: string
  tags?: string[]
  draft?: boolean
  featured?: boolean
  image?: string
  readTime?: number
}

export interface Post extends PostFrontmatter {
  id: string | number
  slug: string
  content: string
  html: string
  readTimeCalc: string
  created_at?: string
  updated_at?: string
  published?: boolean
}

export interface Comment {
  id: number
  post_id: number
  author_name: string
  author_email: string
  content: string
  parent_id?: number
  approved: boolean
  created_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  color?: string
  post_count: number
}

export interface Category {
  id: number
  name: string
  slug: string
  color?: string
  post_count: number
}

export interface Analytics {
  id: number
  post_id: number
  page_views: number
  unique_visitors: number
  last_viewed: string
}
