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
exports.handleGetSubCategories = handleGetSubCategories;
exports.handleCreateSubCategory = handleCreateSubCategory;
exports.handleUpdateSubCategory = handleUpdateSubCategory;
exports.handleDeleteSubCategory = handleDeleteSubCategory;
const subCategoryService_1 = require("../services/subCategoryService");
function handleGetSubCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subCategories = yield (0, subCategoryService_1.getSubCategoriesByCategory)(Number(req.params.categoryId));
            res.json(subCategories);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function handleCreateSubCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, category_id } = req.body;
            const subCategory = yield (0, subCategoryService_1.createSubCategory)({ name, category_id: Number(category_id) });
            res.status(201).json(subCategory);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
}
function handleUpdateSubCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid subcategory ID' });
            }
            const { name, category_id } = req.body;
            const subCategory = yield (0, subCategoryService_1.updateSubCategory)(id, { name, category_id: Number(category_id) });
            res.json(subCategory);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
}
function handleDeleteSubCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            yield (0, subCategoryService_1.deleteSubCategory)(id);
            res.json({ message: 'SubCategory deleted' });
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
}
