import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
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
You are an expert AI with advanced vision and text processing capabilities specializing in analyzing university course outlines. 
Your task is to extract key details about assessments from the provided course outlines and output a structured JSON object.

Key Rules:
- Anything that may alter the grade of the student must be extracted.
- Only extract and output assessment-related information from the outlines.
- Do not include any additional text, commentary, or markdown formatting.
- Your output must be valid JSON with no extra content.
- If a field is not present, output an empty array ([]), empty string ("") or null depending on the field.

Output must be a strict JSON object (starting with "{" and ending with "}") in this format:

{{
  "assessments": {
    "quizzes": [
      {
        "name": "Quiz 1: Introduction to Data Structures",
        "type": "Online Quiz",
        "available": {
          "date": "2024-01-15",
          "time": "14:30"
        },
        "due": {
          "date": "2024-01-15",
          "time": "15:20"
        },
        "topicsCovered": ["Arrays", "Linked Lists", "Basic Complexity Analysis"],
        "location": "Online - Canvas",
        "gradeWeight": 5,
        "lateSubmissions": "Not accepted",
        "accommodations": "Extra time available upon approved request"
      }
    ],
    "assignments": [
      {
        "name": "Assignment 1: Algorithm Implementation",
        "type": "Programming Assignment",
        "available": {
          "date": "2024-01-20",
          "time": "00:00"
        },
        "due": {
          "date": "2024-02-03",
          "time": "23:59"
        },
        "topicsCovered": ["Sorting Algorithms", "Search Algorithms", "Time Complexity"],
        "location": "Submit via GitHub Classroom",
        "gradeWeight": 15,
        "lateSubmissions": "10% penalty per day, maximum 3 days",
        "accommodations": "Extended deadlines available with DSS approval"
      }
    ],
    "projects": [
      {
        "name": "Term Project: Custom Data Structure Implementation",
        "type": "Group Project",
        "available": {
          "date": "2024-02-15",
          "time": "00:00"
        },
        "due": {
          "date": "2024-04-15",
          "time": "23:59"
        },
        "topicsCovered": [
          "Advanced Data Structures",
          "Algorithm Analysis",
          "System Design",
          "Documentation"
        ],
        "location": "Submit via Canvas",
        "gradeWeight": 30,
        "lateSubmissions": "5% penalty per day, maximum 5 days",
        "accommodations": "Team size adjustments available upon request"
      }
    ],
    "labs": [
      {
        "name": "Lab 1: Environment Setup and Basic Algorithms",
        "type": "Practical Lab",
        "available": {
          "date": "2024-01-16",
          "time": "10:30"
        },
        "due": {
          "date": "2024-01-16",
          "time": "12:20"
        },
        "topicsCovered": ["Development Environment", "Version Control", "Basic Algorithms"],
        "location": "Computer Lab 204",
        "gradeWeight": 10,
        "lateSubmissions": "Must be completed during lab session",
        "accommodations": "Alternative lab times available"
      }
    ],
    "exams": [
      {
        "name": "Midterm Examination",
        "type": "Closed Book Exam",
        "available": {
          "date": "2024-03-01",
          "time": "14:30"
        },
        "due": {
          "date": "2024-03-01",
          "time": "16:30"
        },
        "topicsCovered": [
          "All Topics from Weeks 1-7",
          "Data Structures",
          "Algorithm Analysis",
          "Problem Solving"
        ],
        "location": "Main Hall 301",
        "gradeWeight": 35,
        "lateSubmissions": "Not accepted",
        "accommodations": "Extended time and separate room available with DSS approval"
      }
    ],
    "other": [
      {
        "name": "Peer Code Reviews",
        "type": "Collaborative Assessment",
        "available": {
          "date": "2024-02-01",
          "time": "00:00"
        },
        "due": {
          "date": "2024-04-01",
          "time": "23:59"
        },
        "topicsCovered": ["Code Quality", "Documentation", "Best Practices"],
        "location": "GitHub Classroom",
        "gradeWeight": 5,
        "lateSubmissions": "Reviews must be completed within assigned sprint periods",
        "accommodations": "Flexible review scheduling available"
      }
    ]
  }
}}
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

        // Generate content with all files
        const result = await model.generateContent([
            { text: outlineMessage },
            ...fileParts,
        ]);

        const aiEndTime = performance.now();
        console.log(`AI Processing completed in ${((aiEndTime - aiStartTime) / 1000).toFixed(2)} seconds`);

        const response = result.response;
        let text = response.text();

        // Clean the output by removing markdown formatting
        text = text
            .replace(/^```json\n?/, "")
            .replace(/\n?```$/, "")
            .trim();

        try {
            const parsedData = JSON.parse(text);
            console.log("Extracted Outline Data:", parsedData);

            // Save output
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const outputPath = path.join(OUTPUT_DIR, `outline_${timestamp}.json`);
            await fs.promises.writeFile(
                outputPath,
                JSON.stringify(parsedData, null, 2),
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
