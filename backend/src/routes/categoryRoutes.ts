import express, { Router } from 'express';
import {
  handleGetAllCategories,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory
} from '../controllers/categoryController';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import validateRequest from '../middlewares/validateRequest';


/**
 * Category Routes
 * GET    /           - Get all categories
 * POST   /           - Create a new category (admin only, requires 'name')
 * PUT    /:id        - Update a category by ID (admin only, requires 'name')
 * DELETE /:id        - Delete a category by ID (admin only)
 */
const router: Router = express.Router();

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
router.get('/', handleGetAllCategories);
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
router.post('/', auth, isAdmin, validateRequest(['name']), handleCreateCategory);
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
router.put('/:id', auth, isAdmin, validateRequest(['name']), handleUpdateCategory);
router.delete('/:id', auth, isAdmin, handleDeleteCategory);

export default router;
