import express, { Router } from 'express';
import {
  handleRegister,
  handleLogin,
  handleGetUser,
  handleGetAllUsers
} from '../controllers/userController';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import validateRequest from '../middlewares/validateRequest';

const router: Router = express.Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/register', validateRequest(['id', 'name', 'phone']), handleRegister);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validateRequest(['phone']), handleLogin);

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
