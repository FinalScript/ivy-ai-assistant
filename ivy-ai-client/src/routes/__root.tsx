import { createRootRoute, Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navbar';

function Root() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export const Route = createRootRoute({
    component: Root,
});
