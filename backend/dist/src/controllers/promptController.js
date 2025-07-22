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
exports.handleGetUserPromptsByUserId = exports.handleGetUserPrompts = exports.handleCreatePrompt = void 0;
const promptService_1 = require("../services/promptService");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const errorHandler_1 = require("../middlewares/errorHandler");
exports.handleCreatePrompt = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errorHandler_1.AppError('Unauthorized - Authentication required', 401);
    }
    const { categoryId, subCategoryId, promptText } = req.body;
    if (!categoryId || !subCategoryId || !promptText) {
        throw new errorHandler_1.AppError('categoryId, subCategoryId, and promptText are required', 400);
    }
    const userId = req.user.id;
    const prompt = yield (0, promptService_1.createPrompt)({ userId, categoryId, subCategoryId, promptText });
    res.status(201).json({
        success: true,
        data: prompt
    });
}));
exports.handleGetUserPrompts = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errorHandler_1.AppError('Unauthorized - Authentication required', 401);
    }
    const userId = req.user.id;
    const prompts = yield (0, promptService_1.getUserPrompts)(userId);
    res.json({
        success: true,
        data: prompts
    });
}));
exports.handleGetUserPromptsByUserId = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errorHandler_1.AppError('Unauthorized - Authentication required', 401);
    }
    const { userId } = req.params;
    if (!userId) {
        throw new errorHandler_1.AppError('User ID parameter is required', 400);
    }
    const prompts = yield (0, promptService_1.getUserPromptsByUserId)(userId);
    res.json({
        success: true,
        data: prompts
    });
}));
