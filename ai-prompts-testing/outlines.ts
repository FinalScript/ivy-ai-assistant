import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: { temperature: 0 } });

// Input file configuration
const INPUT_FILES = [
    "Outline_BestCase.pdf"
];

const INPUT_DIR = "./inputs";
const OUTPUT_DIR = "./outputs";

// MIME type mapping for supported file types
const MIME_TYPES: { [key: string]: string } = {
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

const outlineMessage = `
Please analyze the provided outline document(s) and extract the following information in a structured format:
- Course names and codes
- Quizzes and their associated dates
- Exams and their associated dates
- Assignments and their associated dates
- Any additional notes or information

Output must be a strict JSON object (starting with "{" and ending with "}")
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
            data: fileBuffer.toString('base64'),
        }
    };
}

async function main() {
    try {
        // Create outputs directory if it doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }

        // Validate and filter supported files
        const supportedFiles = INPUT_FILES.filter(file => {
            const extension = path.extname(file).toLowerCase();
            return extension in MIME_TYPES;
        });

        if (supportedFiles.length === 0) {
            throw new Error('No supported files found in input directory');
        }

        // Process all files
        const fileParts = await Promise.all(supportedFiles.map(processFile));

        // Generate content with all files
        const result = await model.generateContent([
            { text: outlineMessage },
            ...fileParts
        ]);

        const response = result.response;
        let text = response.text();

        // Clean the output by removing markdown formatting
        text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

        try {
            const parsedData = JSON.parse(text);
            console.log('Extracted Outline Data:', parsedData);

            // Save output
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const outputPath = path.join(OUTPUT_DIR, `outline_${timestamp}.json`);
            await fs.promises.writeFile(outputPath, JSON.stringify(parsedData, null, 2), 'utf-8');
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
    }
}

main();