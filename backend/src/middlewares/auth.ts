import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Assuming User model is exported from this path

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default async function auth(req: Request, res: Response, next: NextFunction) {
  // קודם כל ננסה לקרוא מהעוגיה
  const token = req.cookies?.token;
  // אם אין בעוגיה, ננסה מה-Authorization header
  const authHeader = req.headers.authorization;
  const headerToken = authHeader ? authHeader.split(' ')[1] : null;
  const finalToken = token || headerToken;
  if (!finalToken) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded: any = jwt.verify(finalToken, process.env.JWT_SECRET as string);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}