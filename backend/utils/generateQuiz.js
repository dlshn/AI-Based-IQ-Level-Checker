// utils/generateQuestions.js 
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateIQQuestions = async (age, country) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = (age, country) => `
  Generate 10 culturally relevant IQ questions suitable for a person who is ${age} years old and lives in ${country}. Focus on logical reasoning, pattern recognition, and problem-solving — avoid math-heavy physics or geography-based word problems. 
  Questions must focus on logical reasoning, pattern recognition, common sense, or deductive thinking — avoid physics/math-heavy or real-world trivia (like specific city train schedules).Make sure all questions and answers are true.
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


  const result = await model.generateContent(prompt(age, country)); 
  const response = await result.response.text();

  // Strip out triple backticks if present 
  const cleaned = response.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
};
