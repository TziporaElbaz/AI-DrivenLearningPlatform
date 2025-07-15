"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = express_1.default.Router();
router.get('/', categoryController_1.handleGetAllCategories);
router.post('/', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name']), categoryController_1.handleCreateCategory);
router.put('/:id', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name']), categoryController_1.handleUpdateCategory);
router.delete('/:id', auth_1.default, isAdmin_1.default, categoryController_1.handleDeleteCategory);
exports.default = router;
