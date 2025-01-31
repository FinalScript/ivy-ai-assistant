import { db } from "../db"
import { eq } from "drizzle-orm"
import { NewUser, User } from "../db/schema/user.schema"
import { users } from "../db/schema"

/**
 * Retrieves a user by their ID
 * @param id - The user's UUID
 * @returns The user object if found, null otherwise
 */
export const findUserById = async (id: string): Promise<User | null> => {
  const user = await db.select().from(users).where(eq(users.id, id))
  return user[0] || null
}

/**
 * Creates a new user profile
 * @param user - The user data to insert
 * @returns The created user object
 */
export const createUser = async (user: NewUser): Promise<User> => {
  const [newUser] = await db.insert(users).values(user).returning()
  return newUser
}

/**
 * Updates a user's profile information
 * @param id - The user's UUID
 * @param user - Partial user data to update
 * @returns The updated user object
 */
export const updateUser = async (id: string, user: Partial<NewUser>): Promise<User> => {
  const [updatedUser] = await db.update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning()
  return updatedUser
}

/**
 * Deletes a user's profile
 * @param id - The user's UUID
 */
export const deleteUser = async (id: string): Promise<void> => {
  await db.delete(users).where(eq(users.id, id))
}

