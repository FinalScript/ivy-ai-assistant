import OpenAI from "openai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Input file configuration
const INPUT_FILE = "Timetable_Ex1.jpeg";
const INPUT_DIR = "./inputs";
const OUTPUT_DIR = "./outputs";

const timetableMessage = `
You are a professional at extracting information from timetables.
You will be given an image of a timetable. You will need to extract the information and return it in a JSON object.

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
          "days": ["Monday", "Wednesday"],
          "startTime": "09:00",
          "endTime": "10:30",
          "location": "AH 101"
        }
      ]
    }
  ]
}}
`

async function main() {
  try {
    // Construct input file path
    const inputPath = path.join(INPUT_DIR, INPUT_FILE);
    
    // Read image
    const imageBuffer = await fs.promises.readFile(inputPath);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: timetableMessage },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageBuffer.toString('base64')}`,
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    // Create outputs directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    // Generate output filename based on input filename
    const baseFileName = path.parse(INPUT_FILE).name;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `${baseFileName}_${timestamp}.txt`);
    
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