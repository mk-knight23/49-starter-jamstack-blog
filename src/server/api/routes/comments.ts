import type { Request, Response } from 'express'
import { commentDb } from '../../db'
import type { AuthRequest } from '../middleware/auth'

export function getCommentsByPostId(req: Request, res: Response): void {
  const { postId } = req.params
  const approvedOnly = req.query.approved !== 'false'
  const comments = commentDb.findByPostId(parseInt(postId), approvedOnly)

  res.json({ success: true, data: comments })
}

export function createComment(req: Request, res: Response): void {
  try {
    const { post_id, author_name, author_email, content, parent_id } = req.body

    if (!post_id || !author_name || !author_email || !content) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }

    const result = commentDb.create({
      post_id: parseInt(post_id),
      author_name,
      author_email,
      content,
      parent_id: parent_id || null,
      approved: false, // Require moderation
    })

    const comment = commentDb.findByPostId(parseInt(post_id), false).find(c => c.id === result.lastInsertRowid)

    res.json({ success: true, data: comment })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function approveComment(req: AuthRequest, res: Response): void {
  try {
    const { id } = req.params
    commentDb.approve(parseInt(id))
    res.json({ success: true })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function deleteComment(req: AuthRequest, res: Response): void {
  try {
    const { id } = req.params
    commentDb.delete(parseInt(id))
    res.json({ success: true })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export function getPendingComments(_req: AuthRequest, res: Response): void {
  try {
    const comments = commentDb.getPending()
    res.json({ success: true, data: comments })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
