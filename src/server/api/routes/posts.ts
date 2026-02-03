import type { Request, Response } from 'express'
import { postDb } from '../../db'
import type { AuthRequest } from '../middleware/auth'

export function getAllPosts(req: Request, res: Response): void {
  const publishedOnly = req.query.published !== 'false'
  const posts = postDb.findAll(publishedOnly)

  // Parse tags for each post
  const parsedPosts = posts.map((post: any) => ({
    ...post,
    tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
    featured: !!post.featured,
    published: !!post.published,
    draft: !!post.draft,
  }))

  res.json({ success: true, data: parsedPosts })
}

export function getPostById(req: Request, res: Response): void {
  const { id } = req.params
  const post = postDb.findById(parseInt(id))

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
    return
  }

  const parsedPost = {
    ...post,
    tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
    featured: !!post.featured,
    published: !!post.published,
    draft: !!post.draft,
  }

  res.json({ success: true, data: parsedPost })
}

export function getPostBySlug(req: Request, res: Response): void {
  const { slug } = req.params
  const post = postDb.findBySlug(slug)

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
    return
  }

  const parsedPost = {
    ...post,
    tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
    featured: !!post.featured,
    published: !!post.published,
    draft: !!post.draft,
  }

  res.json({ success: true, data: parsedPost })
}

export function createPost(req: AuthRequest, res: Response): void {
  try {
    const result = postDb.create(req.body)
    const post = postDb.findById(parseInt(result.lastInsertRowid as string))

    res.json({
      success: true,
      data: {
        ...post,
        tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
      },
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function updatePost(req: AuthRequest, res: Response): void {
  try {
    const { id } = req.params
    postDb.update(parseInt(id), req.body)
    const post = postDb.findById(parseInt(id))

    res.json({
      success: true,
      data: {
        ...post,
        tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
      },
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function deletePost(req: AuthRequest, res: Response): void {
  try {
    const { id } = req.params
    postDb.delete(parseInt(id))
    res.json({ success: true })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function getFeaturedPosts(req: Request, res: Response): void {
  const posts = postDb.getFeatured()

  const parsedPosts = posts.map((post: any) => ({
    ...post,
    tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
  }))

  res.json({ success: true, data: parsedPosts })
}

export function getPostsByCategory(req: Request, res: Response): void {
  const { category } = req.params
  const posts = postDb.getByCategory(category)

  const parsedPosts = posts.map((post: any) => ({
    ...post,
    tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
  }))

  res.json({ success: true, data: parsedPosts })
}

export function getPostsByTag(req: Request, res: Response): void {
  const { tag } = req.params
  const posts = postDb.getByTag(tag)

  const parsedPosts = posts.map((post: any) => ({
    ...post,
    tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
  }))

  res.json({ success: true, data: parsedPosts })
}
