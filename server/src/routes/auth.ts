import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import authController from "../controllers/auth.controller";
import passwordController from "../controllers/password.controller";
import validate from "../validators/validate";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { forgotSchema, resetSchema } from "../validators/password.validator";

const router = Router();

router.post("/login", validate(loginSchema), asyncHandler(authController.login));
router.post("/register", validate(registerSchema), asyncHandler(authController.register));

// forgot / reset
router.post("/forgot", validate(forgotSchema), asyncHandler(passwordController.forgotPassword));
router.post("/reset", validate(resetSchema), asyncHandler(passwordController.resetPassword));

export default router;






