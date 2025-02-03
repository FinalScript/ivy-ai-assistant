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
});
