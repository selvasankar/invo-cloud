import Joi from "joi";

export const createStockEntrySchema = Joi.object({
  product_id: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

export const updateStockSchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});
