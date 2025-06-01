import Quiz from "../models/Quiz.js";
import { generateIQQuestions } from "../utils/generateQuiz.js";

export const startQuiz = async (req, res) => {
  try {
    console.log("User from token:", req.user); // ✅ Check if token was decoded

    const userId = req.user.id;

    const questions = await generateIQQuestions(); // ✅ Check if this function works 

    console.log("Generated Questions:", questions);

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
    const quiz = await Quiz.findById(req.params.id);

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
