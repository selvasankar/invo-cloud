import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userRepo from "../repositories/auth.repository";
import type { SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = (process.env.JWT_SECRET as Secret) || "changeme";

export default {
  async register(payload: { name?: string; email: string; password: string }) {
    const { name, email, password } = payload;
    // create user logic...
    const hashed = await bcrypt.hash(password, 10);
    const created = await userRepo.createUser({ name, email, password: hashed });
    const user = Array.isArray(created) ? created[0] : created;

    const signOpts: SignOptions = { expiresIn: "7d" };
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, signOpts);

    return { user, token };
  },

  async login({ email, password }: { email: string; password: string }) {
    const user = await userRepo.getUserByEmail(email);
    if (!user) throw { status: 401, message: "Invalid credentials" };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw { status: 401, message: "Invalid credentials" };

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" } as SignOptions);
    return { user, token };
  },
};
