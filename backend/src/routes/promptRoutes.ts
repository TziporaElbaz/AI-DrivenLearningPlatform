import express, { Router } from 'express';
import {
  handleCreatePrompt,
  handleGetUserPrompts
} from '../controllers/promptController';
import auth from '../middlewares/auth';

const router: Router = express.Router();

router.post('/', auth, handleCreatePrompt);
router.get('/my', auth, handleGetUserPrompts);

export default router;
