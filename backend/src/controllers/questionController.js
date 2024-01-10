import * as questionService from "../services/questionService.js";
import { handleError, SuccessHandler } from "../utils/ResponseHandler.js";

const createQuestion = async (req, res) => {
  try {
    const question = await questionService.addQuestion(req.body);
    SuccessHandler.sendSuccess(res, question);
  } catch (error) {
    handleError(error, res);
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    SuccessHandler.sendSuccess(res, questions);
  } catch (error) {
    handleError(error, res);
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    SuccessHandler.sendSuccess(res, question);
  } catch (error) {
    handleError(error, res);
  }
};

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

const deleteQuestion = async (req, res) => {
  try {
    await questionService.deleteQuestionById(req.params.id);
    SuccessHandler.sendSuccess(res);
  } catch (error) {
    handleError(error, res);
  }
};

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
