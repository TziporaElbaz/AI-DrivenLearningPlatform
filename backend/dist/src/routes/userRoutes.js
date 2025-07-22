"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = express_1.default.Router();
/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', userController_1.handleLogout);
/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's name
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's phone
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/register', (0, validateRequest_1.default)('register'), userController_1.handleRegister);
/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', userController_1.handleLogin);
/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/me', auth_1.default, userController_1.handleGetUser);
/**
 * @openapi
 * /api/users/all:
 *   get:
 *     summary: Get all users (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/all', auth_1.default, isAdmin_1.default, userController_1.handleGetAllUsers);
exports.default = router;
