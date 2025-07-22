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
/**
 * Category Routes
 * GET    /           - Get all categories
 * POST   /           - Create a new category (admin only, requires 'name')
 * PUT    /:id        - Update a category by ID (admin only, requires 'name')
 * DELETE /:id        - Delete a category by ID (admin only)
 */
const router = express_1.default.Router();
/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', categoryController_1.handleGetAllCategories);
/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
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
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name']), categoryController_1.handleCreateCategory);
/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 */
router.put('/:id', auth_1.default, isAdmin_1.default, (0, validateRequest_1.default)(['name']), categoryController_1.handleUpdateCategory);
router.delete('/:id', auth_1.default, isAdmin_1.default, categoryController_1.handleDeleteCategory);
exports.default = router;
