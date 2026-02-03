import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface AuthRequest extends Request {
  userId?: number
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.substring(7)

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}
