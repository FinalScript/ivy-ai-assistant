import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Navbar from '../components/Navbar';

function Root() {
    return (
        <>
            <Navbar />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}

export const Route = createRootRoute({
    component: Root,
    beforeLoad: ({ location }) => {
        const token = localStorage.getItem('auth_token');
        const publicRoutes = ['/auth', '/onboarding', '/'];

        // Allow access to public routes
        if (publicRoutes.includes(location.pathname)) {
            return;
        }

        // Redirect to auth if not logged in
        if (!token) {
            throw redirect({
                to: '/auth',
            });
        }

        // Check if user has completed onboarding
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.onboardingCompleted && location.pathname !== '/onboarding') {
            throw redirect({
                to: '/onboarding',
            });
        }
    },
});
