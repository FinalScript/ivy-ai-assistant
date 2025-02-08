import { gql } from '../__generated__';

export const ME_QUERY = gql(`
  query Me {
    me {
      id
      email
      onboardingCompleted
    }
  }
`);

export interface User {
  id: string
  email: string
  onboardingCompleted: boolean
}

export interface AuthResponse {
  token: string
  user: User
}

export interface SignUpInput {
  email: string
  password: string
}

export interface SignInInput {
  email: string
  password: string
} 