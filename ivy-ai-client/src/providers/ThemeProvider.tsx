import { ReactNode, useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Set theme from localStorage or default to light
        document.documentElement.setAttribute('data-theme', theme);
        
        // Ensure minimum loading time of 1 second
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [theme]);

    // Update localStorage when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
} 