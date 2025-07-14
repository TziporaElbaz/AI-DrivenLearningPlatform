// src/controllers/promptController.js
import { createPrompt, getUserPrompts } from '../services/promptService.js';

export async function handleCreatePrompt(req, res) {
  try {
    const { categoryId, subCategoryId, promptText } = req.body;
    const userId = req.user.id; // בהנחה שיש JWT
    const prompt = await createPrompt({ userId, categoryId, subCategoryId, promptText });
    res.status(201).json(prompt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetUserPrompts(req, res) {
  try {
    const userId = req.user.id;
    const prompts = await getUserPrompts(userId);
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}