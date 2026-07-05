import express from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, farmerOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, farmerOnly, upload.single('image'), createProduct);
router.put('/:id', protect, farmerOnly, upload.single('image'), updateProduct);
router.delete('/:id', protect, farmerOnly, deleteProduct);

export default router;