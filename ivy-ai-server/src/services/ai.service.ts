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
 * Process multiple files and extract course information using AI
 */
export const processTimetableFile = async (filesData: Blob[]): Promise<ExtractedCourseData[]> => {
  const prompt = `You are an expert AI assistant specializing in parsing academic timetables.

    TASK:
    Extract and merge course information and schedules from the provided timetable image(s). When multiple files are provided, combine information for the same courses (identified by matching course code or course name) into a single course entry.

    REQUIRED OUTPUT FORMAT:
    {
      "courses": [
        {
          "code": "COURSE_CODE",        // Example: "CS101"
          "name": "COURSE_NAME",        // Example: "Introduction to Programming"
          "term": "TERM_INFO",         // Example: "Fall 2023"
          "sections": [
            {
              "section_id": "SECTION_ID", // Example: "A01" "LEC0101 F" "TUT0101" "01023"
              "schedule": [
                {
                  "day": "DAY_OF_WEEK",     // Example: "Monday"
                  "start_time": "ISO_TIME", // Example: "2024-02-15T09:30:00-05:00"
                  "end_time": "ISO_TIME",   // Example: "2024-02-15T10:50:00-05:00"
                  "location": "LOCATION",   // Example: "Building A, Room 101" "Online"
                  "type": "CLASS_TYPE"      // Example: "lecture", "lab", "tutorial"
                }
              ]
            }
          ]
        }
      ]
    }

    RULES:
    1. When processing multiple files, merge courses with matching course codes or names
    2. Extract ONLY course information and schedules
    3. Use full day names (Monday, Tuesday, etc.)
    4. Convert all times to ISO 8601 format with timezone
    5. Use local timezone if none specified
    6. Set missing values to null
    7. Do not include assessment information
    8. If conflicting information exists for the same course across files, preserve all unique portions

    VALIDATION:
    - There must not be any duplicate course codes or names
    - All dates must be in ISO 8601 format
    - Course codes must be uppercase
    - Day names must be capitalized
    - Class types must be lowercase
    - Each course must have at least one section

    OUTPUT:
    Provide ONLY the JSON output. No additional text or explanations.`;

  try {
    // Convert all Blobs to base64 and prepare image parts
    const imageParts = await Promise.all(filesData.map(async (fileData) => {
      const buffer = await fileData.arrayBuffer();
      const base64Data = Buffer.from(buffer).toString('base64');
      return {
        inlineData: {
          mimeType: fileData.type,
          data: base64Data,
        }
      };
    }));

    // Prepare complete prompt with text and all images
    const promptParts = [
      { text: prompt },
      ...imageParts
    ];

    // Generate content with all images
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
    throw new Error('Failed to process files with AI');
  }
}

/**
 * Validate and clean the extracted course data
 */
export const validateCourseData = (courses: ExtractedCourseData[]): ExtractedCourseData[] => {
  // Create a map to store unique courses by code
  const uniqueCourses = new Map<string, ExtractedCourseData>();

  // Process each course
  courses.forEach(course => {
    const existingCourse = uniqueCourses.get(course.code);
    
    if (!existingCourse) {
      // If course doesn't exist yet, add it
      uniqueCourses.set(course.code, course);
    } else {
      // Merge sections from duplicate course
      existingCourse.sections = [
        ...existingCourse.sections,
        ...course.sections
      ];

      // Keep the most complete course info
      if (course.name && !existingCourse.name) {
        existingCourse.name = course.name;
      }
      if (course.term && !existingCourse.term) {
        existingCourse.term = course.term;
      }
      if (course.description && !existingCourse.description) {
        existingCourse.description = course.description;
      }

      // Update the map with merged course
      uniqueCourses.set(course.code, existingCourse);
    }
  });

  // Convert map values back to array
  return Array.from(uniqueCourses.values());
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