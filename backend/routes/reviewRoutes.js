import express from 'express';
import { addReview, getProductReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.array('images', 3), addReview);
router.get('/:productId', getProductReviews);

export default router;
