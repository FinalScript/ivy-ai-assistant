import { eq, and } from 'drizzle-orm'
import { db } from '../db'
import { courses, Course, NewCourse } from '../db/schema/course.schema'

export const createCourse = async (courseData: NewCourse): Promise<Course> => {
  const [newCourse] = await db.insert(courses).values(courseData).returning()
  return newCourse
}

export const getCourseByCode = async (code: string): Promise<Course | null> => {
  const [course] = await db.select().from(courses).where(eq(courses.code, code))
  return course || null
}

export const getCoursesByUserId = async (userId: string): Promise<Course[]> => {
  return db.select().from(courses).where(eq(courses.userId, userId))
}