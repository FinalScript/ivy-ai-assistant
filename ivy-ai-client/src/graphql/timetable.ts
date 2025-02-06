import { gql } from '@apollo/client';

export const GET_PROCESSING_STATUS = gql`
  query GetProcessingStatus($fileId: String!) {
    processingStatus(fileId: $fileId) {
      fileId
      status
      message
      progress
    }
  }
`;

export const PROCESS_TIMETABLE = gql`
  mutation ProcessTimetable($fileId: String!) {
    processTimetable(fileId: $fileId) {
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