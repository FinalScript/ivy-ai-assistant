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
Your task is to extract key details from the provided course outlines and output a structured JSON object.

Key Rules:
- Only extract and output course-related information from the outlines.
- Do not include any additional text, commentary, or markdown formatting.
- Your output must be valid JSON with no extra content.
- If a field is not present, output an empty string ("") or null.

Output must be a strict JSON object (starting with "{" and ending with "}") in this format:

{
  "assessments": {
    "quizzes": [
      {
        "name": "Quiz 1: Introduction to Data Structures",
        "type": "Online Quiz",
        "releaseDate": "2024-01-15",
        "dueDate": "2024-01-15",
        "startTime": "14:30",
        "endTime": "15:20",
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
        "releaseDate": "2024-01-20",
        "dueDate": "2024-02-03",
        "startTime": "00:00",
        "endTime": "23:59",
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
        "releaseDate": "2024-02-15",
        "dueDate": "2024-04-15",
        "startTime": "00:00",
        "endTime": "23:59",
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
        "releaseDate": "2024-01-16",
        "dueDate": "2024-01-16",
        "startTime": "10:30",
        "endTime": "12:20",
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
        "releaseDate": "2024-03-01",
        "dueDate": "2024-03-01",
        "startTime": "14:30",
        "endTime": "16:30",
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
    ]
  }
}
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

    // Generate content with all files
    const result = await model.generateContent([
      { text: outlineMessage },
      ...fileParts,
    ]);

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
  }
}

main();
