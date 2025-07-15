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
/**
 * @openapi
 * /api/subcategories/{categoryId}:
 *   get:
 *     summary: Get all subcategories for a category
 *     tags:
 *       - SubCategories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of subcategories
 */
router.get('/:categoryId', subCategoryController_1.handleGetSubCategories);
/**
 * @openapi
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory (admin only)
 *     tags:
 *       - SubCategories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Subcategory created
 */
router.post('/', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name', 'category_id']), subCategoryController_1.handleCreateSubCategory);
/**
 * @openapi
 * /api/subcategories/{id}:
 *   put:
 *     summary: Update a subcategory (admin only)
 *     tags:
 *       - SubCategories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Subcategory updated
 */
router.put('/:id', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name', 'category_id']), subCategoryController_1.handleUpdateSubCategory);
/**
 * @openapi
 * /api/subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory (admin only)
 *     tags:
 *       - SubCategories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subcategory deleted
 */
router.delete('/:id', auth_1.default, isAdmin_1.default, subCategoryController_1.handleDeleteSubCategory);
exports.default = router;
