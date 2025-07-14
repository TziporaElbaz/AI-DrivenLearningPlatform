import express from 'express';
import {
  handleCreatePrompt,
  handleGetUserPrompts,
  handleGetAllPrompts
} from '../controllers/promptController.js';
import auth from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

router.post('/', auth, validateRequest(['categoryId', 'subCategoryId', 'promptText']), handleCreatePrompt);
router.get('/history', auth, handleGetUserPrompts);
router.get('/all', auth, isAdmin, handleGetAllPrompts); // לאדמין בלבד

export default router;