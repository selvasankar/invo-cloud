import Joi from "joi";

export const createInvoiceSchema = Joi.object({
  customer_id: Joi.number().required(),
  invoice_date: Joi.date().required(),
  items: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
  notes: Joi.string().allow("", null),
});

export const updateInvoiceStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "sent", "paid", "cancelled").required(),
});

export const addPaymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
  method: Joi.string().valid("cash", "card", "upi", "bank").required(),
  reference: Joi.string().allow("", null),
});
