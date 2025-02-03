import { Request } from 'express'
import { AuthService } from '../services/auth.service'
import { User } from '../db/schema/user.schema'
import { MiddlewareFn } from 'type-graphql'
import { GraphQLContext } from '../graphql/context'
import { supabase } from '../db/supabase'
import { Context } from '../graphql/context'

export interface AuthContext {
  user?: User
}

export async function authMiddleware(req: Request): Promise<AuthContext> {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return {}
  }

  try {
    const user = await AuthService.validateToken(token)
    return { user }
  } catch (error) {
    return {}
  }
}

interface Context {
    user: User | null;
    req: Request;
}

export const isAuth = async ({ context }: { context: Context }, next: () => Promise<any>) => {
    const authHeader = context.req.headers.authorization;

    if (!authHeader) {
        throw new Error('Not authenticated');
    }

    try {
        const token = authHeader.split(' ')[1];
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);

        if (error || !supabaseUser) {
            throw new Error('Not authenticated');
        }

        // Query the user from the database using Supabase user ID
        const { data: dbUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();

        if (!dbUser) {
            throw new Error('User not found');
        }

        // Set the user in context with all required fields
        context.user = {
            id: dbUser.id,
            email: dbUser.email,
            firstName: dbUser.first_name || null,
            lastName: dbUser.last_name || null,
            school: dbUser.school || null,
            major: dbUser.major || null,
            graduationYear: dbUser.graduation_year || null,
            onboardingCompleted: dbUser.onboarding_completed,
            createdAt: new Date(dbUser.created_at),
            updatedAt: new Date(dbUser.updated_at),
        };

        return next();
    } catch (err) {
        throw new Error('Not authenticated');
    }
}; 