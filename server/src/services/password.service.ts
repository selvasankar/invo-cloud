import crypto from "crypto";
import { addMinutes } from "date-fns";
import passwordResetRepo from "../repositories/passwordReset.repository";
import userRepo from "../repositories/auth.repository"; // getUserByEmail & createUser
import { sendMail } from "../utils/mailer";
import bcrypt from "bcryptjs";

const RESET_EXPIRES_MINUTES = Number(process.env.PASSWORD_RESET_EXPIRES_MINUTES || 60);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex"); // 64 chars
}

export default {
  async sendResetEmail(email: string) {
    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      // Do not reveal whether email exists — but we'll still pretend success
      return;
    }

    // create token
    const token = generateToken();
    const tokenHash = hashToken(token);
    const expiresAt = addMinutes(new Date(), RESET_EXPIRES_MINUTES);

    // store hashed token
    await passwordResetRepo.deleteByEmail(email); // remove old tokens
    await passwordResetRepo.create(email, tokenHash, expiresAt);

    // build url: FRONTEND_URL/reset?token=...&email=...
    const resetUrl = `${FRONTEND_URL}/reset?token=${token}&email=${encodeURIComponent(email)}`;

    const html = `
      <p>Hello ${user.name || ""},</p>
      <p>You requested a password reset. Click the link below to reset your password. This link expires in ${RESET_EXPIRES_MINUTES} minutes.</p>
      <p><a href="${resetUrl}">Reset your password</a></p>
      <p>If you didn't request this, ignore this email.</p>
    `;

    await sendMail(email, "Password reset instructions", html);
  },

  async resetPassword(email: string, token: string, newPassword: string) {
    const tokenHash = hashToken(token);
    const record = await passwordResetRepo.findValidByEmailAndHash(email, tokenHash);
    if (!record) {
      throw { status: 400, message: "Invalid or expired password reset token" };
    }

    // update user's password
    const hashed = await bcrypt.hash(newPassword, 10);
    await userRepo.updatePasswordByEmail(email, hashed);

    // delete reset records for email
    await passwordResetRepo.deleteByEmail(email);

    return true;
  },
};
