import Joi from "joi";

export const forgotSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
