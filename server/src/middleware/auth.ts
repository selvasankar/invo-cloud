import { Request, Response, NextFunction } from 'express';

// Simple auth stub - replace with real JWT logic in production
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.header('authorization');
  if (!auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  (req as any).user = { id: 'system', name: 'DevUser' };
  next();
}
