import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { createCourse, getCourseByCode, getCoursesByUserId } from '../../controllers/Course.controller'
import { Course } from '../../db/schema/course.schema'
import { Context } from '../context'

interface CourseInput {
  code: string
  name: string
  description?: string
  term?: string
  assessments?: {
    title: string
    type: string
    dueDate: string
    description: string
    weight?: number
    status: string
    location?: string
  }[]
  sections?: {
    sectionId: string
    instructor: {
      name: string
      email: string
      office: {
        location: string
        hours: {
          day: string
          start_time: string
          end_time: string
          location: string
        }[]
      }
    }
    schedule?: {
      day: string
      start_time: string
      end_time: string
      location: string
      type: string
      is_rescheduled: boolean
    }[]
  }[]
}

export const CourseResolver = {
  Query: {
    course: async (_: unknown, { code }: { code: string }, { user }: Context): Promise<Course | null> => {
      if (!user) throw new AuthenticationError('Not authenticated')
      const course = await getCourseByCode(code)
      if (!course || course.userId !== user.id) {
        throw new UserInputError('Course not found')
      }
      return course
    },

    courses: async (_: unknown, __: unknown, { user }: Context): Promise<Course[]> => {
      if (!user) throw new AuthenticationError('Not authenticated')
      return getCoursesByUserId(user.id)
    }
  },

  Mutation: {
    addCourse: async (_: unknown, { input }: { input: CourseInput }, { user }: Context): Promise<Course> => {
      if (!user) throw new AuthenticationError('Not authenticated')
      return createCourse({ ...input, userId: user.id })
    },
  }
} 