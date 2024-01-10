import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: Boolean,
    required: true,
  },
  observation: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
