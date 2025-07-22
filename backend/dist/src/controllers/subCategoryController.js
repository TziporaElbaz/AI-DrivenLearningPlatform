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
exports.handleDeleteSubCategory = exports.handleUpdateSubCategory = exports.handleCreateSubCategory = exports.handleGetSubCategories = void 0;
const subCategoryService_1 = require("../services/subCategoryService");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const errorHandler_1 = require("../middlewares/errorHandler");
exports.handleGetSubCategories = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const categoryIdNum = Number(categoryId);
    if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
        throw new errorHandler_1.AppError('Invalid category ID - must be a positive number', 400);
    }
    const subCategories = yield (0, subCategoryService_1.getSubCategoriesByCategory)(categoryIdNum);
    res.json({
        success: true,
        data: subCategories
    });
}));
exports.handleCreateSubCategory = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category_id } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new errorHandler_1.AppError('SubCategory name is required and must be a non-empty string', 400);
    }
    const categoryIdNum = Number(category_id);
    if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
        throw new errorHandler_1.AppError('Valid category_id is required - must be a positive number', 400);
    }
    const subCategory = yield (0, subCategoryService_1.createSubCategory)({
        name: name.trim(),
        category_id: categoryIdNum
    });
    res.status(201).json({
        success: true,
        data: subCategory
    });
}));
exports.handleUpdateSubCategory = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idNum = Number(id);
    if (isNaN(idNum) || idNum <= 0) {
        throw new errorHandler_1.AppError('Invalid subcategory ID - must be a positive number', 400);
    }
    const { name, category_id } = req.body;
    if (name && (typeof name !== 'string' || name.trim() === '')) {
        throw new errorHandler_1.AppError('SubCategory name must be a non-empty string', 400);
    }
    let updateData = {};
    if (name)
        updateData.name = name.trim();
    if (category_id !== undefined) {
        const categoryIdNum = Number(category_id);
        if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
            throw new errorHandler_1.AppError('Valid category_id is required - must be a positive number', 400);
        }
        updateData.category_id = categoryIdNum;
    }
    const subCategory = yield (0, subCategoryService_1.updateSubCategory)(idNum, updateData);
    res.json({
        success: true,
        data: subCategory
    });
}));
exports.handleDeleteSubCategory = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idNum = Number(id);
    if (isNaN(idNum) || idNum <= 0) {
        throw new errorHandler_1.AppError('Invalid subcategory ID - must be a positive number', 400);
    }
    yield (0, subCategoryService_1.deleteSubCategory)(idNum);
    res.json({
        success: true,
        message: 'SubCategory deleted successfully'
    });
}));
