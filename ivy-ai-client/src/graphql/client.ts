import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { supabase } from '../lib/supabase'

// Create an http link
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
})

// Create WebSocket link
const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_GRAPHQL_WS_URL || 'ws://localhost:4000/subscriptions',
  connectionParams: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return {
      authorization: session?.access_token ? `Bearer ${session.access_token}` : ''
    }
  }
}))

// Add authentication to requests
const authLink = setContext(async (_, { headers }) => {
  // Get the session from Supabase
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token

  // Return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

// Split links based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only'
    },
    query: {
      fetchPolicy: 'network-only'
    }
  }
}) 