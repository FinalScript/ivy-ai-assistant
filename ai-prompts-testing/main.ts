import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: { temperature: 0 } });

// Input file configuration
const INPUT_FILES = [
  "1.png"
];
const INPUT_DIR = "./inputs";
const OUTPUT_DIR = "./outputs";

const timetableMessage = `
You are an expert AI with advanced vision capabilities specializing in reading university timetables from images. Your task is to extract course details (via OCR and layout recognition) while ignoring any extraneous elements (headers, footers, logos, etc.).

Key Rules:
1. Group all classes of the same course (identified by course code and name) into one object. Each course appears once with its "classes" array listing all class times (e.g., lecture, lab, tutorial) as separate entries.
2. Normalize day names (e.g., "Mon" → "Monday") and time entries (e.g., "9 AM" → "09:00"). Trim any extra spaces or characters.
3. If a field is missing or ambiguous, output an empty string ("").

Output must be a strict JSON object (starting with "{" and ending with "}") in this format:

{
    "courses": [
        {
            "courseName": "Introduction to Psychology",
            "courseCode": "PSY101",
            "instructor": "Dr. John Smith",
            "startDate": "2024-01-01",
            "endDate": "2024-05-31",
            "classes": [
                { 
                    "section": "B",
                    "classType": "Lecture",
                    "location": "Building A, Room 101",
                    "day": "Monday",
                    "startTime": "09:00",
                    "endTime": "10:00",
                    "additionalInfo": "Section A"
                },
                {
                    "section": "B2",
                    "classType": "Lab",
                    "location": "Building A, Room 102",
                    "day": "Tuesday",
                    "startTime": "10:00",
                    "endTime": "11:00",
                    "additionalInfo": "Section B"
                }
            ]
        }
    ]
}

Ensure:
- Only timetable-related data is extracted, regardless of format (table, free-form text, multi-column, etc.).
- All related classes are grouped under their parent course.
- No extra text, commentary, or markdown is included—only the valid JSON output.
 `

// const timetableMessage = `
// You are an expert AI with advanced vision capabilities, specialized in reading and understanding university timetables.
// Your task is to analyze the image provided (through OCR and layout recognition) and extract precise course details,
// ignoring any headers, footers, logos, or extraneous information that is not directly related to the timetable.

// CRITICAL: Course Organization Rules
// 1. Group all classes belonging to the same course together
// 2. A course is identified by its course code and name
// 3. Multiple class times for the same course should be listed as separate entries in the "classes" array
// 4. Different sections (lecture, lab, tutorial) of the same course should be in the same course object
// 5. Each course should appear only ONCE in the output, with all its classes grouped in its classes array

// Important Extraction Instructions:
// 1. **Focus Exclusively on Timetable Data:** The image may include extraneous text, graphics, and decorative elements.
//    Ignore any content not directly related to course scheduling.
// 2. **Handle Diverse Formats:** The timetable image may be in a variety of formats:
//    - Tabular layouts, free-form text, multi-column arrangements, or mixed formats.
//    - Ensure that even if the timetable is presented in an unconventional layout, you extract all relevant course details.
// 3. **Normalization:** 
//    - Convert abbreviated day names to full names (e.g., "Mon" → "Monday").
//    - Convert time entries to 24-hour format (e.g., "9 AM" becomes "09:00").
//    - Trim any extraneous spaces or characters from extracted text.
// 4. **Multiple Occurrences:** If a course has multiple class times or types (lecture, lab, tutorial), add them as separate entries in the course's "classes" array.
// 5. **Fallback Behavior:** If a specific field is not present or is ambiguous in the image, return an empty string ("") for that field rather than guessing.
// 6. **Strict JSON Output:** The output must be a valid JSON object that starts with "{" and ends with "}" with no additional text, commentary, or markdown formatting.

// Instructions for the Output:
// Return the result strictly in the following JSON format:

// {{
//     "courses": [
//         {
//             "courseName": "Introduction to Psychology",
//             "courseCode": "PSY101",
//             "instructor": "Dr. John Smith",
//             "startDate": "2024-01-01",
//             "endDate": "2024-05-31",
//             "classes": [
//                 { 
//                     "section": "B",
//                     "classType": "Lecture",
//                     "location": "Building A, Room 101",
//                     "day": "Monday",
//                     "startTime": "09:00",
//                     "endTime": "10:00",
//                     "additionalInfo": "Section A"
//                 },
//                 {
//                     "section": "B2",
//                     "classType": "Lab",
//                     "location": "Building A, Room 102",
//                     "day": "Tuesday",
//                     "startTime": "10:00",
//                     "endTime": "11:00",
//                     "additionalInfo": "Section B"
//                 }
//             ]
//         }
//     ]
// }} 

// Example of Course Grouping:
// - If a course "COMP101" has both a lecture on Monday and a lab on Wednesday, they should be in the same course object:
//   * ONE course entry for "COMP101"
//   * TWO entries in its classes array (one for lecture, one for lab)
//   * Do NOT create separate course entries for different class types or times

// Remember:
// - Do not output any additional text or markdown formatting.
// - Your entire response should consist only of the JSON object described above.
// - Focus exclusively on extracting accurate, precise timetable data.
// - Always group related classes under their parent course.`;

async function main() {
  try {
    // Create outputs directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    // Prepare all images
    const imageParts = await Promise.all(INPUT_FILES.map(async (file) => {
      const inputPath = path.join(INPUT_DIR, file);
      const imageBuffer = await fs.promises.readFile(inputPath);
      return {
        inlineData: {
          mimeType: file.endsWith('.png') ? "image/png" : "image/jpeg",
          data: imageBuffer.toString('base64'),
        }
      };
    }));

    // Generate content with all images
    const result = await model.generateContent([
      { text: timetableMessage },
      ...imageParts
    ]);

    const response = result.response;
    const text = response.text();

    // Save output
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `combined_${timestamp}.txt`);
    await fs.promises.writeFile(outputPath, text, 'utf-8');
    console.log(`Output written to: ${outputPath}`);

  } catch (error) {
    console.error("Error:", error);
  }
}

main();