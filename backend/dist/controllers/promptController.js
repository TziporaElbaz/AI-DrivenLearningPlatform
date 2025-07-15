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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreatePrompt = handleCreatePrompt;
exports.handleGetUserPrompts = handleGetUserPrompts;
const promptService_1 = require("../services/promptService");
function handleCreatePrompt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId, subCategoryId, promptText } = req.body;
            if (!req.user)
                return res.status(401).json({ error: 'Unauthorized' });
            const userId = req.user.id; // בהנחה שיש JWT
            const prompt = yield (0, promptService_1.createPrompt)({ userId, categoryId, subCategoryId, promptText });
            res.status(201).json(prompt);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function handleGetUserPrompts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user)
                return res.status(401).json({ error: 'Unauthorized' });
            const userId = req.user.id;
            const prompts = yield (0, promptService_1.getUserPrompts)(userId);
            res.json(prompts);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
