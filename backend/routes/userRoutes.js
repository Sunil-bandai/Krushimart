import express from 'express';
import { getProfile, updateProfile, updatePassword, uploadAvatar } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.put('/password', protect, updatePassword);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

export default router;