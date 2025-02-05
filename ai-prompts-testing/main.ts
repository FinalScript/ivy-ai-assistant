import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: { temperature: 0 } });

// Function to count tokens in a string (rough estimate)
function estimateTokens(text: string): number {
    // Simple estimation: Split on whitespace and punctuation
    return text.split(/[\s,.!?;:()\[\]{}'"]+/).filter(Boolean).length;
}

// Input file configuration
const INPUT_FILES = [
  "Timetable_Ex1.jpeg"
];

const INPUT_DIR = "./inputs";
const OUTPUT_DIR = "./outputs";

const timetableMessage = `
You are an expert AI with advanced vision capabilities specializing in reading university timetables from images. Your task is to extract course details (via OCR and layout recognition) while ignoring any extraneous elements (headers, footers, logos, etc.).

Key Rules:
1. Group courses by identifying their base course code or name prefix (ignoring section identifiers).
2. Create a single unique object for courses that share the same base code/name prefix.
3. All variations, sections, or class types of the same base course should be added as separate entries in that course's classes array.
4. Normalize day names (e.g., "Mon" → "Monday") and time entries (e.g., "9 AM" → "09:00"). Trim any extra spaces or characters.
5. If a field is missing or ambiguous, output an empty string ("").

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

async function main() {
  const startTime = performance.now();
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

    console.log('Starting AI processing...');
    const aiStartTime = performance.now();

    // Count input tokens
    const prompt = [
      { text: timetableMessage },
      ...imageParts
    ];
    const inputTokenCount = await model.countTokens(prompt);
    console.log(`Input Tokens: ${inputTokenCount.totalTokens}`);

    // Generate content with all images
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Count output tokens
    const outputTokenCount = await model.countTokens([{ text }]);
    
    const aiEndTime = performance.now();

    console.log('\nToken Usage Metrics:');
    console.log(`Input Tokens: ${inputTokenCount.totalTokens}`);
    console.log(`Output Tokens: ${outputTokenCount.totalTokens}`);
    console.log(`Total Tokens: ${inputTokenCount.totalTokens + outputTokenCount.totalTokens}`);
    console.log(`AI Processing completed in ${((aiEndTime - aiStartTime) / 1000).toFixed(2)} seconds`);

    // Clean the output by removing markdown formatting
    text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

    try {
      const parsedData = JSON.parse(text);
      console.log('Extracted Timetable Data:', parsedData);

      // Save output with metrics
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const outputPath = path.join(OUTPUT_DIR, `timetable_${timestamp}.json`);
      const outputData = {
        data: parsedData,
        metrics: {
          inputTokens: inputTokenCount.totalTokens,
          outputTokens: outputTokenCount.totalTokens,
          totalTokens: inputTokenCount.totalTokens + outputTokenCount.totalTokens,
          processingTimeSeconds: ((aiEndTime - aiStartTime) / 1000).toFixed(2)
        }
      };
      await fs.promises.writeFile(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
      console.log(`Output written to: ${outputPath}`);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      // Save raw output for debugging
      const outputPath = path.join(OUTPUT_DIR, `raw_output_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`);
      await fs.promises.writeFile(outputPath, text, 'utf-8');
      console.log(`Raw output written to: ${outputPath}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    const endTime = performance.now();
    const totalSeconds = (endTime - startTime) / 1000;
    console.log(`\nTotal execution time: ${totalSeconds.toFixed(2)} seconds`);
  }
}

main();