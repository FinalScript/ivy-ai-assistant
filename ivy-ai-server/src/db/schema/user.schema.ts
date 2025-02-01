import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'

/**
 * Database schema for the users table
 * Stores user profile information separate from auth data
 */
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Links to Supabase auth user id
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  school: text('school'),
  major: text('major'),
  graduationYear: text('graduation_year'),
  onboardingCompleted: boolean('onboarding_completed').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Type inference from schema
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert 
