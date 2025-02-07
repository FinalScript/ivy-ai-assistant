import { GoogleGenerativeAI } from '@google/generative-ai';
import { Course, NewCourse } from '../db/schema'

export interface ExtractedCourseData {
  code: string
  name: string
  description?: string
  term: string
  assessments: {
    title: string
    type: string
    due_date: string
    description: string
    weight?: number
    status: string
    location?: string
  }[]
  sections: {
    section_id: string
    instructor: {
      name: string
      email: string
      office: {
        location: string
        hours: {
          day: string
          start_time: string
          end_time: string
          location: string
        }[]
      }
    }
    schedule: {
      day: string
      start_time: string
      end_time: string
      location: string
      type: string
      is_rescheduled: boolean
    }[]
  }[]
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21", generationConfig: { temperature: 0 } });


/**
 * Process a file and extract course information using AI
 */
export const processTimetableFile = async (fileData: Blob): Promise<ExtractedCourseData[]> => {
  const prompt = `You are an expert AI assistant specializing in parsing academic timetables.

    TASK:
    Extract course information and schedules from the provided timetable image, grouping different sections of the same course together.

    REQUIRED OUTPUT FORMAT:
    {
      "courses": [
        {
          "code": "COURSE_CODE",        // Example: "CS101"
          "name": "COURSE_NAME",        // Example: "Introduction to Programming"
          "term": "TERM_INFO",         // Example: "Fall 2023"
          "sections": [
            {
              "section_id": "SECTION_ID", // Example: "A01"
              "schedule": [
                {
                  "day": "DAY_OF_WEEK",     // Example: "Monday"
                  "start_time": "ISO_TIME", // Example: "2024-02-15T09:30:00-05:00"
                  "end_time": "ISO_TIME",   // Example: "2024-02-15T10:50:00-05:00"
                  "location": "LOCATION",   // Example: "Building A, Room 101"
                  "type": "CLASS_TYPE"      // Example: "lecture", "lab", "tutorial"
                }
              ]
            }
          ]
        }
      ]
    }

    RULES:
    1. Group all sections of the same course under one course object
    2. Extract ONLY course information and schedules
    3. Use full day names (Monday, Tuesday, etc.)
    4. Convert all times to ISO 8601 format with timezone
    5. Use local timezone if none specified
    6. Set missing values to null
    7. Do not include assessment information

    VALIDATION:
    - All dates must be in ISO 8601 format
    - Course codes must be uppercase
    - Day names must be capitalized
    - Class types must be lowercase
    - Each course must have at least one section

    OUTPUT:
    Provide ONLY the JSON output. No additional text or explanations.`;

  try {
    // Convert Blob to base64
    const buffer = await fileData.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');
    
    // Prepare image part for the model
    const imagePart = {
      inlineData: {
        mimeType: fileData.type,
        data: base64Data,
      }
    };

    // Prepare complete prompt with text and image
    const promptParts = [
      { text: prompt },
      imagePart
    ];

    // Generate content with image
    const result = await model.generateContent(promptParts);
    const response = result.response;
    let text = response.text();

    // Clean the output by removing markdown formatting if present
    text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

    // Parse the response
    const parsedData = JSON.parse(text);
    
    // Transform the AI output to match our ExtractedCourseData interface
    const extractedData: ExtractedCourseData[] = parsedData.courses.map((course: any) => ({
      code: course.code,
      name: course.name,
      term: course.term,
      description: course.description || '',
      assessments: [], // We're not including assessments as per the prompt
      sections: course.sections.map((section: any) => ({
        section_id: section.section_id,
        instructor: {
          name: section.instructor?.name || '',
          email: section.instructor?.email || '',
          office: {
            location: section.instructor?.office?.location || '',
            hours: section.instructor?.office?.hours || []
          }
        },
        schedule: section.schedule.map((scheduleItem: any) => ({
          day: scheduleItem.day,
          start_time: scheduleItem.start_time,
          end_time: scheduleItem.end_time,
          location: scheduleItem.location,
          type: scheduleItem.type,
          is_rescheduled: false // Default value as it's not provided by AI
        }))
      }))
    }));

    return extractedData;
  } catch (error) {
    console.error('AI Processing Error:', error);
    throw new Error('Failed to process file with AI');
  }
}

/**
 * Validate and clean the extracted course data
 */
export const validateCourseData = (courses: ExtractedCourseData[]): ExtractedCourseData[] => {
  return courses.map(course => ({
    ...course,
    // Add any necessary data cleaning or validation here
    // For example, ensuring all required fields are present
    // and formatting dates correctly
  }))
}

/**
 * Transform extracted data into database-compatible format
 */
export const transformToNewCourse = (course: ExtractedCourseData, userId: string): NewCourse => {
  return {
    ...course,
    userId,
  }
} 