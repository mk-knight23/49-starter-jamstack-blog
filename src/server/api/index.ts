import express from 'express'
import cors from 'cors'
import type { Request, Response } from 'express'
import { authenticate, type AuthRequest } from './middleware/auth'
import * as authRoutes from './routes/auth'
import * as postRoutes from './routes/posts'
import * as commentRoutes from './routes/comments'
import * as analyticsRoutes from './routes/analytics'

const app = express()
const PORT = process.env.API_PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Auth routes
app.post('/api/auth/login', authRoutes.login)
app.get('/api/auth/verify', authenticate, authRoutes.verify)

// Post routes (public)
app.get('/api/posts', postRoutes.getAllPosts)
app.get('/api/posts/featured', postRoutes.getFeaturedPosts)
app.get('/api/posts/:slug', postRoutes.getPostBySlug)
app.get('/api/posts/id/:id', postRoutes.getPostById)
app.get('/api/categories/:category/posts', postRoutes.getPostsByCategory)
app.get('/api/tags/:tag/posts', postRoutes.getPostsByTag)

// Post routes (admin only)
app.post('/api/posts', authenticate, postRoutes.createPost)
app.put('/api/posts/:id', authenticate, postRoutes.updatePost)
app.delete('/api/posts/:id', authenticate, postRoutes.deletePost)

// Comment routes (public)
app.get('/api/posts/:postId/comments', commentRoutes.getCommentsByPostId)
app.post('/api/comments', commentRoutes.createComment)

// Comment routes (admin only)
app.get('/api/comments/pending', authenticate, commentRoutes.getPendingComments)
app.put('/api/comments/:id/approve', authenticate, commentRoutes.approveComment)
app.delete('/api/comments/:id', authenticate, commentRoutes.deleteComment)

// Analytics routes (public)
app.post('/api/analytics/track', analyticsRoutes.trackPageView)
app.get('/api/posts/:postId/analytics', analyticsRoutes.getPostAnalytics)
app.get('/api/analytics/popular', analyticsRoutes.getPopularPosts)

// Analytics routes (admin only)
app.get('/api/analytics/all', authenticate, analyticsRoutes.getAllAnalytics)

// Start server only if not in build mode
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`)
  })
}

export default app
