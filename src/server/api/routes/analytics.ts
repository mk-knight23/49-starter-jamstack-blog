import type { Request, Response } from 'express'
import { analyticsDb } from '../../db'
import type { AuthRequest } from '../middleware/auth'

export function trackPageView(req: Request, res: Response): void {
  try {
    const { post_id } = req.body
    const isUnique = req.body.is_unique === true

    if (!post_id) {
      res.status(400).json({ error: 'post_id is required' })
      return
    }

    analyticsDb.incrementViews(parseInt(post_id), isUnique)
    res.json({ success: true })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function getPostAnalytics(req: Request, res: Response): void {
  try {
    const { postId } = req.params
    const postIdStr = Array.isArray(postId) ? postId[0] : postId
    const analytics = analyticsDb.findByPostId(parseInt(postIdStr, 10))

    if (!analytics) {
      res.json({
        success: true,
        data: {
          post_id: parseInt(postIdStr, 10),
          page_views: 0,
          unique_visitors: 0,
        },
      })
      return
    }

    res.json({ success: true, data: analytics })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function getPopularPosts(req: Request, res: Response): void {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
    const posts = analyticsDb.getPopularPosts(limit)

    const parsedPosts = posts.map((post: any) => ({
      ...post,
      tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
      featured: !!post.featured,
    }))

    res.json({ success: true, data: parsedPosts })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function getAllAnalytics(_req: AuthRequest, res: Response): void {
  try {
    const stats = analyticsDb.getAllStats()

    const parsedStats = stats.map((stat: any) => ({
      ...stat,
      tags: stat.tags ? stat.tags.split(',').map((t: string) => t.trim()) : [],
      featured: !!stat.featured,
    }))

    res.json({ success: true, data: parsedStats })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
