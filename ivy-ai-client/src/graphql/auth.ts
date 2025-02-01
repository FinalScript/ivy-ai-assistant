import { gql } from '@apollo/client'

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
        id
        email
        onboardingCompleted
      }
    }
  }
`

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        email
        onboardingCompleted
      }
    }
  }
`

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      onboardingCompleted
    }
  }
`

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