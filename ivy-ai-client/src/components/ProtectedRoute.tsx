import { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../providers/AuthProvider';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        navigate({ to: '/auth' });
        return null;
    }

    return <>{children}</>;
}
