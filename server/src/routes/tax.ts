import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import requireAuth from "../middleware/requireAuth";
import taxController from "../controllers/tax.controller";
import {
  createTaxSchema,
  updateTaxSchema,
} from "../validators/tax.validator";
import validate from "../validators/validate";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(taxController.listTaxes));
router.get("/:id", asyncHandler(taxController.getTaxById));

router.post(
  "/",
  validate(createTaxSchema),
  asyncHandler(taxController.createTax)
);

router.put(
  "/:id",
  validate(updateTaxSchema),
  asyncHandler(taxController.updateTax)
);

router.delete("/:id", asyncHandler(taxController.deleteTax));

export default router;
