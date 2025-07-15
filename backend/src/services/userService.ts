import User from '../models/User';
import jwt from 'jsonwebtoken';

export async function registerUser({ id, name, phone }: { id: string; name: string; phone: string }) {
  return User.create({ id, name, phone });
}

export async function loginUser({ phone }: { phone: string }) {
  const user = await User.findOne({ where: { phone } });
  if (!user) throw new Error('User not found');
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return { user, token };
}

export async function getUserById(id: string) {
  return User.findByPk(id);
}

export async function getAllUsers() {
  return User.findAll();
}
