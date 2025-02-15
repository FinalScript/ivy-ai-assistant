import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './global.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';
import LoadingScreen from './components/LoadingScreen';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <ApolloProvider client={apolloClient}>
                <AuthProvider>
                    <ThemeProvider>
                        <Suspense fallback={<LoadingScreen />}>
                            <RouterProvider router={router} />
                        </Suspense>
                    </ThemeProvider>
                </AuthProvider>
            </ApolloProvider>
        </StrictMode>
    );
}
