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
exports.getAllCategories = getAllCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const Category_1 = __importDefault(require("../models/Category"));
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return Category_1.default.findAll();
    });
}
function createCategory(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name }) {
        return Category_1.default.create({ name });
    });
}
function updateCategory(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield Category_1.default.findByPk(id);
        if (!category)
            throw new Error('Category not found');
        return category.update(data);
    });
}
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield Category_1.default.findByPk(id);
        if (!category)
            throw new Error('Category not found');
        return category.destroy();
    });
}
