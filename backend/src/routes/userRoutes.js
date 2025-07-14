import express from 'express';
import {
  handleRegister,
  handleLogin,
  handleGetUser,
  handleGetAllUsers
} from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

router.post('/register', validateRequest(['name', 'phone']), handleRegister);
router.post('/login', validateRequest(['phone']), handleLogin);
router.get('/me', auth, handleGetUser);
router.get('/all', auth, isAdmin, handleGetAllUsers);

export default router;