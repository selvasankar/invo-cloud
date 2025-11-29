// server/src/middlewares/requireAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export interface AuthRequest extends Request {
  user?: any;
}

export default function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: Missing or invalid token",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: Token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded user to request
    req.user = decoded;

    return next();
  } catch (err: any) {
    console.error("Auth error:", err.message);

    return res.status(401).json({
      status: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
}
