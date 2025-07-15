import Prompt from '../models/Prompt';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import axios from 'axios';
interface OpenAIResponse {
  choices: { message: { content: string } }[];
}
export async function createPrompt({ userId, categoryId, subCategoryId, promptText }: { userId: string; categoryId: number; subCategoryId: number; promptText: string }) {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: promptText }]
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  }) as { data: OpenAIResponse };

  const prompt = await Prompt.create({
    user_id: userId,
    category_id: categoryId,
    sub_category_id: subCategoryId,
    prompt: promptText,
    response: response.data.choices[0].message.content,
  });

  return prompt;
}

export async function getUserPrompts(userId: string) {
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
