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
    processTimetable: async (_: unknown, { fileIds }: { fileIds: string[] }, { user }: Context) => {
      if (!user) throw new AuthenticationError('Not authenticated')

      const mainFileId = fileIds[0];

      try {
        await updateProcessingStatus({
          fileId: mainFileId,
          status: 'UPLOADING',
          message: `Uploading ${fileIds.length} ${fileIds.length === 1 ? 'file' : 'files'}`,
          progress: 0
        });

        // Start downloads immediately
        const downloadPromises = fileIds.map(fileId =>
          supabase.storage
            .from('schedules')
            .download(fileId)
        );

        // Wait for all downloads to complete
        const downloadResults = await Promise.all(downloadPromises);

        // Check for download errors
        const failedDownloads = downloadResults.map((result, index) =>
          result.error ? fileIds[index] : null
        ).filter(Boolean);

        if (failedDownloads.length > 0) {
          throw new Error(`Failed to download files: ${failedDownloads.join(', ')}`)
        }

        // Extract file data
        const filesData = downloadResults.map(result => result.data!);

        await updateProcessingStatus({
          fileId: mainFileId,
          status: 'PROCESSING',
          message: `Extracting courses...`,
          progress: 25
        });

        setTimeout(async () => {
          await updateProcessingStatus({
            fileId: mainFileId,
            status: 'PROCESSING',
            message: `Processing courses...`,
            progress: 50
          });
        }, 3000);

        const extractedCourses = await processTimetableFile(filesData);
        const validatedCourses = validateCourseData(extractedCourses);

        await updateProcessingStatus({
          fileId: mainFileId,
          status: 'COMPLETED',
          message: `Completed`,
          progress: 100
        });

        return {
          success: true,
          message: 'All files processed successfully',
          fileId: mainFileId,
          courses: validatedCourses
        }
      } catch (error) {
        console.error('Timetable processing error:', error)

        return {
          success: false,
          message: error instanceof Error ? error.message : 'Failed to process files',
          fileId: mainFileId,
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