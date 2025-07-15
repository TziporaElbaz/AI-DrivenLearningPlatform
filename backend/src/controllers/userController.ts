import { Request, Response } from 'express';
import { registerUser, loginUser, getUserById, getAllUsers } from '../services/userService';

export async function handleRegister(req: Request, res: Response) {
  try {
    const { id, name, phone } = req.body;
    const user = await registerUser({ id, name, phone });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { phone } = req.body;
    const { user, token } = await loginUser({ phone });
    // שמירת הטוקן ב-cookie
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
    res.json({ user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

export async function handleGetUser(req: Request, res: Response) {
  try {
    const user = await getUserById(req.params.id);
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
