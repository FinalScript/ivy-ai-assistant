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
  id: uuid('id').defaultRandom().primaryKey(),
  fileId: text('file_id').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { enum: processingStatusEnum.enumValues }).notNull(),
  message: text('message'),
  progress: real('progress').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type FileProcessing = typeof fileProcessing.$inferSelect
export type NewFileProcessing = typeof fileProcessing.$inferInsert 