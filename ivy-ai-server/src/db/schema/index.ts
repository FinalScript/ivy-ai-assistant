/**
 * Central export point for all database schemas
 * Import and re-export all schema definitions here
 */
export * from './user.schema'
export * from './course.schema'
export * from './file.schema'

// Re-export all enums for easy access
export { processingStatusEnum } from './file.schema'
export { assessmentStatusEnum, classTypeEnum, dayOfWeekEnum } from './course.schema'

// export * from './other.schema'
// export * from './another.schema' 