import OpenAI from "openai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Input file configuration
const INPUT_IMAGE_URL = "https://bpgirvgeoazgxtpnkijw.supabase.co/storage/v1/object/public/schedules//Timetable_Ex1.jpeg";
const OUTPUT_DIR = "./outputs";

const fileName = "Timetable_Ex1";

const timetableMessage = `
You are a professional at extracting information from timetables, with a particular expertise in ensuring schedule accuracy.
You will be given an image of a timetable. Your primary focus is to extract precise scheduling information by identifying distinct visual sections and groupings in the timetable.

INFORMATION IDENTIFICATION STRATEGY:

1. Visual Structure Analysis:
   - Look for clearly boxed or bordered sections
   - Identify column headers and row labels
   - Pay attention to grouped information within cells
   - Notice any lines or dividers separating different types of information

2. Common Timetable Sections to Identify:
   A. Course Information Block:
      - Usually contains course code, name, and section together
      - Often appears as a distinct cell or grouped information
      - May be highlighted or bordered differently
   
   B. Schedule Information Block:
      - Look for time information grouped with days
      - Often appears in a grid or table format
      - May include location information in the same group
   
   C. Time Format Identification:
      - Look for consistent time format patterns in each column/section
      - Times are usually grouped with specific days
      - Check for AM/PM indicators within each time group

3. Time Extraction Rules (IN ORDER OF PRIORITY):
   A. FIRST: Look for times with AM/PM indicators within schedule blocks:
      - When you find "AM" or "PM", this is your most reliable source
      - Convert to 24-hour format using these rules:
        * "1:05 PM" → "13:05"
        * "9:05 AM" → "09:05"
        * "11:35 AM" → "11:35"
        * "2:30 PM" → "14:30"
        * "12:00 PM" → "12:00" (noon)
        * "12:00 AM" → "00:00" (midnight)
   
   B. If NO AM/PM indicators found:
      - Look for times in 24-hour format (e.g., "13:05", "09:00")
      - Must include leading zeros
      - Must include minutes even if ":00"
   
   C. If NO valid times found:
      - Use "00:00" for both start and end times
      - Flag this course for review by including "TBA" in location

4. Day Identification Rules:
   - Look for day information in column headers or grouped with times
   - Each unique day gets its own schedule entry
   - Valid days are ONLY: "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
   - If days are abbreviated in the timetable, expand them to full names
   - Pay attention to day groupings (e.g., "MWF" should become three separate entries)

COURSE INCLUSION RULES:
1. EXCLUDE any courses marked as "Unassigned" or "TBA" for all schedule components
2. EXCLUDE any courses that don't have specific meeting times
3. EXCLUDE any courses marked as "Cancelled" or "Withdrawn"
4. INCLUDE courses marked as "Online" or "Virtual" with specific meeting times
5. INCLUDE courses even if they have no location

Important:
Return ONLY the JSON object without any markdown formatting or additional text.
The response should start with {{ and end with }} without any other characters.

The JSON must follow this exact structure:
{{
  "student": {
    "name": "Student Name",
    "id": "Student ID"
  },
  "courses": [
    {
      "name": "Course Name",
      "code": "Course Code",
      "instructor": "Instructor Name",
      "type": "Course Type",
      "schedule": [
        {
          "day": "Monday",
          "startTime": "09:00",
          "endTime": "10:30",
          "location": "AH 101"
        }
      ]
    }
  ]
}}

Remember: 
- Look for visually grouped information first
- Pay attention to table structure and cell groupings
- Identify consistent patterns in how information is presented
- ALWAYS look for AM/PM indicators first when extracting times
- If no AM/PM indicators found, look for 24-hour format
- If no valid times found, use "00:00" and flag with "TBA" location
- VERIFY each day is properly separated into its own schedule entry`

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          "role": "system", 
          "content": "You are a timetable information extraction expert. Your task is to analyze the visual structure of timetables and extract precise schedule information." 
        },
        { 
          "role": "user", 
          "content": "Extract all course information from this timetable" 
        },
        {
          "role": "user", 
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": INPUT_IMAGE_URL
              }
            }
          ]
        },
      ],
      max_tokens: 1000,
    });

    // Create outputs directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    // Generate output filename based on input filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `${fileName}_${timestamp}.txt`);

    await fs.promises.writeFile(
      outputPath,
      completion.choices[0].message.content,
      'utf-8'
    );

    console.log(`Output written to: ${outputPath}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();