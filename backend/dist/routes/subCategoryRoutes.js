"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategoryController_1 = require("../controllers/subCategoryController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = express_1.default.Router();
router.get('/:categoryId', subCategoryController_1.handleGetSubCategories);
router.post('/', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name', 'category_id']), subCategoryController_1.handleCreateSubCategory);
router.put('/:id', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name', 'category_id']), subCategoryController_1.handleUpdateSubCategory);
router.delete('/:id', auth_1.default, isAdmin_1.default, subCategoryController_1.handleDeleteSubCategory);
exports.default = router;
