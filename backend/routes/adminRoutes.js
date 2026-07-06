import express from 'express';
import { getUsers, toggleUser, deleteUser, getProducts, approveProduct, deleteProduct, getAnalytics, generateOrdersReport } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, adminOnly, getUsers);
router.put('/users/:id/toggle', protect, adminOnly, toggleUser);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.get('/products', protect, adminOnly, getProducts);
router.put('/products/:id/approve', protect, adminOnly, approveProduct);
router.delete('/products/:id', protect, adminOnly, deleteProduct);
router.get('/analytics', protect, adminOnly, getAnalytics);
router.get('/reports/orders', protect, adminOnly, generateOrdersReport);

export default router;