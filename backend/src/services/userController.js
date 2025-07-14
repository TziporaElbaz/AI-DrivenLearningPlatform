// src/controllers/userController.js
import { registerUser, loginUser, getUserById, getAllUsers } from '../services/userService.js';

export async function handleRegister(req, res) {
  try {
    const { name, phone } = req.body;
    const user = await registerUser({ name, phone });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleLogin(req, res) {
  try {
    const { phone } = req.body;
    const { user, token } = await loginUser({ phone });
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function handleGetUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}