import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/schemas'
import { authMiddleware } from './middleware/auth.middleware'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const context = await authMiddleware(req)
    return context
  },
}) 