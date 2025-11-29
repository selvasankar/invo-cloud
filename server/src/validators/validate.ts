import { Request, Response, NextFunction } from "express";

export default (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({
        status: false,
        message: result.error.message,
      });
    }

    next();
  };
};
