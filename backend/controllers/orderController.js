import Order from '../models/Order.js';
import SubOrder from '../models/SubOrder.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { sendOrderConfirmationEmail, sendOrderStatusEmail } from '../utils/emailService.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;
    if (!items?.length || !deliveryAddress) {
      return res.status(400).json({ success: false, message: 'Items and delivery address are required' });
    }

    let totalAmount = 0;
    const verifiedItems = [];
    const farmerMap = new Map();

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

      const farmerId = product.farmer.toString();
      if (!farmerMap.has(farmerId)) {
        const farmer = await User.findById(product.farmer);
        farmerMap.set(farmerId, {
          farmerId: product.farmer,
          farmerSnapshot: { name: farmer?.name || '', phone: farmer?.phone || '', address: farmer?.address || '' },
          items: [],
          subtotal: 0,
        });
      }
      const entry = farmerMap.get(farmerId);
      entry.items.push({ productId: product._id, quantity: qty, price: product.price });
      entry.subtotal += product.price * qty;

      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -qty } });
    }

    const orderId = await Order.generateOrderId();

    const order = await Order.create({
      orderId,
      consumerId: req.user._id,
      items: verifiedItems,
      totalAmount,
      deliveryAddress,
      status: 'pending',
    });

    const subOrderIds = [];
    for (const [, entry] of farmerMap) {
      const subOrderId = `${orderId}-${entry.farmerSnapshot.name.split(' ')[0].toUpperCase()}`;
      const subOrder = await SubOrder.create({
        orderId: order._id,
        subOrderId,
        consumerId: req.user._id,
        farmerId: entry.farmerId,
        farmerSnapshot: entry.farmerSnapshot,
        items: entry.items,
        subtotal: entry.subtotal,
        deliveryAddress,
        status: 'pending',
      });
      subOrderIds.push(subOrder._id);
    }

    const user = await User.findById(req.user._id);
    if (user) {
      sendOrderConfirmationEmail(user, order).catch(err => console.error('Order confirmation email error:', err.message));
    }

    res.status(201).json({ success: true, message: 'Order placed', data: { order, subOrderIds } });
  } catch (err) {
    console.error('placeOrder error:', err);
    res.status(500).json({ success: false, message: 'Server error placing order' });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ consumerId: req.user._id }).sort({ createdAt: -1 });

    const ordersWithSubOrders = await Promise.all(
      orders.map(async (order) => {
        const subOrders = await SubOrder.find({ orderId: order._id })
          .populate('items.productId', 'name image price unit')
          .populate('farmerId', 'name');
        return {
          ...order.toObject(),
          subOrders,
        };
      })
    );

    res.json({ success: true, data: ordersWithSubOrders });
  } catch (err) {
    console.error('myOrders error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

export const farmerOrders = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const subOrders = await SubOrder.find({ farmerId })
      .populate('items.productId', 'name image price unit category')
      .populate('consumerId', 'name email phone address')
      .populate('orderId', 'orderId status')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: subOrders });
  } catch (err) {
    console.error('farmerOrders error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching farmer orders' });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const VALID_TRANSITIONS = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['dispatched', 'cancelled'],
      dispatched: ['delivered'],
      delivered: [],
      cancelled: [],
    };

    const subOrder = await SubOrder.findById(req.params.id);
    if (!subOrder) {
      return res.status(404).json({ success: false, message: 'Sub-order not found' });
    }

    if (subOrder.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const allowed = VALID_TRANSITIONS[subOrder.status] || [];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Cannot transition from '${subOrder.status}' to '${status}'` });
    }

    subOrder.status = status;
    await subOrder.save();

    const STATUS_RANK = { pending: 0, confirmed: 1, dispatched: 2, delivered: 3, cancelled: -1 };
    const allSubOrders = await SubOrder.find({ orderId: subOrder.orderId });
    const parentOrder = await Order.findById(subOrder.orderId);
    if (parentOrder) {
      const statuses = allSubOrders.map(so => so.status);
      if (statuses.every(s => s === 'delivered')) parentOrder.status = 'delivered';
      else if (statuses.every(s => s === 'cancelled')) parentOrder.status = 'cancelled';
      else {
        const active = statuses.filter(s => s !== 'cancelled');
        parentOrder.status = active.length > 0
          ? active.reduce((min, s) => STATUS_RANK[s] < STATUS_RANK[min] ? s : min, active[0])
          : 'cancelled';
      }
      await parentOrder.save();
    }

    if (subOrder.status !== status) {
      const user = await User.findById(subOrder.consumerId);
      if (user) {
        sendOrderStatusEmail(user, parentOrder, subOrder.status, status).catch(err => console.error('Status email error:', err.message));
      }
    }

    const populated = await SubOrder.findById(subOrder._id)
      .populate('items.productId', 'name image price')
      .populate('farmerId', 'name');

    res.json({ success: true, message: 'Status updated', data: populated });
  } catch (err) {
    console.error('updateStatus error:', err);
    res.status(500).json({ success: false, message: 'Server error updating status' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('consumerId', 'name email')
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 });

    const ordersWithSubOrders = await Promise.all(
      orders.map(async (order) => {
        const subOrders = await SubOrder.find({ orderId: order._id })
          .populate('farmerId', 'name');
        return { ...order.toObject(), subOrders };
      })
    );

    res.json({ success: true, data: ordersWithSubOrders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};
