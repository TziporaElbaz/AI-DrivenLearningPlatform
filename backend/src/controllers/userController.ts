import { Request, Response } from 'express';
import { registerUser, loginUser, getUserById, getAllUsers } from '../services/userService';

export async function handleRegister(req: Request, res: Response) {
  try {
    const { id, name, phone } = req.query;
    if (!id || !name || !phone || typeof id !== 'string' || typeof name !== 'string' || typeof phone !== 'string') {
      return res.status(400).json({ error: 'id, name, and phone are required in query string' });
    }
    const user = await registerUser({ id, name, phone });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const id = req.query.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'User ID is required in query string' });
    }
    const { user, token } = await loginUser({ id });
    // Save token in cookie
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

export async function handleGetUser(req: Request, res: Response) {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetAllUsers(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
