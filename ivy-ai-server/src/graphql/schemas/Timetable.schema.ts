import { gql } from 'apollo-server-express'

export const TimetableSchema = gql`
  enum ProcessingStatus {
    UPLOADING
    UPLOADED
    PROCESSING
    COMPLETED
    ERROR
  }

  type ProcessingUpdate {
    fileId: String!
    status: ProcessingStatus!
    message: String!
    progress: Float!
  }

  type UploadResponse {
    success: Boolean!
    message: String
    fileId: String!
    courses: [Course!]!
  }

  type Course {
    id: ID
    code: String!
    name: String
    description: String
    term: String
    assessments: [Assessment]
    sections: [Section]
  }

  type Assessment {
    title: String
    type: String
    due_date: String
    description: String
    weight: Float
    status: String
    location: String
  }

  type Section {
    section_id: String
    instructor: Instructor
    schedule: [ScheduleItem]
  }

  type Instructor {
    name: String
    email: String
    office: Office
  }

  type Office {
    location: String
    hours: [OfficeHour]
  }

  type OfficeHour {
    day: String
    start_time: String
    end_time: String
    location: String
  }

  type ScheduleItem {
    day: String
    start_time: String
    end_time: String
    location: String
    type: String
    is_rescheduled: Boolean
  }

  type Query {
    myCourses: [Course!]!
    course(id: ID!): Course
    coursesByTerm(term: String!): [Course!]!
  }

  type Mutation {
    processTimetable(fileId: String!): UploadResponse!
    addCourse(input: CourseInput!): Course!
    updateCourse(id: ID!, input: CourseInput!): Course!
    deleteCourse(id: ID!): Boolean!
  }

  type Subscription {
    processingStatusUpdated(fileId: String!): ProcessingUpdate!
  }

  input CourseInput {
    code: String!
    name: String
    description: String
    term: String
    assessments: [AssessmentInput]
    sections: [SectionInput]
  }

  input AssessmentInput {
    title: String
    type: String
    due_date: String
    description: String
    weight: Float
    status: String
    location: String
  }

  input SectionInput {
    section_id: String
    instructor: InstructorInput
    schedule: [ScheduleItemInput]
  }

  input InstructorInput {
    name: String
    email: String
    office: OfficeInput
  }

  input OfficeInput {
    location: String
    hours: [OfficeHourInput]
  }

  input OfficeHourInput {
    day: String
    start_time: String
    end_time: String
    location: String
  }

  input ScheduleItemInput {
    day: String
    start_time: String
    end_time: String
    location: String
    type: String
    is_rescheduled: Boolean
  }
` 