import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME_QUERY } from '../graphql/auth';
import type { User } from '../graphql/auth';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signOut: () => void;
    setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const apolloClient = useApolloClient();

    const { loading: isLoading } = useQuery(ME_QUERY, {
        onCompleted: (data) => {
            if (data?.me) {
                setUser(data.me);
            }
        },
        onError: () => {
            // Clear any stale token if the ME query fails
            localStorage.removeItem('auth_token');
            setUser(null);
        },
    });

    const signOut = async () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        // Reset Apollo cache
        await apolloClient.resetStore();
    };

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated: !!user,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
