import Quiz from "../models/Quiz.js";
import { generateIQQuestions } from "../utils/generateQuiz.js";

export const startQuiz = async (req, res) => {
  try {
    const userId = req.user.id;

    const questions = await generateIQQuestions();

    const quiz = new Quiz({ userId, questions });
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
