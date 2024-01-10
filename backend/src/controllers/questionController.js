import * as questionService from "../services/questionService.js";
import { handleError } from "../utils/ErrorHandler.js";

const createQuestion = async (req, res) => {
  try {
    const question = await questionService.addQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    handleError(error, res);
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    res.json(questions);
  } catch (error) {
    handleError(error, res);
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    res.json(question);
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
    res.json(updatedQuestion);
  } catch (error) {
    handleError(error, res);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    await questionService.deleteQuestionById(req.params.id);
    res.status(204).send();
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

    res.json(questions);
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
