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

const outlineMessage = `First, describe what you see in the document, focusing on any sections related to assessments, grading, or evaluation components.

Then, follow these specific steps to extract and structure the assessment information:

Step 1: Identify and Categorize Assessment Components
- Look for all graded components in the document
- Group them into these main categories based on their nature, not just their exact names:
  * "evaluations": All formal assessments (exams, tests, quizzes, midterms, finals)
  * "assignments": Individual written or practical work (homework, problem sets, essays)
  * "projects": Larger scope work, often involving multiple components or group work
  * "labs": Hands-on practical work in controlled environments
  * "participation": Engagement-based assessments (attendance, discussions, peer reviews)
  * "other": Any assessments that don't fit the above categories

Step 2: Extract Temporal Information
- Find all dates in the document and convert them to YYYY-MM-DD format
- Convert all times to 24-hour format (HH:mm)
- Look for availability windows and due dates for each assessment

Step 3: Collect Assessment Details
For each assessment found:
1. Record the full name and type
2. Note the grade weight or points
3. Capture the submission location/method
4. Document any late submission policies
5. Note any accommodation information
6. List all topics or materials covered

Step 4: Structure the Data
Organize all information into a JSON object with the following specifications:

1. Group semantically similar assessments together under the appropriate category
2. For each assessment, include:
   - name (string): Full assessment name
   - type (string): Specific type of assessment
   - available: { date (YYYY-MM-DD), time (HH:mm) }
   - due: { date (YYYY-MM-DD), time (HH:mm) }
   - topicsCovered (array): List of topics
   - location (string): Submission or assessment location
   - gradeWeight (number): Percentage or points
   - lateSubmissions (string): Late submission policy
   - accommodations (string): Available accommodations

Expected Output Format:
{
  "assessments": {
    "evaluations": [{
      "name": string,
      "type": string,
      "available": {
        "date": "YYYY-MM-DD",
        "time": "HH:mm"
      },
      "due": {
        "date": "YYYY-MM-DD",
        "time": "HH:mm"
      },
      "topicsCovered": string[],
      "location": string,
      "gradeWeight": number,
      "lateSubmissions": string,
      "accommodations": string
    }],
    "assignments": [...],
    "projects": [...],
    "labs": [...],
    "participation": [...],
    "other": [...]
  }
}

Categorization Guidelines:
- Group assessments based on their purpose and nature, not just their literal names
- Consider the assessment's scope, duration, and evaluation method when categorizing
- If an assessment could fit multiple categories, use its primary purpose for classification
- Ensure consistent categorization across similar types of assessments

Rules for Missing Information:
- Use empty array ([]) for missing lists
- Use empty string ("") for missing text fields
- Use null for missing optional fields
- Always include all assessment type arrays, even if empty

Output Requirements:
1. Provide only the JSON object, no additional text or markdown
2. Ensure the JSON is valid and can be parsed
3. Maintain consistent date/time formats throughout
4. Include all assessment categories in the structure`;

// Function to count tokens in a string (rough estimate)
function estimateTokens(text: string): number {
    // Simple estimation: Split on whitespace and punctuation
    return text.split(/[\s,.!?;:()\[\]{}'"]+/).filter(Boolean).length;
}

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
