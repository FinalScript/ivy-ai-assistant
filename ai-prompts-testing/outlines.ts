import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    generationConfig: { temperature: 0 },
});

// Input file configuration
const INPUT_FILES = ["Outline_BestCase.pdf"];

const INPUT_DIR = "./inputs";
const OUTPUT_DIR = "./outputs";

// MIME type mapping for supported file types
const MIME_TYPES: { [key: string]: string } = {
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const outlineMessage = `You are an expert AI assistant specializing in analyzing course outlines and syllabi.

TASK:
Extract detailed course information, instructor details, and assessment information from the provided course outline.

REQUIRED OUTPUT FORMAT:
{
  "code": "COURSE_CODE",        // Example: "CS101"
  "name": "COURSE_NAME",        // Example: "Introduction to Programming"
  "description": "DESCRIPTION", // Full course description
  "term": "TERM_INFO",         // Example: "Fall 2023"
  "assessments": [
    {
      "title": "TITLE",         // Example: "Midterm Exam"
      "type": "TYPE",           // Example: "exam", "assignment", "project"
      "due_date": "ISO_TIME",   // Example: "2024-03-15T14:00:00-05:00"
      "description": "DETAILS", // Description or special instructions
      "weight": NUMBER,         // Example: 30, null if not specified
      "status": "upcoming",     // Always set as "upcoming"
      "location": "LOCATION"    // For exams and in-person assessments, null if online/not specified
    }
  ],
  "sections": [
    {
      "section_id": "SECTION_ID", // Example: "A01"
      "instructor": {
        "name": "FULL_NAME",       // Example: "Dr. Jane Smith"
        "email": "EMAIL",          // Example: "jane.smith@university.edu"
        "office": {
          "location": "ROOM",      // Example: "Building A, Room 305"
          "hours": [
            {
              "day": "DAY_OF_WEEK",   // Example: "Tuesday"
              "start_time": "ISO_TIME",// Example: "2024-02-15T14:00:00-05:00"
              "end_time": "ISO_TIME",  // Example: "2024-02-15T16:00:00-05:00"
              "location": "LOCATION"   // Office or online meeting link
            }
          ]
        }
      },
      "schedule": [
        {
          "day": "DAY_OF_WEEK",     // Example: "Monday"
          "start_time": "ISO_TIME", // Example: "2024-02-15T09:30:00-05:00"
          "end_time": "ISO_TIME",   // Example: "2024-02-15T10:50:00-05:00"
          "location": "LOCATION",   // Example: "Building A, Room 101"
          "type": "CLASS_TYPE",     // Example: "lecture", "lab", "tutorial"
          "is_rescheduled": BOOLEAN // true if this is a schedule change
        }
      ]
    }
  ]
}

RULES:
1. Extract information for a single course
2. Group all sections under the course object
3. Keep assessments at the course level (not in sections)
4. Extract ALL available course information
5. Include complete assessment details with weights
6. Convert all times to ISO 8601 format with timezone
7. Use local timezone if none specified
8. Set missing values to null
9. Mark any rescheduled classes with is_rescheduled=true

VALIDATION:
- All dates must be in ISO 8601 format
- Course codes must be uppercase
- Day names must be capitalized
- Class types must be lowercase
- Weights must be numbers or null
- Email addresses must be valid format
- Course must have at least one section
- Assessments must be at course level, not section level
- Boolean values must be true/false

OUTPUT:
Provide ONLY the JSON output. No additional text or explanations.`;


async function processFile(file: string) {
    const extension = path.extname(file).toLowerCase();
    const mimeType = MIME_TYPES[extension];

    if (!mimeType) {
        throw new Error(`Unsupported file type: ${extension}`);
    }

    const inputPath = path.join(INPUT_DIR, file);
    const fileBuffer = await fs.promises.readFile(inputPath);

    return {
        inlineData: {
            mimeType,
            data: fileBuffer.toString("base64"),
        },
    };
}

async function main() {
    const startTime = performance.now();
    try {
        // Create outputs directory if it doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }

        // Validate and filter supported files
        const supportedFiles = INPUT_FILES.filter((file) => {
            const extension = path.extname(file).toLowerCase();
            return extension in MIME_TYPES;
        });

        if (supportedFiles.length === 0) {
            throw new Error("No supported files found in input directory");
        }

        // Process all files
        const fileParts = await Promise.all(supportedFiles.map(processFile));

        console.log('Starting AI processing...');
        const aiStartTime = performance.now();

        // Count input tokens
        const prompt = [
            { text: outlineMessage },
            ...fileParts,
        ];
        const inputTokenCount = await model.countTokens(prompt);
        console.log(`Input Tokens: ${inputTokenCount.totalTokens}`);

        // Generate content with all files
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
        text = text
            .replace(/^```json\n?/, "")
            .replace(/\n?```$/, "")
            .trim();

        try {
            const parsedData = JSON.parse(text);
            console.log("Extracted Outline Data:", parsedData);

            // Save output with metrics
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const outputPath = path.join(OUTPUT_DIR, `outline_${timestamp}.json`);
            const outputData = {
                data: parsedData,
                metrics: {
                    inputTokens: inputTokenCount.totalTokens,
                    outputTokens: outputTokenCount.totalTokens,
                    totalTokens: inputTokenCount.totalTokens + outputTokenCount.totalTokens,
                    processingTimeSeconds: ((aiEndTime - aiStartTime) / 1000).toFixed(2)
                }
            };
            await fs.promises.writeFile(
                outputPath,
                JSON.stringify(outputData, null, 2),
                "utf-8"
            );
            console.log(`Output written to: ${outputPath}`);
        } catch (parseError) {
            console.error("Error parsing JSON response:", parseError);
            // Save raw output for debugging
            const outputPath = path.join(
                OUTPUT_DIR,
                `raw_output_${new Date().toISOString().replace(/[:.]/g, "-")}.txt`
            );
            await fs.promises.writeFile(outputPath, text, "utf-8");
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
