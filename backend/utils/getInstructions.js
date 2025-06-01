import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateGeminiInstruction = async (score) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `A user scored ${score} out of 10 in an IQ test. 
Give friendly and helpful advice to improve cognitive skills.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
