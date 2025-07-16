import express, { Router } from 'express';
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleGetUser,
  handleGetAllUsers
} from '../controllers/userController';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import validateRequest from '../middlewares/validateRequest';

const router: Router = express.Router();

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
router.post('/logout', handleLogout);

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
router.post('/register', validateRequest('register'), handleRegister);

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
router.post('/login', handleLogin);

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
router.get('/me', auth, handleGetUser);

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
router.get('/all', auth, isAdmin, handleGetAllUsers);

export default router;
