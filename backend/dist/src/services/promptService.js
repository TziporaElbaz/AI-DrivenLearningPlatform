"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrompt = createPrompt;
exports.getUserPrompts = getUserPrompts;
exports.getAllPrompts = getAllPrompts;
exports.getUserPromptsByUserId = getUserPromptsByUserId;
const Prompt_1 = __importDefault(require("../models/Prompt"));
const Category_1 = __importDefault(require("../models/Category"));
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
const openaiService_1 = require("./openaiService");
function createPrompt(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, categoryId, subCategoryId, promptText }) {
        try {
            console.log('🔍 Starting createPrompt with:', { userId, categoryId, subCategoryId });
            // Get category and subcategory for context
            const category = yield Category_1.default.findByPk(categoryId);
            const subCategory = yield SubCategory_1.default.findByPk(subCategoryId);
            console.log('📂 Found category:', category === null || category === void 0 ? void 0 : category.name, 'subcategory:', subCategory === null || subCategory === void 0 ? void 0 : subCategory.name);
            // Build contextual prompt for better AI responses
            const contextualPrompt = `אתה מורה מומחה ומעניין בתחום "${category === null || category === void 0 ? void 0 : category.name}" ובפרט בנושא "${subCategory === null || subCategory === void 0 ? void 0 : subCategory.name}".
תפקידך ללמד את המשתמש בצורה חוויתית ומעניינת שמעוררת סקרנות ורצון ללמוד עוד.

הנחיות למענה:
- אם השאלה קשורה לנושא "${subCategory === null || subCategory === void 0 ? void 0 : subCategory.name}" - תן תשובה מקיפה ומרתקת
- אם השאלה לא קשורה ישירות, קשר אותה לנושא בצורה יצירתית אבל חזור מהר לנושא המרכזי
- ספר על "${subCategory === null || subCategory === void 0 ? void 0 : subCategory.name}" בהקשר של "${category === null || category === void 0 ? void 0 : category.name}" בכל העולם - זה מרחיב אופקים ומעניין!
- השתמש בדוגמאות מרתקות, סיפורים מעניינים וידע מפתיע הקשורים לנושא
- תוכל לקשר גם לנושאים אחרים בתחום "${category === null || category === void 0 ? void 0 : category.name}" אם זה רלוונטי
- שמור על 70-80% מהתשובה ממוקדת בנושא "${subCategory === null || subCategory === void 0 ? void 0 : subCategory.name}"
- עודד את המשתמש לשאול עוד שאלות בנושא
- היה נלהב ומעורר השראה אבל אל תסטה יותר מידי

התחום הכללי: ${category === null || category === void 0 ? void 0 : category.name}
הנושא הספציפי: ${subCategory === null || subCategory === void 0 ? void 0 : subCategory.name}
שאלת הלומד: ${promptText}

תשובתך המרתקת והמעוררת סקרנות:`;
            console.log('🤖 Calling OpenAI with contextual prompt...');
            // Use the OpenAI service with enhanced context
            const aiResponse = yield (0, openaiService_1.sendPromptToOpenAI)(contextualPrompt);
            console.log('✅ OpenAI response received');
            // Save to database
            const prompt = yield Prompt_1.default.create({
                user_id: userId,
                category_id: categoryId,
                sub_category_id: subCategoryId,
                prompt: promptText,
                response: aiResponse,
            });
            return prompt;
        }
        catch (error) {
            console.error('❌ Error in createPrompt:', error.message);
            console.error('Error creating prompt:', error);
            throw new Error(`Failed to create prompt: ${error.message}`);
        }
    });
}
function getUserPrompts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Prompt_1.default.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Category_1.default,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: SubCategory_1.default,
                    as: 'subCategory',
                    attributes: ['id', 'name']
                }
            ],
            order: [['created_at', 'DESC']]
        });
    });
}
function getAllPrompts() {
    return __awaiter(this, void 0, void 0, function* () {
        return Prompt_1.default.findAll({
            include: [
                {
                    model: Category_1.default,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: SubCategory_1.default,
                    as: 'subCategory',
                    attributes: ['id', 'name']
                }
            ],
            order: [['created_at', 'DESC']]
        });
    });
}
function getUserPromptsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Prompt_1.default.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Category_1.default,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: SubCategory_1.default,
                    as: 'subCategory',
                    attributes: ['id', 'name']
                }
            ],
            order: [['created_at', 'DESC']]
        });
    });
}
