import Prompt from '../models/Prompt';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { sendPromptToOpenAI } from './openaiService';

export async function createPrompt({ userId, categoryId, subCategoryId, promptText }: { userId: string; categoryId: number; subCategoryId: number; promptText: string }) {
  try {
    console.log('🔍 Starting createPrompt with:', { userId, categoryId, subCategoryId });
    // Get category and subcategory for context
    const category = await Category.findByPk(categoryId);
    const subCategory = await SubCategory.findByPk(subCategoryId);
    
    console.log('📂 Found category:', category?.name, 'subcategory:', subCategory?.name);
    const topic = `${category?.name} - ${subCategory?.name}`;
    console.log('🤖 Calling OpenAI...');
    // Use the OpenAI service
    const aiResponse = await sendPromptToOpenAI(promptText);
    console.log('✅ OpenAI response received');
    // Save to database
    const prompt = await Prompt.create({
      user_id: userId,
      category_id: categoryId,
      sub_category_id: subCategoryId,
      prompt: promptText,
      response: aiResponse,
    });

    return prompt;
  } catch (error: any) {
    console.error('❌ Error in createPrompt:', error.message);
    console.error('Error creating prompt:', error);
    throw new Error(`Failed to create prompt: ${error.message}`);
  }
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
