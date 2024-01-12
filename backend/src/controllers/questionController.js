import * as questionService from "../services/questionService.js";
import { handleError, SuccessHandler } from "../utils/ResponseHandler.js";

/**
 * Controller to create a new question.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} The question created in a JSON response.
 */
const createQuestion = async (req, res) => {
  try {
    const question = await questionService.addQuestion(req.body);
    SuccessHandler.sendSuccess(res, question);
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Driver to get all questions.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} A list of questions in a JSON response.
 */
const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    SuccessHandler.sendSuccess(res, questions);
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Driver to get a question for your ID.
 *
 * @param {Object} req - HTTP request object with parameter 'id'.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} The question found in a JSON response.
 */
const getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    SuccessHandler.sendSuccess(res, question);
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Driver to update a question by its ID.
 *
 * @param {Object} req - HTTP request object with parameter 'id' and data to update in 'req.body'.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} The updated question in a JSON response.
 */
const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await questionService.updateQuestionById(
      req.params.id,
      req.body
    );
    SuccessHandler.sendSuccess(res, updatedQuestion);
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Driver to delete a question by its ID.
 *
 * @param {Object} req - HTTP request object with parameter 'id'.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} Empty JSON response if deleted successfully.
 */
const deleteQuestion = async (req, res) => {
  try {
    await questionService.deleteQuestionById(req.params.id);
    SuccessHandler.sendSuccess(res);
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Controller to generate a random questionnaire.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} A list of random questions in a JSON response.
 */
const generateQuiz = async (req, res) => {
  try {
    const numberOfQuestions = 10;
    const questions = await questionService.getRandomQuestions(
      numberOfQuestions
    );

    SuccessHandler.sendSuccess(res, questions);
  } catch (error) {
    handleError(error, res);
  }
};

export {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  generateQuiz,
};
