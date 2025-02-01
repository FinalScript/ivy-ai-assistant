import { gql } from 'apollo-server-express'

/**
 * GraphQL schema definitions for User-related types and operations
 * Includes types for user data, authentication, and profile management
 */
export const UserSchema = gql`
  # Custom scalar for handling dates
  scalar Date

  # User type representing profile data
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    school: String
    major: String
    graduationYear: String
    onboardingCompleted: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  # Response type for authentication operations
  type AuthResponse {
    user: User
    token: String!
  }

  # Input type for user registration
  input SignUpInput {
    email: String!
    password: String!
  }

  # Input type for user authentication
  input SignInInput {
    email: String!
    password: String!
  }

  # Input type for onboarding profile update
  input OnboardingInput {
    firstName: String!
    lastName: String!
    school: String!
    major: String!
    graduationYear: String!
  }

  # Input type for profile updates
  input UpdateProfileInput {
    fullName: String
    avatarUrl: String
  }

  type Query {
    me: User
    user(id: ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthResponse!
    signIn(input: SignInInput!): AuthResponse!
    completeOnboarding(input: OnboardingInput!): User!
    updateProfile(input: UpdateProfileInput!): User!
  }

  scalar DateTime
`
