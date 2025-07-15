import jwt from 'jsonwebtoken';

export function generateToken(user: { id: number; name: string }) {
  return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
