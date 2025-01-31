import { db } from "../db"
import { eq } from "drizzle-orm"
import { NewUser, User } from "../db/schema/user.schema"
import { users } from "../db/schema"

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await db.select().from(users).where(eq(users.id, id))
  return user[0] || null
}

export const createUser = async (user: NewUser): Promise<User> => {
  const [newUser] = await db.insert(users).values(user).returning()
  return newUser
}

export const updateUser = async (id: string, user: Partial<NewUser>): Promise<User> => {
  const [updatedUser] = await db.update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning()
  return updatedUser
}

export const deleteUser = async (id: string): Promise<void> => {
  await db.delete(users).where(eq(users.id, id))
}

