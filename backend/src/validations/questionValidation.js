import Joi from "joi";

const questionSchema = Joi.object({
  text: Joi.string().min(3).max(300).required(),
  correctAnswer: Joi.boolean().required(),
  observation: Joi.string().min(3).max(300).required(),
});

export { questionSchema };
