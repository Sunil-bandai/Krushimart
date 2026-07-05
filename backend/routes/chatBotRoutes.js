import express from 'express';
const router = express.Router();
import { chatBot } from '../controllers/chatBotController.js';
import { protect } from '../middleware/authMiddleware.js';
router.route('/chatbot').post(protect, chatBot);
export default router;
