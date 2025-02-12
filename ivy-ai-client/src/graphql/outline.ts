import { gql } from '@apollo/client';

export const PROCESS_OUTLINES = gql`
    mutation ProcessOutlines($courseOutlines: [CourseOutlineInput!]!) {
        processOutlines(courseOutlines: $courseOutlines) {
            success
            message
            courses {
                id
                code
                name
                term
                sections {
                    section_id
                    schedule {
                        day
                        start_time
                        end_time
                        location
                    }
                }
                outline
            }
        }
    }
`;

export interface CourseOutlineInput {
    courseCode: string;
    fileIds: string[];
} 