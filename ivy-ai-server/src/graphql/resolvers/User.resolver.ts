import { AuthenticationError } from 'apollo-server-express'
import { AuthService, SignUpInput, SignInInput, AuthResponse } from '../../services/auth.service'
import { findUserById, updateUser } from '../../controllers/User.controller'
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
 * Arguments for onboarding mutation
 */
interface OnboardingArgs {
  input: {
    firstName: string
    lastName: string
    school: string
    major: string
    graduationYear: string
  }
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

    /**
     * Completes the user onboarding process
     * @param input - User onboarding data
     * @returns Updated user profile
     */
    completeOnboarding: async (_: unknown, { input }: OnboardingArgs, context: Context): Promise<User> => {
      if (!context.user) throw new AuthenticationError('Not authenticated')
      
      const fullName = `${input.firstName} ${input.lastName}`.trim()
      
      return updateUser(context.user.id, {
        firstName: input.firstName,
        lastName: input.lastName,
        school: input.school,
        major: input.major,
        graduationYear: input.graduationYear,
        onboardingCompleted: true,
      })
    },
  },

  // Field resolvers for the User type
  User: {
    /**
     * Resolves the user's first name
     */
    firstName: (parent: User): string | null => parent.firstName,

    /**
     * Resolves the user's last name
     */
    lastName: (parent: User): string | null => parent.lastName,

    /**
     * Resolves the user's school
     */
    school: (parent: User): string | null => parent.school,

    /**
     * Resolves the user's major
     */
    major: (parent: User): string | null => parent.major,

    /**
     * Resolves the user's graduation year
     */
    graduationYear: (parent: User): string | null => parent.graduationYear,

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
