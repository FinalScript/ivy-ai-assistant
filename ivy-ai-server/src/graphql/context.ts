import { AuthService } from '../services/auth.service'
import { User } from '../db/schema/user.schema'
import { Request } from 'express'

interface Context {
  user: User | null
}

interface ContextFunctionArgs {
  req: Request
}

/**
 * Creates the GraphQL context for each request
 * Handles authentication by validating the Authorization header
 */
export const context = async ({ req }: ContextFunctionArgs): Promise<Context> => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return { user: null }
  }

  try {
    const user = await AuthService.validateToken(token)
    return { user }
  } catch (error) {
    return { user: null }
  }
} 