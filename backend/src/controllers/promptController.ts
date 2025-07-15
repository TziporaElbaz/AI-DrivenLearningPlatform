// ...המרה ל-TypeScript תתבצע כאן בהמשך...
import { Request, Response } from 'express';
import { createPrompt, getUserPrompts } from '../services/promptService';

interface AuthRequest extends Request {
  user?: { id: string  };
}

export async function handleCreatePrompt(req: AuthRequest, res: Response) {
  try {
    const { categoryId, subCategoryId, promptText } = req.body;
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userId = req.user.id; // בהנחה שיש JWT
    const prompt = await createPrompt({ userId, categoryId, subCategoryId, promptText });
    res.status(201).json(prompt);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetUserPrompts(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userId = req.user.id;
    const prompts = await getUserPrompts(userId);
    res.json(prompts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
