import Quiz from "../models/Quiz.js";
import { generateIQQuestions } from "../utils/generateQuiz.js";
import { generateGeminiInstruction } from "../utils/getInstructions.js";

export const startQuiz = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { age, country } = req.body;
    if (!age || isNaN(age)) {
      return res.status(400).json({ msg: "Valid age is required." });
    }
    if(!userEmail){
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const questions = await generateIQQuestions(age, country);

    const quiz = new Quiz({ email:userEmail, questions });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    console.error("Error in startQuiz:", err); // ✅ Log the actual error
    res.status(500).json({ msg: "Failed to start quiz", error: err.message });
  }
};


export const submitQuiz = async (req, res) => {
  try {
    const { providedAnswers } = req.body;
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    if (!Array.isArray(providedAnswers)) {
      return res.status(400).json({ msg: "Invalid answers format" });
    }

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswerIndex === providedAnswers[i]) score++; 
    });

    quiz.providedAnswers = providedAnswers;
    quiz.score = score;
    await quiz.save(); 

    res.status(200).json({ msg: "Quiz submitted", score });
  } catch (err) {
    res.status(500).json({ msg: "Submission failed", error: err.message });
  }
};

export const getInstructions = async (req, res) => {
  const { score } = req.params;

  try {
    const instruction = await generateGeminiInstruction(score);
    res.status(200).json({ instruction });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ msg: "Failed to fetch instruction", error: err.message });
  }
};

// controllers/quizController.js 

export const getQuizHistory = async (req, res) => {
  const { email } = req.params;

  try {
    const history = await Quiz.find({ email })
      .select('email score createdAt') // Only include these fields
      .sort({ createdAt: -1 });
    res.status(200).json(history);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quiz history' });

  }
};


