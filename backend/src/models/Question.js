import mongoose from "mongoose";

/**
 * Question model for the database.
 *
 * @typedef {Object} Question
 * @property {string} text - The text of the question.
 * @property {boolean} correctAnswer - The correct answer to the question (true or false).
 * @property {string} observation - Additional observation or comment on the question.
 */

/**
 * Mongoose schema for the Question model.
 * Defines the structure of a Question document in the database.
 */
const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  // Correct answer to the question, required and of type boolean.
  correctAnswer: {
    type: Boolean,
    required: true,
  },
  // Observation to argue the correct answer.
  observation: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
