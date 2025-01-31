import { supabase } from '../db/supabase'
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { User as SupabaseAuthUser } from '@supabase/supabase-js'
import { createUser, findUserById } from '../controllers/User.controller'

export interface SignUpInput {
  email: string
  password: string
  fullName?: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface AuthResponse {
  user: SupabaseAuthUser
  token: string
}

export class AuthService {
  static async signUp({ email, password, fullName }: SignUpInput): Promise<AuthResponse> {
    // 1. Create auth user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw new UserInputError(authError.message)
    if (!authData.user) throw new Error('User creation failed')

    try {
      // 2. Create user profile in our database using Drizzle
      await createUser({
        id: authData.user.id, // Use Supabase auth user id
        email,
        fullName: fullName || email.split('@')[0], // Fallback to email username
      })

      // 3. Return auth response
      if (!authData.session?.access_token) {
        throw new Error('No access token generated')
      }

      return {
        user: authData.user,
        token: authData.session.access_token,
      }
    } catch (error) {
      // 4. If profile creation fails, we should handle cleanup
      // TODO: Consider removing the auth user from Supabase
      console.error('Profile creation failed:', error)
      throw new Error('Failed to create user profile')
    }
  }

  static async signIn({ email, password }: SignInInput): Promise<AuthResponse> {
    // 1. Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) throw new AuthenticationError(authError.message)
    if (!authData.session?.access_token) {
      throw new Error('No access token generated')
    }

    // 2. Verify user exists in our database
    const user = await findUserById(authData.user.id)
    if (!user) {
      throw new AuthenticationError('User profile not found')
    }

    return {
      user: authData.user,
      token: authData.session.access_token,
    }
  }

  static async validateToken(token: string): Promise<SupabaseAuthUser> {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      throw new AuthenticationError('Invalid token')
    }

    // Verify user exists in our database
    const dbUser = await findUserById(user.id)
    if (!dbUser) {
      throw new AuthenticationError('User profile not found')
    }

    return user
  }
} 