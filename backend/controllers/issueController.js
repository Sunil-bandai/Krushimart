import Issue from '../models/Issue.js';
import SubOrder from '../models/SubOrder.js';
import Order from '../models/Order.js';

export const createIssue = async (req, res) => {
  try {
    const { subOrderId, issueType, message } = req.body;
    if (!subOrderId || !issueType || !message) {
      return res.status(400).json({ success: false, message: 'subOrderId, issueType, and message are required' });
    }

    const subOrder = await SubOrder.findById(subOrderId);
    if (!subOrder) {
      return res.status(404).json({ success: false, message: 'Sub-order not found' });
    }

    if (subOrder.consumerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const issue = await Issue.create({
      orderId: subOrder.orderId,
      subOrderId,
      consumerId: req.user._id,
      farmerId: subOrder.farmerId,
      issueType,
      message,
    });

    res.status(201).json({ success: true, message: 'Issue reported', data: issue });
  } catch (err) {
    console.error('createIssue error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ consumerId: req.user._id })
      .populate('farmerId', 'name')
      .populate('orderId', 'orderId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('consumerId', 'name email')
      .populate('farmerId', 'name email')
      .populate('orderId', 'orderId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const resolveIssue = async (req, res) => {
  try {
    const { status, adminReply } = req.body;
    if (!['resolved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be resolved or rejected' });
    }

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status, adminReply },
      { new: true }
    );
    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }
    res.json({ success: true, message: `Issue ${status}`, data: issue });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
