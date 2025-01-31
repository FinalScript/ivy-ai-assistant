import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
});

// Register things for typesafety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const client = new ApolloClient({
    uri: 'http://localhost:54321/graphql',
    cache: new InMemoryCache(),
});

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
}
