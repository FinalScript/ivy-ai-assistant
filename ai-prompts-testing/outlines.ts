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

const outlineMessage = `
You are a helpful assistant designed to extract structured data from course outlines for a student timetable application.

Your task is to process the text of a course outline provided below and output the information in JSON format.  The JSON should represent the course, its classes, and assessments.

Specifically, for each course, extract the following information and structure it in JSON format:

*   **courseName:** (String) The full name of the course.
*   **courseCode:** (String) The course code (e.g., COMP2401).
*   **instructorName:** (String) The name of the instructor.
*   **instructorEmail:** (String) The instructor's email address (if available).
*   **courseDescription:** (String) A brief description of the course.
*   **classes:** (Array of Objects) An array of class objects. Each class object should have:
    *   **classType:** (String) Type of class (e.g., "Lecture", "Lab").
    *   **dayOfWeek:** (String) Day of the week (e.g., "Monday").
    *   **startTime:** (String) Start time (e.g., "10:35").
    *   **endTime:** (String) End time (e.g., "11:55").
    *   **location:** (String) Location of the class (e.g., "In-Person", "Online (Zoom)").
*   **assessments:** (Array of Objects) An array of assessment objects. Each assessment object should have:
    *   **assessmentType:** (String) Type of assessment (e.g., "Assignment", "Exam", "Project").
    *   **assessmentName:** (String) Name of the assessment (e.g., "Assignment 1", "Midterm Exam").
    *   **dueDate:** (String, ISO 8601 format if possible) Due date and time. If not explicitly a date, extract any date-related information.
    *   **weight:** (Number or String) Weight of the assessment in percentage or points.
    *   **description:** (String) A brief description of the assessment.

If some information is not explicitly mentioned in the text, leave the corresponding JSON fields empty or with a value like "N/A" or null.  Prioritize accuracy and completeness based on the provided text.

Please output ONLY the JSON. Do not include any introductory or explanatory text before or after the JSON output.
`;


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
