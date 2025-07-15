import { Request, Response, NextFunction } from 'express';

// ...המרה ל-TypeScript תתבצע כאן בהמשך...

export default function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.is_admin !== true) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
}
