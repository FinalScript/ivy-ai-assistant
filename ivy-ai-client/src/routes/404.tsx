import { createFileRoute, Link } from '@tanstack/react-router';
import { Bot } from 'lucide-react';

export const Route = createFileRoute('/404')({
    component: NotFound,
    validateSearch: null as any,
});

function NotFound() {
    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
            <div className='text-center'>
                <div className='flex justify-center mb-6'>
                    <Bot className='w-24 h-24 text-base-content/20' />
                </div>
                <h1 className='text-5xl font-bold mb-4'>404</h1>
                <h2 className='text-2xl font-semibold mb-2'>Page Not Found</h2>
                <p className='text-base-content/70 mb-8 max-w-md'>Oops! The page you're looking for doesn't exist or has been moved.</p>
                <div className='flex gap-4 justify-center'>
                    <Link to='/' className='btn btn-primary'>
                        Go Home
                    </Link>
                    <button onClick={() => window.history.back()} className='btn btn-outline'>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
