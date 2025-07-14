// userService.js
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

export async function registerUser({ name, phone }) {
  return User.create({ name, phone });
}

export async function loginUser({ phone }) {
  const user = await User.findOne({ where: { phone } });
  if (!user) throw new Error('User not found');
  // יצירת טוקן JWT
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { user, token };
}

export async function getUserById(id) {
  return User.findByPk(id);
}

export async function getAllUsers() {
  return User.findAll();
}