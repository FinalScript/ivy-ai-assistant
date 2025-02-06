import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { supabase } from '../lib/supabase'

// Create an http link
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
})

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          processingStatus: {
            // Don't cache processing status results
            merge: false
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // Don't cache polling queries
      nextFetchPolicy: 'network-only'
    },
    query: {
      fetchPolicy: 'network-only' // Don't cache one-time queries
    }
  }
}) 