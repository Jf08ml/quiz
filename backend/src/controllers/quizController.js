import * as quizService from "../services/quizService.js";
import { handleError, SuccessHandler } from "../utils/ResponseHandler.js";

const createQuiz = async (req, res) => {
  try {
    const quiz = await quizService.createQuiz(req.body.quizData);
    SuccessHandler(res, quiz);
  } catch (error) {
    handleError(error, res);
  }
};

export { createQuiz };
