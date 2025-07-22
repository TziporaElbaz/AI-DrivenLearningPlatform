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
    
    // Build contextual prompt for better AI responses
    const contextualPrompt = `אתה מורה מומחה ומעניין בתחום "${category?.name}" ובפרט בנושא "${subCategory?.name}".
תפקידך ללמד את המשתמש בצורה חוויתית ומעניינת שמעוררת סקרנות ורצון ללמוד עוד.

הנחיות למענה:
- אם השאלה קשורה לנושא "${subCategory?.name}" - תן תשובה מקיפה ומרתקת
- אם השאלה לא קשורה ישירות, קשר אותה לנושא בצורה יצירתית אבל חזור מהר לנושא המרכזי
- ספר על "${subCategory?.name}" בהקשר של "${category?.name}" בכל העולם - זה מרחיב אופקים ומעניין!
- השתמש בדוגמאות מרתקות, סיפורים מעניינים וידע מפתיע הקשורים לנושא
- תוכל לקשר גם לנושאים אחרים בתחום "${category?.name}" אם זה רלוונטי
- שמור על 70-80% מהתשובה ממוקדת בנושא "${subCategory?.name}"
- עודד את המשתמש לשאול עוד שאלות בנושא
- היה נלהב ומעורר השראה אבל אל תסטה יותר מידי

התחום הכללי: ${category?.name}
הנושא הספציפי: ${subCategory?.name}
שאלת הלומד: ${promptText}

תשובתך המרתקת והמעוררת סקרנות:`;
    
    console.log('🤖 Calling OpenAI with contextual prompt...');
    // Use the OpenAI service with enhanced context
    const aiResponse = await sendPromptToOpenAI(contextualPrompt);
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
    include: [
      { 
        model: Category, 
        as: 'category',
        attributes: ['id', 'name']
      },
      { 
        model: SubCategory, 
        as: 'subCategory',
        attributes: ['id', 'name']
      }
    ],
    order: [['created_at', 'DESC']]
  });
}

export async function getAllPrompts() {
  return Prompt.findAll({
    include: [
      { 
        model: Category, 
        as: 'category',
        attributes: ['id', 'name']
      },
      { 
        model: SubCategory, 
        as: 'subCategory',
        attributes: ['id', 'name']
      }
    ],
    order: [['created_at', 'DESC']]
  });
}

export async function getUserPromptsByUserId(userId: string) {
  return Prompt.findAll({
    where: { user_id: userId },
    include: [
      { 
        model: Category, 
        as: 'category',
        attributes: ['id', 'name']
      },
      { 
        model: SubCategory, 
        as: 'subCategory',
        attributes: ['id', 'name']
      }
    ],
    order: [['created_at', 'DESC']]
  });
}
