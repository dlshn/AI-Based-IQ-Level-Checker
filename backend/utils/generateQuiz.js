// utils/generateQuestions.js 
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateIQQuestions = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Generate 10 multiple choice IQ questions. 
Each should have a question, 4 choices, and the correct answer index (0-3). 
Return ONLY the JSON array (no explanation, no markdown formatting).
Example format:
[
  {
    "question": "What is 2 + 2?",
    "choices": ["1", "2", "4", "3"],
    "correctAnswerIndex": 2
  }
]
`;

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  // Strip out triple backticks if present 
  const cleaned = response.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
};
