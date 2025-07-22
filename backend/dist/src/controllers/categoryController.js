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
exports.handleDeleteCategory = exports.handleUpdateCategory = exports.handleCreateCategory = exports.handleGetAllCategories = void 0;
const categoryService_1 = require("../services/categoryService");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const errorHandler_1 = require("../middlewares/errorHandler");
exports.handleGetAllCategories = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryService_1.getAllCategories)();
    res.json({
        success: true,
        data: categories
    });
}));
exports.handleCreateCategory = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new errorHandler_1.AppError('Category name is required and must be a non-empty string', 400);
    }
    const category = yield (0, categoryService_1.createCategory)({ name: name.trim() });
    res.status(201).json({
        success: true,
        data: category
    });
}));
exports.handleUpdateCategory = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new errorHandler_1.AppError('Category ID is required', 400);
    }
    const { name } = req.body;
    if (name && (typeof name !== 'string' || name.trim() === '')) {
        throw new errorHandler_1.AppError('Category name must be a non-empty string', 400);
    }
    const category = yield (0, categoryService_1.updateCategory)(id, req.body);
    res.json({
        success: true,
        data: category
    });
}));
exports.handleDeleteCategory = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new errorHandler_1.AppError('Category ID is required', 400);
    }
    yield (0, categoryService_1.deleteCategory)(id);
    res.json({
        success: true,
        message: 'Category deleted successfully'
    });
}));
