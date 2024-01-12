import Quiz from "../models/Quiz.js";
import { ErrorHandler } from "../utils/ResponseHandler.js";

/**
 * Create and save a new questionnaire in the database.
 *
 * @async
 * @param {Object} quizData - New quiz data.
 * @returns {Promise<Object>} The saved questionnaire.
 * @throws {ErrorHandler} Error saving quiz to database.
 */
const createQuiz = async (quizData) => {
  try {
    const quiz = new Quiz(quizData);
    return await quiz.save();
  } catch (error) {
    throw new ErrorHandler(
      500,
      "Error al guardar el cuestionario en la base de datos"
    );
  }
};

export { createQuiz };
