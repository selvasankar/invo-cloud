import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("🔥 ERROR:", err);

  const status = err.status || 500;

  return res.status(status).json({
    status: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development"
      ? { stack: err.stack }
      : {}),
  });
}
