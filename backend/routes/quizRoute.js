import express from "express";
import { startQuiz, submitQuiz } from "../controllers/quizController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/start", verifyToken, startQuiz); 
router.put("/submit/:id", verifyToken, submitQuiz);

export default router;
