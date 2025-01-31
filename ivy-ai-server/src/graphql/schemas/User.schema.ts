import { gql } from 'apollo-server-express'

export const UserSchema = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    fullName: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthResponse {
    user: User
    token: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    fullName: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

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
    updateProfile(input: UpdateProfileInput!): User!
  }

  scalar DateTime
`
