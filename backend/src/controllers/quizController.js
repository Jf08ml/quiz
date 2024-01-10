import * as quizService from "../services/quizService.js";
import { handleError } from "../utils/ErrorHandler.js";

const createQuiz = async (req, res) => {
  try {
    const quiz = await quizService.createQuiz(req.body.quizData);
    res.status(201).json({ result: "success", quiz });
  } catch (error) {
    handleError(error, res);
  }
};

export { createQuiz };
