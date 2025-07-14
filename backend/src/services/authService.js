// authService.js
import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}