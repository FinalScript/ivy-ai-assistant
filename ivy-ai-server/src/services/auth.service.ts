import { supabase } from '../db/supabase'
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { User as SupabaseAuthUser } from '@supabase/supabase-js'
import { createUser, findUserById } from '../controllers/User.controller'
import { User } from '../db/schema'

export interface SignUpInput {
  email: string
  password: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

/**
 * Handles authentication-related operations using Supabase Auth
 * and synchronizes user data with our database
 */
export class AuthService {
  /**
   * Creates a new user account and profile
   * @param email - User's email address
   * @param password - User's password
   * @param fullName - Optional user's full name
   * @returns Auth response containing user data and access token
   */
  static async signUp({ email, password }: SignUpInput): Promise<AuthResponse> {
    // Create auth user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw new UserInputError(authError.message)
    if (!authData.user) throw new Error('User creation failed')

    try {
      // Create user profile in our database
      const newUser = await createUser({
        id: authData.user.id,
        email,
      })

      if (!authData.session?.access_token) {
        throw new Error('No access token generated')
      }

      return {
        user: newUser,
        token: authData.session.access_token,
      }
    } catch (error) {
      console.error('Profile creation failed:', error)
      throw new Error('Failed to create user profile')
    }
  }

  /**
   * Authenticates an existing user
   * @param email - User's email address
   * @param password - User's password
   * @returns Auth response containing user data and access token
   */
  static async signIn({ email, password }: SignInInput): Promise<AuthResponse> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) throw new AuthenticationError(authError.message)
    if (!authData.session?.access_token) {
      throw new Error('No access token generated')
    }

    const user = await findUserById(authData.user.id)
    if (!user) {
      throw new AuthenticationError('User profile not found')
    }

    return {
      user,
      token: authData.session.access_token,
    }
  }

  /**
   * Validates an access token and retrieves the associated user
   * @param token - JWT access token
   * @returns The authenticated user's data
   */
  static async validateToken(token: string): Promise<User> {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      throw new AuthenticationError('Invalid token')
    }

    const dbUser = await findUserById(user.id)
    if (!dbUser) {
      throw new AuthenticationError('User profile not found')
    }

    return dbUser
  }
} 