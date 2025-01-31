import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { context } from './src/graphql/context'
import { schema } from './src/graphql/schemas'
import { resolvers } from './src/graphql/resolvers'
import cors from 'cors'

/**
 * Main application setup
 * Configures Express with Apollo Server and necessary middleware
 */
const app = express()

app.use(cors())
app.use(express.json())

// Initialize Apollo Server with GraphQL schema and context
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
})

// Start the server
const startServer = async () => {
  await server.start()
  server.applyMiddleware({ app })
  
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

startServer().catch(console.error)