import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateGeminiInstruction = async (score) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    The user scored ${score} out of 10 on an IQ quiz.

    Please write friendly, helpful improvement tips using clear Markdown formatting. Follow these rules:
    - Keep the entire response under 250 words.
    - Start with a short summary of the user’s performance.
    - Give exactly 3 practical tips to improve IQ and cognitive skills.
    - Use bullet points (•), stars (⭐), and **bold** text to highlight key points.
    - Keep the tone encouraging and simple.
    `;


  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
