import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Navbar from '../components/Navbar';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apollo';
import { AuthProvider } from '../providers/AuthProvider';

export const Route = createRootRoute({
    component: () => (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <Navbar />
                <Outlet />
                <TanStackRouterDevtools />
            </AuthProvider>
        </ApolloProvider>
    ),
});
