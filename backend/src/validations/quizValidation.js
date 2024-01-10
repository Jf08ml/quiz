import Joi from 'joi';

const quizResultSchema = Joi.object({
  userEmail: Joi.string().email().required(),
  answers: Joi.array().items(
    Joi.object({
      questionId: Joi.string().required(), // Aquí asumimos que recibes una string que representa un ObjectId
      playerResponse: Joi.boolean().required(),
      isCorrect: Joi.boolean().required()
    })
  ).required()
});

export default quizResultSchema;
