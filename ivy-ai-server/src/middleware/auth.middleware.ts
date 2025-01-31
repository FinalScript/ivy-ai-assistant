import { Request } from 'express'
import { AuthService } from '../services/auth.service'
import { User } from '../db/schema/user.schema'

export interface AuthContext {
  user?: User
}

export async function authMiddleware(req: Request): Promise<AuthContext> {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return {}
  }

  try {
    const user = await AuthService.validateToken(token)
    return { user }
  } catch (error) {
    return {}
  }
} 