// server/src/controllers/password.controller.ts
import { Request, Response } from "express";
import passwordService from "../services/password.service"; // optional

async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    await passwordService.sendResetEmail(email);
    return res.json({ status: true, message: "Reset email sent" });
  } catch (err: any) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ status: false, message: err.message || "Server error" });
  }
}

async function resetPassword(req: Request, res: Response) {
  try {
    const { email, token, password } = req.body;
    await passwordService.resetPassword(email,token, password);
    return res.json({ status: true, message: "Password reset successful" });
  } catch (err: any) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ status: false, message: err.message || "Server error" });
  }
}

export default {
  forgotPassword,
  resetPassword,
};
