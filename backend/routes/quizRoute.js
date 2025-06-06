import express from "express";
import { startQuiz, submitQuiz,getInstructions } from "../controllers/quizController.js";
import { verifyAuth } from "../middleware/auth.js";
import { getQuizHistory } from '../controllers/quizController.js';

const router = express.Router();

router.post("/start/", verifyAuth, startQuiz);
router.post("/submit/:id", verifyAuth, submitQuiz);
router.post("/instruction/:score", verifyAuth, getInstructions); 
router.get('/history/:email', getQuizHistory);

export default router;
