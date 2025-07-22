"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const promptController_1 = require("../controllers/promptController");
const auth_1 = __importDefault(require("../middlewares/auth"));
/**
 * Prompt Routes
 * POST /         - Create a new prompt (requires authentication)
 * GET  /my       - Get all prompts for the authenticated user
 */
const router = express_1.default.Router();
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
router.post('/', auth_1.default, promptController_1.handleCreatePrompt);
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
router.get('/my', auth_1.default, promptController_1.handleGetUserPrompts);
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
router.get('/user/:userId', auth_1.default, isAdmin_1.default, promptController_1.handleGetUserPromptsByUserId);
exports.default = router;
