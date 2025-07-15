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
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
     const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    // משיכת המשתמש מהדאטאבייס לפי id
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user; // כולל is_admin
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
