import { AuthService } from '../services/auth.service'

export const context = async ({ req }) => {
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