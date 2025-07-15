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
exports.handleGetAllCategories = handleGetAllCategories;
exports.handleCreateCategory = handleCreateCategory;
exports.handleUpdateCategory = handleUpdateCategory;
exports.handleDeleteCategory = handleDeleteCategory;
const categoryService_1 = require("../services/categoryService");
function handleGetAllCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield (0, categoryService_1.getAllCategories)();
            res.json(categories);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function handleCreateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const category = yield (0, categoryService_1.createCategory)({ name });
            res.status(201).json(category);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
}
function handleUpdateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const category = yield (0, categoryService_1.updateCategory)(id, req.body);
            res.json(category);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
}
function handleDeleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield (0, categoryService_1.deleteCategory)(id);
            res.json({ message: 'Category deleted' });
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
}
