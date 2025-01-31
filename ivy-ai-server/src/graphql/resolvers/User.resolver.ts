import { AuthenticationError } from 'apollo-server-express'
import { AuthService } from '../../services/auth.service'
import { findUserById } from '../../controllers/User.controller'

export const UserResolver = {
  Query: {
    me: async (_: any, __: any, { user }: { user: any }) => {
      if (!user) throw new AuthenticationError('Not authenticated')
      return user
    },
    user: async (_: any, { id }: { id: string }) => {
      return findUserById(id)
    },
  },

  Mutation: {
    signUp: async (_: any, { input }: { input: any }) => {
      return AuthService.signUp(input)
    },

    signIn: async (_: any, { input }: { input: any }) => {
      return AuthService.signIn(input)
    },
  },

  // Field resolvers
  User: {
    fullName: (parent: any) => parent.fullName,
    createdAt: (parent: any) => parent.createdAt,
    updatedAt: (parent: any) => parent.updatedAt,
  },
}
