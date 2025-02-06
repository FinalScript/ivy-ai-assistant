import { pgTable, text, timestamp, uuid, jsonb, boolean } from 'drizzle-orm/pg-core'
import { users } from './user.schema'

// Instructor office hours type
interface OfficeHour {
  day: string
  start_time: string
  end_time: string
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
  day: string
  start_time: string
  end_time: string
  location: string
  type: string
  is_rescheduled: boolean
}

// Assessment type
interface Assessment {
  title: string
  type: string
  due_date: string
  description: string
  weight: number | null
  status: string
  location: string | null
}

// Section type
interface Section {
  section_id: string
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
  userId: uuid('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert 