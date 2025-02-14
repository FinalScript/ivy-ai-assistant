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

  type Mutation {
    processTimetable(fileIds: [String!]!): UploadResponse!
  }

  type Subscription {
    processingStatusUpdated(fileId: String!): ProcessingUpdate!
  }
` 