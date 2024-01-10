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

router.post(
  "/questions",
  validate(questionSchema),
  roleValidation(["admin"]),
  createQuestion
);
router.get("/questions", getAllQuestions);
router.get("/questions/:id", getQuestionById);
router.put(
  "/questions/:id",
  validate(questionSchema),
  roleValidation(["admin", "moderator"]),
  updateQuestion
);
router.delete("/questions/:id", roleValidation(["admin"]), deleteQuestion);

router.get("/generatequiz", generateQuiz);

export default router;
