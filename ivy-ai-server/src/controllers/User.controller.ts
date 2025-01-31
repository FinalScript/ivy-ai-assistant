import { db } from "../db"
import { eq } from "drizzle-orm"
import { NewUser } from "../db/schema/user.schema"
import { users } from "../db/schema"

export const findUserById = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id))
  return user[0] || null
}

export const createUser = async (user: NewUser) => {
  const newUser = await db.insert(users).values(user)
  return newUser
}

export const updateUser = async (id: string, user: Partial<NewUser>) => {
  const [updatedUser] = await db.update(users).set(user).where(eq(users.id, id)).returning()
  return updatedUser
}

export const deleteUser = async (id: string) => {
  await db.delete(users).where(eq(users.id, id))
}

