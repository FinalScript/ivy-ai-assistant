import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { createCourse, deleteCourse, getCourseById, getCoursesByTerm, getCoursesByUserId, updateCourse } from '../../controllers/Course.controller'
import { Course } from '../../db/schema/course.schema'
import { supabase } from '../../db/supabase'
import { PROCESSING_STATUS_UPDATED, ProcessingUpdate, redisPubSub, updateProcessingStatus } from '../../services/redis.service'
import { processTimetableFile, validateCourseData, transformToNewCourse } from '../../services/ai.service'
import { Context } from '../context'

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
        await updateProcessingStatus({
          fileId,
          status: 'UPLOADING',
          message: 'Downloading file from storage',
          progress: 0
        })

        // Download file from Supabase storage
        const { data: fileData, error: downloadError } = await supabase.storage
          .from('schedules')
          .download(fileId)

        if (downloadError || !fileData) {
          await updateProcessingStatus({
            fileId,
            status: 'ERROR',
            message: 'Failed to download file',
            progress: 0
          })
          throw new Error('Failed to download file')
        }

        // Process the file with AI
        await updateProcessingStatus({
          fileId,
          status: 'PROCESSING',
          message: 'Processing file with AI',
          progress: 25
        })

        const extractedCourses = await processTimetableFile(fileData);
        const validatedCourses = validateCourseData(extractedCourses);

        await updateProcessingStatus({
          fileId,
          status: 'COMPLETED',
          message: 'File processed successfully',
          progress: 100
        })

        return {
          success: true,
          message: 'File processed successfully',
          fileId,
          courses: validatedCourses
        }
      } catch (error) {
        console.error('Timetable processing error:', error)

        await updateProcessingStatus({
          fileId,
          status: 'ERROR',
          message: error instanceof Error ? error.message : 'Failed to process file',
          progress: 0
        })

        return {
          success: false,
          message: error instanceof Error ? error.message : 'Failed to process file',
          fileId,
          courses: []
        }
      }
    },

    addCourse: async (_: unknown, { input }: { input: CourseInput }, { user }: Context): Promise<Course> => {
      if (!user) throw new AuthenticationError('Not authenticated')
      return createCourse({ ...input, userId: user.id })
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
  },

  Subscription: {
    processingStatusUpdated: {
      subscribe: (_: unknown, { fileId }: { fileId: string }) => {
        return redisPubSub.asyncIterator([PROCESSING_STATUS_UPDATED], {
          filter: (payload: { processingStatusUpdated: ProcessingUpdate }) => {
            return payload.processingStatusUpdated.fileId === fileId;
          },
        });
      },
    },
  }
}