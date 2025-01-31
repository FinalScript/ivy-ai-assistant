import { AuthenticationError } from 'apollo-server-express'
import { AuthService, SignUpInput, SignInInput, AuthResponse } from '../../services/auth.service'
import { findUserById } from '../../controllers/User.controller'
import { User } from '../../db/schema/user.schema'

/**
 * Context interface for GraphQL requests
 * Contains the authenticated user if available
 */
interface Context {
  user: User | null
}

/**
 * Arguments for the signUp mutation
 */
interface SignUpArgs {
  input: SignUpInput
}

/**
 * Arguments for the signIn mutation
 */
interface SignInArgs {
  input: SignInInput
}

/**
 * Arguments for user query
 */
interface UserArgs {
  id: string
}

/**
 * GraphQL resolvers for User-related operations
 * Handles queries and mutations for user data and authentication
 */
export const UserResolver = {
  Query: {
    /**
     * Returns the currently authenticated user
     * @throws {AuthenticationError} If no user is authenticated
     */
    me: async (_: unknown, __: unknown, context: Context): Promise<User> => {
      if (!context.user) throw new AuthenticationError('Not authenticated')
      return context.user
    },

    /**
     * Retrieves a user by their ID
     * @param id - The user's UUID
     */
    user: async (_: unknown, { id }: UserArgs): Promise<User | null> => {
      return findUserById(id)
    },
  },

  Mutation: {
    /**
     * Creates a new user account
     * @param input - User registration data
     * @returns Authentication response with user data and token
     */
    signUp: async (_: unknown, { input }: SignUpArgs): Promise<AuthResponse> => {
      return AuthService.signUp(input)
    },

    /**
     * Authenticates an existing user
     * @param input - User login credentials
     * @returns Authentication response with user data and token
     */
    signIn: async (_: unknown, { input }: SignInArgs): Promise<AuthResponse> => {
      return AuthService.signIn(input)
    },
  },

  // Field resolvers for the User type
  User: {
    /**
     * Resolves the user's full name
     */
    fullName: (parent: User): string | null => parent.fullName,

    /**
     * Resolves the user's creation date
     */
    createdAt: (parent: User): Date => parent.createdAt,

    /**
     * Resolves the user's last update date
     */
    updatedAt: (parent: User): Date => parent.updatedAt,
  },
}
