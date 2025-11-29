import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import requireAuth from "../middleware/requireAuth";
import productController from "../controllers/products.controller";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";
import validate from "../validators/validate";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(productController.listProducts));
router.get("/:id", asyncHandler(productController.getProductById));

router.post(
  "/",
  validate(createProductSchema),
  asyncHandler(productController.createProduct)
);

router.put(
  "/:id",
  validate(updateProductSchema),
  asyncHandler(productController.updateProduct)
);

router.delete("/:id", asyncHandler(productController.deleteProduct));

export default router;
