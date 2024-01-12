import Question from "../models/Question.js";
import { ErrorHandler } from "../utils/ResponseHandler.js";

/**
 * Add a new question to the database.
 * @param {Object} questionData - Data for the new question.
 * @returns {Promise<Object>} The saved question.
 * @throws {ErrorHandler} Error saving question to database.
 */
const addQuestion = async (questionData) => {
  try {
    const question = new Question(questionData);
    return await question.save();
  } catch (error) {
    throw new ErrorHandler(500, "Error saving question to database");
  }
};

/**
 * Gets all questions from the database.
 * @returns {Promise<Array>} List of questions.
 * @throws {ErrorHandler} Failed to get questions.
 */
const getAllQuestions = async () => {
  try {
    return await Question.find();
  } catch (error) {
    throw new ErrorHandler(500, "Error getting questions");
  }
};

/**
 * You get a question for your ID.
 * @param {string} id - The ID of the question.
 * @returns {Promise<Object>} The question found.
 * @throws {ErrorHandler} Error getting question or not found.
 */
const getQuestionById = async (id) => {
  try {
    const question = await Question.findById(id);
    if (!question) {
      throw new ErrorHandler(404, "Question not found");
    }
    return question;
  } catch (error) {
    throw new ErrorHandler(500, "Error getting question");
  }
};

/**
 * Update a question by its ID.
 * @param {string} id - The ID of the question to update.
 * @param {Object} questionData - Updated question data.
 * @returns {Promise<Object>} The updated question.
 * @throws {ErrorHandler} Error updating question or missing question.
 */
const updateQuestionById = async (id, questionData) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, questionData, {
      new: true,
    });
    if (!updatedQuestion) {
      throw new ErrorHandler(404, "Question not found");
    }
    return updatedQuestion;
  } catch (error) {
    throw new ErrorHandler(500, "Error updating question");
  }
};

/**
 * Delete a question by its ID.
 * @param {string} id - The ID of the question to delete.
 * @returns {Promise<Object>} The question removed.
 * @throws {ErrorHandler} Error deleting question or missing question.
 */
const deleteQuestionById = async (id) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      throw new ErrorHandler(404, "Question not found");
    }
    return deletedQuestion;
  } catch (error) {
    throw new ErrorHandler(500, "Error deleting question");
  }
};

/**
 * Gets a random number of questions from the database.
 * @param {number} count - Number of questions to obtain.
 * @returns {Promise<Array>} List of random questions.
 * @throws {ErrorHandler} Error getting random questions.
 */
const getRandomQuestions = async (count) => {
  try {
    return await Question.aggregate([{ $sample: { size: count } }]);
  } catch (error) {
    throw new ErrorHandler(500, "Error getting random questions");
  }
};
export {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
  getRandomQuestions,
};
