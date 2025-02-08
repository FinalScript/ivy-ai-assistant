import { gql } from "../__generated__";
import { User } from './auth'

export const COMPLETE_ONBOARDING_MUTATION = gql(`
    mutation CompleteOnboarding($input: OnboardingInput!) {
        completeOnboarding(input: $input) {
            id
            email
            firstName
            lastName
            school
            major
            graduationYear
            onboardingCompleted
        }
    }
`);

export interface OnboardingInput {
    firstName: string
    lastName: string
    school: string
    major: string
    graduationYear: string
}

export interface OnboardingUser extends User {
    firstName: string | null
    lastName: string | null
    school: string | null
    major: string | null
    graduationYear: string | null
    onboardingCompleted: boolean
}