import { gql } from '@apollo/client';

export const PROCESSING_STATUS_SUBSCRIPTION = gql`
  subscription OnProcessingStatusUpdated($fileId: String!) {
    processingStatusUpdated(fileId: $fileId) {
      fileId
      status
      message
      progress
    }
  }
`;

export const PROCESS_TIMETABLE = gql`
  mutation ProcessTimetable($fileIds: [String!]!) {
    processTimetable(fileIds: $fileIds) {
      success
      message
      fileId
      courses {
        id
        code
        name
        description
        term
        assessments {
          title
          type
          due_date
          description
          weight
          status
          location
        }
        sections {
          section_id
          instructor {
            name
            email
            office {
              location
              hours {
                day
                start_time
                end_time
                location
              }
            }
          }
          schedule {
            day
            start_time
            end_time
            location
            type
            is_rescheduled
          }
        }
      }
    }
  }
`; 