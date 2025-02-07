import { pgTable, text, timestamp, uuid, jsonb, boolean, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './user.schema'

// Define assessment status enum
export const assessmentStatusEnum = pgEnum('assessment_status', [
  'UPCOMING',
  'IN_PROGRESS',
  'COMPLETED',
  'MISSED'
])

// Define class type enum
export const classTypeEnum = pgEnum('class_type', [
  'LECTURE',
  'LAB',
  'TUTORIAL',
  'SEMINAR',
  'WORKSHOP',
  'OTHER'
])

// Define day of week enum
export const dayOfWeekEnum = pgEnum('day_of_week', [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY'
])

// Instructor office hours type
interface OfficeHour {
  day: string // Uses dayOfWeekEnum values
  startTime: string
  endTime: string
  location: string
}

// Instructor office type
interface Office {
  location: string
  hours: OfficeHour[]
}

// Instructor type
interface Instructor {
  name: string
  email: string
  office: Office
}

// Schedule item type
interface ScheduleItem {
  day: string // Uses dayOfWeekEnum values
  startTime: string
  endTime: string
  location: string
  type: string // Uses classTypeEnum values
  isRescheduled: boolean
}

// Assessment type
interface Assessment {
  title: string
  type: string
  dueDate: string
  description: string
  weight: number | null
  status: string // Uses assessmentStatusEnum values
  location: string | null
}

// Section type
interface Section {
  sectionId: string
  instructor: Instructor
  schedule: ScheduleItem[]
}

export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  term: text('term').notNull(),
  assessments: jsonb('assessments').$type<Assessment[]>(),
  sections: jsonb('sections').$type<Section[]>(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert 