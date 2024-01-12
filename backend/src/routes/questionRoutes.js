import express from "express";
import validate from "../middlewares/validateRequest.js";
import { questionSchema } from "../validations/questionValidation.js";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  generateQuiz,
} from "../controllers/questionController.js";
import roleValidation from "../middlewares/roleValidation.js";

const router = express.Router();

/**
 * Routes for handling questions.
 */

// POST /questions: Create a new question. Requires schema validation and 'admin' role.
router.post(
  "/questions",
  validate(questionSchema),
  roleValidation(["admin"]),
  createQuestion
);

// GET /questions: Gets all questions.
router.get("/questions", getAllQuestions);

// GET /questions/:id: Gets a question by its ID.
router.get("/questions/:id", getQuestionById);

// PUT /questions/:id: Updates an existing question. Requires schema validation and 'admin' or 'moderator' role.
router.put(
  "/questions/:id",
  validate(questionSchema),
  roleValidation(["admin", "moderator"]),
  updateQuestion
);

// DELETE /questions/:id: Delete a question. Requires 'admin' role.
router.delete("/questions/:id", roleValidation(["admin"]), deleteQuestion);

// GET /generatequiz: Generates a quiz based on the questions already created.
router.get("/generatequiz", generateQuiz);

export default router;
