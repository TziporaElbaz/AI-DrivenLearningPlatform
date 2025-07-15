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
const Prompt_1 = __importDefault(require("../models/Prompt"));
const Category_1 = __importDefault(require("../models/Category"));
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
const axios_1 = __importDefault(require("axios"));
function createPrompt(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, categoryId, subCategoryId, promptText }) {
        const response = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptText }]
        }, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        const prompt = yield Prompt_1.default.create({
            user_id: userId,
            category_id: categoryId,
            sub_category_id: subCategoryId,
            prompt: promptText,
            response: response.data.choices[0].message.content,
        });
        return prompt;
    });
}
function getUserPrompts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Prompt_1.default.findAll({
            where: { user_id: userId },
            include: [Category_1.default, SubCategory_1.default]
        });
    });
}
function getAllPrompts() {
    return __awaiter(this, void 0, void 0, function* () {
        return Prompt_1.default.findAll({
            include: [Category_1.default, SubCategory_1.default]
        });
    });
}
