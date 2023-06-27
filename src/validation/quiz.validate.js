const Joi = require("joi");

module.exports.validateQuiz = function validate(quiz) {
  const schema = Joi.object({
    question: Joi.string().required(),
    optioons: Joi.required(),
  });
  return schema.validate(quiz);
};
