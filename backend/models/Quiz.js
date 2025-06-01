// models/Quiz.js
import mongoose from "mongoose";

const questionSchema = {
  question: String,
  choices: [String],
  correctAnswerIndex: Number,
};

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [questionSchema],
  providedAnswers: [Number], // Indexes of chosen answers
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quiz", quizSchema);
