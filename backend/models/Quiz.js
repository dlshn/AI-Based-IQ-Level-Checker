// models/Quiz.js
import mongoose from "mongoose";

const questionSchema = {
  question: String,
  choices: [String],
  correctAnswerIndex: Number,
};

const quizSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  providedAnswers: [Number], // Indexes of chosen answers
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quiz", quizSchema);
