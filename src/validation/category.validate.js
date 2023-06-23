const Joi = require("joi");

module.exports.validateCategory = function validate(category) {
  const schema = Joi.object({
    title: Joi.string().required(),
    shortTitle: Joi.string().required(),
    descriptionTitle: Joi.string().required(),
    image: Joi.string().required(),
    banner: Joi.string().required(),
    slug: Joi.string().required(),
    showInMenu: Joi.boolean().required(),
    seoTitle: Joi.string().required(),
    seoDescription: Joi.string().required(),
    seoKeywords: Joi.string().required(),
  });
  return schema.validate(category);
};
