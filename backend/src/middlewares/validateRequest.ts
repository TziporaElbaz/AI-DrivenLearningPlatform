import { Request, Response, NextFunction } from 'express';

// ...המרה ל-TypeScript תתבצע כאן בהמשך...

export default function validateRequest(fields: string[] | 'register') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (fields === 'register') {
      const { id, name, phone } = req.query;
      if (!id || !name || !phone || typeof id !== 'string' || typeof name !== 'string' || typeof phone !== 'string') {
        return res.status(400).json({ error: 'id, name, and phone are required in query string' });
      }
      if (!/^\d{9}$/.test(id)) {
        return res.status(400).json({ error: 'ID must be exactly 9 digits' });
      }
      if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ error: 'Phone must be exactly 10 digits' });
      }
      if (name.trim().length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' });
      }
      return next();
    }
    for (const field of fields as string[]) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Missing field: ${field}` });
      }
    }
    next();
  };
}
