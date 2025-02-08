import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21", generationConfig: { temperature: 0 } });

// Input file configuration
const INPUT_FILES = [
  "timetable.jpeg"
];

const INPUT_DIR = "./inputs";
const OUTPUT_DIR = "./outputs";

const timetableMessage = `You are an expert AI assistant specializing in parsing academic timetables.

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