import express, { Router } from 'express';
import isAdmin from '../middlewares/isAdmin';
import {
  handleCreatePrompt,
  handleGetUserPrompts,
  handleGetUserPromptsByUserId
} from '../controllers/promptController';
import auth from '../middlewares/auth';


/**
 * Prompt Routes
 * POST /         - Create a new prompt (requires authentication)
 * GET  /my       - Get all prompts for the authenticated user
 */
const router: Router = express.Router();

/**
 * @openapi
 * /api/prompts:
 *   post:
 *     summary: Create a new prompt
 *     tags:
 *       - Prompts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               promptText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prompt created
 */
router.post('/', auth, handleCreatePrompt);
/**
 * @openapi
 * /api/prompts/my:
 *   get:
 *     summary: Get all prompts for the authenticated user
 *     tags:
 *       - Prompts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of prompts
 */
router.get('/my', auth, handleGetUserPrompts);
/**
 * @openapi
 * /api/prompts/user/{userId}:
 *   get:
 *     summary: Get all prompts for a specific user (Admin only)
 *     tags:
 *       - Prompts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user prompts
 *       403:
 *         description: Access denied
 */

router.get('/user/:userId', auth, isAdmin, handleGetUserPromptsByUserId);
export default router;
