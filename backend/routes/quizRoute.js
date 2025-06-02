import express from "express";
import { startQuiz, submitQuiz,getInstructions } from "../controllers/quizController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/start/:age", verifyToken, startQuiz);
router.post("/submit/:id", verifyToken, submitQuiz);
router.post("/instruction/:score", verifyToken, getInstructions);

export default router;
