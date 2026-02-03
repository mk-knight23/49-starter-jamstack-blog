import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { getDb } from '../../db'
import { generateToken } from '../middleware/auth'

export function login(req: Request, res: Response): void {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' })
    return
  }

  const db = getDb()
  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const isValid = bcrypt.compareSync(password, user.password_hash)

  if (!isValid) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const token = generateToken(user.id)
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  })
}

export function verify(req: Request, res: Response): void {
  res.json({ success: true, valid: true })
}
