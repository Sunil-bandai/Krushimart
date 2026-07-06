import express from 'express';
import { placeOrder, myOrders, farmerOrders, updateStatus, getAllOrders } from '../controllers/orderController.js';
import { protect, farmerOnly, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/myorders', protect, myOrders);
router.get('/farmer', protect, farmerOnly, farmerOrders);
router.put('/:id/status', protect, farmerOnly, updateStatus);
router.get('/', protect, adminOnly, getAllOrders);

export default router;
