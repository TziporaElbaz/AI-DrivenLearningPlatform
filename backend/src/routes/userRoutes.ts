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

router.post('/register', validateRequest(['id', 'name', 'phone']), handleRegister);

router.post('/login', validateRequest(['phone']), handleLogin);

router.get('/me', auth, handleGetUser);

router.get('/all', auth, isAdmin, handleGetAllUsers);

export default router;
