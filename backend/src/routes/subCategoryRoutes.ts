import express, { Router } from 'express';
import {
  handleGetSubCategories,
  handleCreateSubCategory,
  handleUpdateSubCategory,
  handleDeleteSubCategory
} from '../controllers/subCategoryController';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import validateRequest from '../middlewares/validateRequest';

const router: Router = express.Router();

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
router.get('/:categoryId', handleGetSubCategories);

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
router.post('/', auth, isAdmin, validateRequest(['name', 'category_id']), handleCreateSubCategory);

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
router.put('/:id', auth, isAdmin, validateRequest(['name', 'category_id']), handleUpdateSubCategory);

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
router.delete('/:id', auth, isAdmin, handleDeleteSubCategory);

export default router;
