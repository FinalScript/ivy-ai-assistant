import { eq, and } from 'drizzle-orm'
import { db } from '../db'
import { courses, Course, NewCourse } from '../db/schema/course.schema'

export const createCourse = async (courseData: NewCourse): Promise<Course> => {
  const [newCourse] = await db.insert(courses).values(courseData).returning()
  return newCourse
}

export const getCourseById = async (id: string): Promise<Course | null> => {
  const [course] = await db.select().from(courses).where(eq(courses.id, id))
  return course || null
}

export const getCoursesByUserId = async (userId: string): Promise<Course[]> => {
  return db.select().from(courses).where(eq(courses.userId, userId))
}

export const getCoursesByTerm = async (userId: string, term: string): Promise<Course[]> => {
  return db
    .select()
    .from(courses)
    .where(and(eq(courses.userId, userId), eq(courses.term, term)))
}

export const updateCourse = async (id: string, courseData: Partial<NewCourse>): Promise<Course | null> => {
  const [updatedCourse] = await db
    .update(courses)
    .set(courseData)
    .where(eq(courses.id, id))
    .returning()
  return updatedCourse || null
}

export const deleteCourse = async (id: string): Promise<boolean> => {
  const [deletedCourse] = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning()
  return !!deletedCourse
}

export const createManyCourses = async (coursesData: NewCourse[]): Promise<Course[]> => {
  const newCourses = await db.insert(courses).values(coursesData).returning()
  return newCourses
} 