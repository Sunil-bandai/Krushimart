import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { sendOrderConfirmationEmail, sendOrderStatusEmail } from '../utils/emailService.js';

const FARMER_STATUSES = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];

const STATUS_RANK = { pending: 0, confirmed: 1, dispatched: 2, delivered: 3, cancelled: -1 };

function computeOverallStatus(farmerStatuses) {
  if (!farmerStatuses || farmerStatuses.length === 0) return 'pending';
  const statuses = farmerStatuses.map(fs => fs.status);
  if (statuses.every(s => s === 'delivered')) return 'delivered';
  if (statuses.every(s => s === 'cancelled')) return 'cancelled';
  const active = statuses.filter(s => s !== 'cancelled');
  if (active.length === 0) return 'cancelled';
  const lowest = active.reduce((min, s) => STATUS_RANK[s] < STATUS_RANK[min] ? s : min, active[0]);
  return lowest;
}

export const placeOrder = async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;
    if (!items?.length || !deliveryAddress) {
      return res.status(400).json({ success: false, message: 'Items and delivery address are required' });
    }

    let totalAmount = 0;
    const verifiedItems = [];
    const farmerIds = new Set();
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ success: false, message: 'One or more products not found' });
      }
      const qty = Math.max(1, Math.floor(Number(item.quantity)));
      if (product.stock < qty) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }
      totalAmount += product.price * qty;
      verifiedItems.push({ productId: product._id, farmer: product.farmer, quantity: qty, price: product.price });
      farmerIds.add(product.farmer.toString());
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -qty } });
    }

    const farmerStatuses = Array.from(farmerIds).map(farmerId => ({
      farmer: farmerId,
      status: 'pending'
    }));

    const order = await Order.create({
      consumerId: req.user._id,
      items: verifiedItems,
      totalAmount,
      deliveryAddress,
      farmerStatuses
    });

    const user = await User.findById(req.user._id);
    if (user) {
      sendOrderConfirmationEmail(user, order).catch(err => console.error('Order confirmation email error:', err.message));
    }

    res.status(201).json({ success: true, message: 'Order placed', data: order });
  } catch (err) {
    console.error('placeOrder error:', err);
    res.status(500).json({ success: false, message: 'Server error placing order' });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ consumerId: req.user._id })
      .populate({
        path: 'items.productId',
        select: 'name image price farmer',
        populate: { path: 'farmer', select: 'name phone address' }
      })
      .populate('farmerStatuses.farmer', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

export const farmerOrders = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const orders = await Order.find({ 'farmerStatuses.farmer': farmerId })
      .populate('items.productId', 'name image price unit category')
      .populate('consumerId', 'name email phone address')
      .sort({ createdAt: -1 });

    const result = orders.map(order => {
      const farmerItems = order.items.filter(item => {
        if (!item.farmer) return false;
        return item.farmer.toString() === farmerId.toString();
      });
      const farmerEntry = order.farmerStatuses.find(
        fs => fs.farmer.toString() === farmerId.toString()
      );
      return {
        _id: order._id,
        consumerId: order.consumerId,
        items: farmerItems,
        totalAmount: order.totalAmount,
        deliveryAddress: order.deliveryAddress,
        status: farmerEntry ? farmerEntry.status : order.status,
        overallStatus: order.status,
        createdAt: order.createdAt
      };
    }).filter(o => o.items.length > 0);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('farmerOrders error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching farmer orders' });
  }
};

const VALID_FARMER_TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['dispatched', 'cancelled'],
  dispatched: ['delivered'],
  delivered: [],
  cancelled: [],
};

export const updateStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const newStatus = req.body.status;
    if (!FARMER_STATUSES.includes(newStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const farmerIdx = order.farmerStatuses.findIndex(
      fs => fs.farmer.toString() === req.user._id.toString()
    );
    if (farmerIdx === -1) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this order' });
    }

    const currentFarmerStatus = order.farmerStatuses[farmerIdx].status;
    const allowedNext = VALID_FARMER_TRANSITIONS[currentFarmerStatus] || [];
    if (!allowedNext.includes(newStatus)) {
      return res.status(400).json({ success: false, message: `Cannot transition from '${currentFarmerStatus}' to '${newStatus}'` });
    }

    order.farmerStatuses[farmerIdx].status = newStatus;
    order.status = computeOverallStatus(order.farmerStatuses);
    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate('items.productId', 'name image price')
      .populate('farmerStatuses.farmer', 'name');

    if (currentFarmerStatus !== newStatus) {
      const user = await User.findById(order.consumerId);
      if (user) {
        sendOrderStatusEmail(user, updatedOrder, currentFarmerStatus, newStatus).catch(err => console.error('Status email error:', err.message));
      }
    }

    res.json({ success: true, message: 'Order status updated', data: updatedOrder });
  } catch (err) {
    console.error('updateStatus error:', err);
    res.status(500).json({ success: false, message: 'Server error updating order status' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('consumerId', 'name email')
      .populate('items.productId', 'name price')
      .populate('farmerStatuses.farmer', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};
