import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { getChatReply } from '../controllers/chatController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/chat', getChatReply);

export default router;