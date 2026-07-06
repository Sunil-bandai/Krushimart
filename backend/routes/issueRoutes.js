import express from 'express';
import { createIssue, getMyIssues, getAllIssues, resolveIssue } from '../controllers/issueController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createIssue);
router.get('/my', protect, getMyIssues);
router.get('/', protect, adminOnly, getAllIssues);
router.put('/:id/resolve', protect, adminOnly, resolveIssue);

export default router;
