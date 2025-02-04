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
You are an expert AI with advanced vision capabilities, specialized in reading and understanding university timetables.
Your task is to analyze the image provided (through OCR and layout recognition) and extract precise course details,
ignoring any headers, footers, logos, or extraneous information that is not directly related to the timetable.

Use the metadata provided for context and ensure your extraction is both comprehensive and accurate, even when the
timetable is presented in various styles or layouts used by different universities. 

Important Extraction Instructions:
1. **Focus Exclusively on Timetable Data:** The image may include extraneous text, graphics, and decorative elements.
   Ignore any content not directly related to course scheduling.
2. **Handle Diverse Formats:** The timetable image may be in a variety of formats:
   - Tabular layouts, free-form text, multi-column arrangements, or mixed formats.
   - Ensure that even if the timetable is presented in an unconventional layout, you extract all relevant course details.
3. **Normalization:** 
   - Convert abbreviated day names to full names (e.g., "Mon" → "Monday").
   - Convert time entries to 24-hour format (e.g., "9 AM" becomes "09:00").
   - Trim any extraneous spaces or characters from extracted text.
4. **Multiple Occurrences:** If a course appears with multiple schedule entries (for example, different days or times), treat each occurrence as a separate entry in the output.
5. **Fallback Behavior:** If a specific field is not present or is ambiguous in the image, return an empty string ("") for that field rather than guessing.
6. **Strict JSON Output:** The output must be a valid JSON object that starts with "{" and ends with "}" with no additional text, commentary, or markdown formatting.
7. **Metadata Utilization:** Use the metadata provided to help interpret context such as the university name, academic term, or any known formatting quirks that might improve extraction accuracy.

Include the metadata below in your analysis:
{json.dumps(metadata, indent=4)}

Instructions for the Output:
Return the result strictly in the following JSON format:

{{
    "courses": [
        {{
            "courseName": "Introduction to Psychology",
            "courseCode": "PSY101",
            "section": "11212",
            "location": "Building A, Room 101",
            "day": "Monday",
            "startTime": "09:00",
            "endTime": "10:00",
            "additionalInfo": "Section A"
        }},
        {{
            "courseName": "Advanced Calculus",
            "courseCode": "MATH301",
            "section": "11201",
            "location": "Room 202",
            "day": "Tuesday",
            "startTime": "11:00",
            "endTime": "12:30",
            "additionalInfo": ""
        }}
    ]
}}

Remember:
- Do not output any additional text or markdown formatting.
- Your entire response should consist only of the JSON object described above.
- Focus exclusively on extracting accurate, precise timetable data.

Timetable Image:
[IMAGE DATA IS SUPPLIED VIA OPENAI VISION API]

Begin your extraction process now.`

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        // { 
        //   "role": "system", 
        //   "content": "You are a timetable information extraction expert. Your task is to analyze the visual structure of timetables and extract precise schedule information." 
        // },
        { 
          "role": "user", 
          "content": timetableMessage
        },
        {
          "role": "user", 
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": INPUT_IMAGE_URL,
                "detail": "low"
              }
            }
          ]
        },
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" }
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