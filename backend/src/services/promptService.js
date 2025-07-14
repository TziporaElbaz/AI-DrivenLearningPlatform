// src/services/promptService.js
import { Prompt, User, Category, SubCategory } from '../models/index.js';
import axios from 'axios';

export async function createPrompt({ userId, categoryId, subCategoryId, promptText }) {
  // שלח ל-OpenAI (או החזר תשובה מדומיינת אם אין מפתח)
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    // ...הגדרות הבקשה ל-OpenAI
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  });

  // שמור במסד הנתונים
  const prompt = await Prompt.create({
    user_id: userId,
    category_id: categoryId,
    sub_category_id: subCategoryId,
    prompt: promptText,
    response: response.data.choices[0].message.content,
  });

  return prompt;
}

export async function getUserPrompts(userId) {
  return Prompt.findAll({
    where: { user_id: userId },
    include: [Category, SubCategory]
  });
}

export async function getAllPrompts() {
  return Prompt.findAll({
    include: [Category, SubCategory]
  });
}