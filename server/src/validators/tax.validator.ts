import Joi from "joi";

export const createTaxSchema = Joi.object({
  name: Joi.string().required(),
  rate: Joi.number().min(0).max(100).required(),
});

export const updateTaxSchema = Joi.object({
  name: Joi.string(),
  rate: Joi.number().min(0).max(100),
});
