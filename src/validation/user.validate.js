const Joi = require("joi");

module.exports = function validationUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(50),
  });
  return schema.validate(user);
};
