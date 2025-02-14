import { gql } from 'apollo-server-express'

export const CourseSchema = gql`
  type Course {
    id: ID!
    userId: ID!
    code: String!
    name: String!
    description: String
    term: String
    assessments: [Assessment]
    sections: [Section]
  }

  type Assessment {
    title: String
    type: String
    dueDate: String
    description: String
    weight: Float
    status: String
    location: String
  }

  type Section {
    sectionId: String!
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
    course(code: String!): Course
    courses: [Course!]!
  }

  type Mutation {
    addCourse(input: CourseInput!): Course!
  }

  input CourseInput {
    code: String!
    name: String!
    description: String
    term: String
    assessments: [AssessmentInput]
    sections: [SectionInput]
  }

  input AssessmentInput {
    title: String
    type: String
    dueDate: String
    description: String
    weight: Float
    status: String
    location: String
  }

  input SectionInput {
    sectionId: String
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