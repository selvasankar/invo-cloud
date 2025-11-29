import Joi from "joi";

export const createCustomerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});

export const updateCustomerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  address: Joi.string(),
});
