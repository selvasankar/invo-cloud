// server/src/routes/inventory.ts
import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import requireAuth from "../middleware/requireAuth";
import inventoryController from "../controllers/inventory.controller";

const router = Router();

// Protect inventory routes
router.use(requireAuth);

// GET /api/v1/inventory
router.get("/", asyncHandler(inventoryController.list));      // controller.list

// POST /api/v1/inventory
router.post("/", asyncHandler(inventoryController.add));      // controller.add -> uses service.addStock

// PATCH /api/v1/inventory/:id
router.patch("/:id", asyncHandler(inventoryController.update)); // controller.update -> uses service.updateStock

// GET /api/v1/inventory/:id
router.get("/:id", asyncHandler(inventoryController.getById)); // controller.getById

export default router;
