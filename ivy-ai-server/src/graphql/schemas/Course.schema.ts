export const typeDefs = `#graphql
  type Course {
    id: ID
    code: String!
    name: String
    description: String
    term: String
    sections: [Section]
    assessments: [Assessment]
    outline: String
  }

  input CourseInput {
    code: String!
    name: String
    description: String
    term: String
    sections: [SectionInput]
    assessments: [AssessmentInput]
    outline: String
  }
`; 