import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import requireAuth from "../middleware/requireAuth";
import customerController from "../controllers/customers.controller";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validators/customer.validator";
import validate from "../validators/validate";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(customerController.listCustomers));
router.get("/:id", asyncHandler(customerController.getCustomerById));

router.post(
  "/",
  validate(createCustomerSchema),
  asyncHandler(customerController.createCustomer)
);

router.put(
  "/:id",
  validate(updateCustomerSchema),
  asyncHandler(customerController.updateCustomer)
);

router.delete("/:id", asyncHandler(customerController.deleteCustomer));

export default router;
