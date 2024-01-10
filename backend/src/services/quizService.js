import Quiz from "../models/Quiz.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

const createQuiz = async (quizData) => {
  try {
    const quiz = new Quiz(quizData);
    return await quiz.save();
  } catch (error) {
    throw new ErrorHandler(500, "Error saving question to database");
  }
};

export { createQuiz };
