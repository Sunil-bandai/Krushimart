import express from 'express';
import { getFarmerProducts, getFarmerOrders, getFarmerAnalytics } from '../controllers/farmerController.js';
import { protect, farmerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/products', protect, farmerOnly, getFarmerProducts);
router.get('/orders', protect, farmerOnly, getFarmerOrders);
router.get('/analytics', protect, farmerOnly, getFarmerAnalytics);

export default router;