import Joi from "joi";
/**
  * Data validation scheme to create a quiz.
  */
const quizResultSchema = Joi.object({
  userEmail: Joi.string().email().required(),
  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().required(),
        playerResponse: Joi.boolean().required(),
        isCorrect: Joi.boolean().required(),
      })
    )
    .required(),
});

export default quizResultSchema;
