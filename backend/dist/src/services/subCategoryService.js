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
exports.getSubCategoriesByCategory = getSubCategoriesByCategory;
exports.createSubCategory = createSubCategory;
exports.updateSubCategory = updateSubCategory;
exports.deleteSubCategory = deleteSubCategory;
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
function getSubCategoriesByCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        return SubCategory_1.default.findAll({ where: { category_id: categoryId } });
    });
}
function createSubCategory(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, category_id }) {
        return SubCategory_1.default.create({ name, category_id });
    });
}
function updateSubCategory(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const subCategory = yield SubCategory_1.default.findByPk(id);
        if (!subCategory)
            throw new Error('SubCategory not found');
        return subCategory.update(data);
    });
}
function deleteSubCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const subCategory = yield SubCategory_1.default.findByPk(id);
        if (!subCategory)
            throw new Error('SubCategory not found');
        return subCategory.destroy();
    });
}
