import express from "express";
import { createQuiz } from "../controllers/quizController.js";

const router = express.Router();

/**
 * Routes for managing answered questionnaires.
 */

// POST /savequiz: Saves a new answered quiz to the database.
router.post("/savequiz", createQuiz);

export default router;
