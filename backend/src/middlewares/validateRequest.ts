import { Request, Response, NextFunction } from 'express';

// ...המרה ל-TypeScript תתבצע כאן בהמשך...

export default function validateRequest(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Missing field: ${field}` });
      }
    }
    next();
  };
}
