import * as quizService from "../services/quizService.js";
import { handleError, SuccessHandler } from "../utils/ResponseHandler.js";

/**
 * Controller to create a new quiz.
 *
 * @param {Object} req - HTTP request object with the quiz data in 'req.body.quizData'.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} The questionnaire created in a JSON response.
 */
const createQuiz = async (req, res) => {
  try {
    const quiz = await quizService.createQuiz(req.body.quizData);
    SuccessHandler.sendSuccess(res, quiz);
  } catch (error) {
    handleError(error, res);
  }
};

export { createQuiz };
