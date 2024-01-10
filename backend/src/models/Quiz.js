import mongoose from "mongoose";

const { Schema } = mongoose;

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
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Question",
      },
      playerResponse: {
        type: Boolean,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const QuizResult = mongoose.model("QuizResult", QuizResultSchema);

export default QuizResult;
