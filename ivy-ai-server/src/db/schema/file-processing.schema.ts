import { pgTable, text, timestamp, uuid, real, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './user.schema'

// Define processing status enum
export const processingStatusEnum = pgEnum('processing_status', [
  'UPLOADING',
  'UPLOADED',
  'PROCESSING',
  'COMPLETED',
  'ERROR'
])

export const fileProcessing = pgTable('file_processing', {
  fileId: text('file_id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: processingStatusEnum('status').notNull(),
  message: text('message'),
  progress: real('progress').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type FileProcessing = typeof fileProcessing.$inferSelect
export type NewFileProcessing = typeof fileProcessing.$inferInsert 