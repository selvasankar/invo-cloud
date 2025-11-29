import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/auth.repository"; // add if missing
import authService from "../services/auth.service";

const JWT_SECRET = process.env.JWT_SECRET || "change_me";

export default {
  async login(req, res) {
    const data = await authService.login(req.body);
    return res.json({ status: true, ...data });
  },

 async register(req, res) {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status:false, message:"Missing" });
    const existing = await userRepo.getUserByEmail(email);
    if (existing) return res.status(409).json({ status:false, message:"Email exists" });
    const hashed = await bcrypt.hash(password, 10);
    const [user] = await userRepo.createUser({ name, email, password: hashed });
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ status:true, data:{user, token} });
  },
};
