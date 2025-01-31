import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

/**
 * Database schema for the users table
 * Stores user profile information separate from auth data
 */
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Links to Supabase auth user id
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Type inference from schema
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert 
