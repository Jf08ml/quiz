import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Questionnaire Result Model for the database.
 *
 * @typedef {Object} QuizResult
 * @property {ObjectId} quizId - Identifier of the associated quiz.
 * @property {string} userEmail - Email of the user who completed the questionnaire.
 * @property {Array<Object>} answers - Answers provided in the quiz.
 */

/**
 * Mongoose schema for the Quiz Result model.
 * Defines the structure of a Quiz Result document in the database.
 */
const QuizResultSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  userEmail: {
    type: String,
    required: true,
  },
  answers: [
    {
      // Question identifier, reference to the 'Question' collection.
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Question",
      },
      // Player's response to the question, required.
      playerResponse: {
        type: Boolean,
        required: true,
      },
      // Indicates if the player's response is correct, required.
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const QuizResult = mongoose.model("QuizResult", QuizResultSchema);

export default QuizResult;
