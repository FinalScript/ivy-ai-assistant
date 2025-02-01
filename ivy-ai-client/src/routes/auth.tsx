import { createFileRoute, useNavigate, redirect, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@apollo/client'
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from '../graphql/auth'
import type { AuthResponse, SignInInput, SignUpInput } from '../graphql/auth'
import { useAuth } from '../providers/AuthProvider'
import { AlertCircle, Bot, ArrowLeft } from 'lucide-react'

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

export const Route = createFileRoute('/auth')({
  component: Auth,
  beforeLoad: ({ location }) => {
    // Redirect to home if already authenticated
    const token = localStorage.getItem('auth_token')
    if (token && location.pathname === '/auth') {
      throw redirect({ to: '/' })
    }
  },
})

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setUser } = useAuth()
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const [signIn, { loading: signInLoading }] = useMutation<
    { signIn: AuthResponse },
    { input: SignInInput }
  >(SIGN_IN_MUTATION)

  const [signUp, { loading: signUpLoading }] = useMutation<
    { signUp: AuthResponse },
    { input: SignUpInput }
  >(SIGN_UP_MUTATION)

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setError(null)
      const response = await signIn({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      })

      if (response.data) {
        // Store the token
        localStorage.setItem('auth_token', response.data.signIn.token)
        // Update user context
        setUser(response.data.signIn.user)
        // Redirect to dashboard
        navigate({ to: '/' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    }
  }

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setError(null)
      const response = await signUp({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      })

      if (response.data) {
        // Store the token
        localStorage.setItem('auth_token', response.data.signUp.token)
        // Update user context
        setUser(response.data.signUp.user)
        // Redirect to dashboard
        navigate({ to: '/' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    }
  }

  const isLoading = signInLoading || signUpLoading

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 -top-48 -left-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 -top-48 -right-48 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 -bottom-48 -left-48 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 -bottom-48 -right-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      </div>

      <div className="card w-full max-w-sm bg-base-100 shadow-xl relative z-10 animate-fade-in">
        <div className="card-body p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <Bot className="w-12 h-12 text-primary animate-bounce-slow" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">Welcome to Ivy AI</h1>
            <p className="text-base-content/70 text-sm">
              {isLogin ? 'Sign in to continue' : 'Create an account to get started'}
            </p>
          </div>

          {error && (
            <div className="alert alert-error py-2 animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {isLogin ? (
            <>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`input input-bordered w-full transition-colors duration-200 ${loginForm.formState.errors.email ? 'input-error' : ''}`}
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email && (
                    <label className="label py-1">
                      <span className="label-text-alt text-error">{loginForm.formState.errors.email.message}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••"
                    className={`input input-bordered w-full transition-colors duration-200 ${loginForm.formState.errors.password ? 'input-error' : ''}`}
                    {...loginForm.register('password')}
                  />
                  {loginForm.formState.errors.password && (
                    <label className="label py-1">
                      <span className="label-text-alt text-error">{loginForm.formState.errors.password.message}</span>
                    </label>
                  )}
                  <label className="label py-1">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              <p className="text-center text-sm mt-4">
                Don't have an account?{' '}
                <button 
                  onClick={() => {
                    setIsLogin(false)
                    setError(null)
                  }} 
                  className="link link-primary hover:link-hover"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    spellCheck={false}
                    autoComplete="username"
                    autoCapitalize='none'
                    className={`input input-bordered w-full transition-colors duration-200 ${registerForm.formState.errors.email ? 'input-error' : ''}`}
                    {...registerForm.register('email')}
                  />
                  {registerForm.formState.errors.email && (
                    <label className="label py-1">
                      <span className="label-text-alt text-error">{registerForm.formState.errors.email.message}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••"
                    className={`input input-bordered w-full transition-colors duration-200 ${registerForm.formState.errors.password ? 'input-error' : ''}`}
                    {...registerForm.register('password')}
                  />
                  {registerForm.formState.errors.password && (
                    <label className="label py-1">
                      <span className="label-text-alt text-error">{registerForm.formState.errors.password.message}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••"
                    className={`input input-bordered w-full transition-colors duration-200 ${registerForm.formState.errors.confirmPassword ? 'input-error' : ''}`}
                    {...registerForm.register('confirmPassword')}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <label className="label py-1">
                      <span className="label-text-alt text-error">{registerForm.formState.errors.confirmPassword.message}</span>
                    </label>
                  )}
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
              <p className="text-center text-sm mt-4">
                Already have an account?{' '}
                <button 
                  onClick={() => {
                    setIsLogin(true)
                    setError(null)
                  }} 
                  className="link link-primary hover:link-hover"
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          <div className="divider my-4">OR</div>

          <button 
            className="btn w-full bg-white hover:bg-gray-100 text-gray-800 border-gray-300 gap-2 transition-colors duration-200"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Please wait...' : 'Continue with Google'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
