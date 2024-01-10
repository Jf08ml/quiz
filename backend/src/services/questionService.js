import Question from "../models/Question.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

const addQuestion = async (questionData) => {
  try {
    const question = new Question(questionData);
    return await question.save();
  } catch (error) {
    throw new ErrorHandler(500, "Error saving question to database");
  }
};
const getAllQuestions = async () => {
  try {
    return await Question.find();
  } catch (error) {
    throw new ErrorHandler(500, "Error getting questions");
  }
};

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
