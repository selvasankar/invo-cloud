import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  unit: Joi.string().valid("pcs", "kg", "ltr").required(),
  hsn_code: Joi.string().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().positive(),
  unit: Joi.string().valid("pcs", "kg", "ltr"),
  hsn_code: Joi.string(),
});
