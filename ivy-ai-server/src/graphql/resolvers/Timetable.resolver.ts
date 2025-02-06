import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { createCourse, getCourseById, getCoursesByUserId, getCoursesByTerm, updateCourse, deleteCourse, createManyCourses } from '../../controllers/Course.controller'
import { Course } from '../../db/schema/course.schema'
import { Context } from '../context'
import { supabase } from '../../db/supabase'

// In-memory store for processing status
const processingStatus = new Map<string,
  {
    status: 'UPLOADING' | 'UPLOADED' | 'PROCESSING' | 'COMPLETED' | 'ERROR',
    message: string,
    progress: number
  }
>();

interface CourseInput {
  code: string
  name: string
  description?: string
  term: string
  assessments: {
    title: string
    type: string
    due_date: string
    description: string
    weight?: number
    status: string
    location?: string
  }[]
  sections: {
    section_id: string
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
    schedule: {
      day: string
      start_time: string
      end_time: string
      location: string
      type: string
      is_rescheduled: boolean
    }[]
  }[]
}

export const TimetableResolver = {
  Query: {
    myCourses: async (_: unknown, __: unknown, { user }: Context): Promise<Course[]> => {
      if (!user) throw new AuthenticationError('Not authenticated')
      return getCoursesByUserId(user.id)
    },

    course: async (_: unknown, { id }: { id: string }, { user }: Context): Promise<Course | null> => {
      if (!user) throw new AuthenticationError('Not authenticated')
      const course = await getCourseById(id)
      if (!course || course.userId !== user.id) {
        throw new UserInputError('Course not found')
      }
      return course
    },

    coursesByTerm: async (_: unknown, { term }: { term: string }, { user }: Context): Promise<Course[]> => {
      if (!user) throw new AuthenticationError('Not authenticated')
      return getCoursesByTerm(user.id, term)
    },

    processingStatus: async (_: unknown, { fileId }: { fileId: string }, { user }: Context) => {
      if (!user) throw new AuthenticationError('Not authenticated')

      const fileUserId = fileId.split('/')[0]
      if (fileUserId !== user.id) {
        throw new AuthenticationError('Not authorized to access this file')
      }

      const status = processingStatus.get(fileId)
      return status ? { fileId, ...status } : null
    }
  },

  Mutation: {
    processTimetable: async (_: unknown, { fileId }: { fileId: string }, { user }: Context) => {
      if (!user) throw new AuthenticationError('Not authenticated')

      try {
        // Verify the file belongs to the user
        const fileUserId = fileId.split('/')[0]
        if (fileUserId !== user.id) {
          throw new AuthenticationError('Not authorized to access this file')
        }

        // Update status to uploading
        processingStatus.set(fileId, {
          status: 'UPLOADING',
          message: 'Uploading file',
          progress: 0
        });

        // Download file from Supabase storage
        const { data: fileData, error: downloadError } = await supabase.storage
          .from('schedules')
          .download(fileId)

        if (downloadError || !fileData) {
          processingStatus.set(fileId, {
            status: 'ERROR',
            message: 'Failed to upload file',
            progress: 0
          });
          throw new Error('Failed to upload file')
        }

        // Update status to processing
        processingStatus.set(fileId, {
          status: 'PROCESSING',
          message: 'Processing file contents',
          progress: 25
        });

        // TODO: Process the file and extract course information
        // Simulate processing time for now
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update status to processing
        processingStatus.set(fileId, {
          status: 'PROCESSING',
          message: 'AI is doing its thing',
          progress: 50
        });

        // TODO: Process the file and extract course information
        // Simulate processing time for now
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update status to processing
        processingStatus.set(fileId, {
          status: 'PROCESSING',
          message: 'AI is doing its thing',
          progress: 75
        });

        // TODO: Process the file and extract course information
        // Simulate processing time for now
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update status to completed
        processingStatus.set(fileId, {
          status: 'COMPLETED',
          message: 'File processed successfully',
          progress: 100
        });

        console.log(fileData)

        return {
          success: true,
          message: 'File processed successfully',
          fileId,
          courses: []
        }
      } catch (error) {
        console.error('Timetable processing error:', error)

        processingStatus.set(fileId, {
          status: 'ERROR',
          message: error instanceof Error ? error.message : 'Failed to process file',
          progress: 0
        });

        return {
          success: false,
          message: 'Failed to process file',
          fileId,
          courses: []
        }
      }
    },

    addCourse: async (_: unknown, { input }: { input: CourseInput }, { user }: Context): Promise<Course> => {
      if (!user) throw new AuthenticationError('Not authenticated')

      return createCourse({
        ...input,
        userId: user.id
      })
    },

    updateCourse: async (_: unknown, { id, input }: { id: string, input: CourseInput }, { user }: Context): Promise<Course> => {
      if (!user) throw new AuthenticationError('Not authenticated')

      const existingCourse = await getCourseById(id)
      if (!existingCourse || existingCourse.userId !== user.id) {
        throw new UserInputError('Course not found')
      }

      const updatedCourse = await updateCourse(id, input)
      if (!updatedCourse) {
        throw new Error('Failed to update course')
      }

      return updatedCourse
    },

    deleteCourse: async (_: unknown, { id }: { id: string }, { user }: Context): Promise<boolean> => {
      if (!user) throw new AuthenticationError('Not authenticated')

      const existingCourse = await getCourseById(id)
      if (!existingCourse || existingCourse.userId !== user.id) {
        throw new UserInputError('Course not found')
      }

      return deleteCourse(id)
    }
  }
} 