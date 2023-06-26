const Joi = require("joi");

module.exports.validateSignup = function validate(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(50),
    role: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports.validateLogin = function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(50),
  });
  return schema.validate(user);
};

module.exports.validateLogout = function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(user);
};
