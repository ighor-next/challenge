import express from 'express';
/* controllers */
import { createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

export default router;
