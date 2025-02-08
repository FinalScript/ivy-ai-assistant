import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import { supabase } from '../lib/supabase';
import { User } from '../__generated__/graphql';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signOut: () => Promise<void>;
    fetchUserData: (userId: string) => Promise<User | null>;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
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
    const [isLoading, setIsLoading] = useState(true);
    const apolloClient = useApolloClient();

    const fetchUserData = async (userId: string) => {
        const { data: dbUser, error } = await supabase.from('users').select('*').eq('id', userId).single();

        if (error || !dbUser) return null;

        return {
            id: dbUser.id,
            email: dbUser.email,
            firstName: dbUser.first_name,
            lastName: dbUser.last_name,
            school: dbUser.school,
            major: dbUser.major,
            graduationYear: dbUser.graduation_year,
            onboardingCompleted: dbUser.onboarding_completed,
            createdAt: new Date(dbUser.created_at),
            updatedAt: new Date(dbUser.updated_at),
        };
    };

    useEffect(() => {
        const initAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                const userData = await fetchUserData(session.user.id);
                if (userData) {
                    setUser(userData);
                }
            } else {
                setUser(null);
            }

            setIsLoading(false);
        };

        initAuth();
    }, []);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            console.log(session?.access_token);
        };

        getSession();
    }, [user]);

    const signOut = async () => {
        setIsLoading(true);
        await supabase.auth.signOut();
        setUser(null);
        await apolloClient.resetStore();
        setIsLoading(false);
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut,
        fetchUserData,
        setUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
