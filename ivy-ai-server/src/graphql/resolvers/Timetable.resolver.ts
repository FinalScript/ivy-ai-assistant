import { AuthenticationError } from 'apollo-server-express'
import { supabase } from '../../db/supabase'
import { PROCESSING_STATUS_UPDATED, ProcessingUpdate, redisPubSub, updateProcessingStatus } from '../../services/redis.service'
import { processTimetableFile, validateCourseData } from '../../services/ai.service'
import { Context } from '../context'

export const TimetableResolver = {
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