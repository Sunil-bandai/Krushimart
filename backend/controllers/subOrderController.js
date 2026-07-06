import SubOrder from '../models/SubOrder.js';
import Order from '../models/Order.js';

const STATUS_RANK = { pending: 0, confirmed: 1, dispatched: 2, delivered: 3, cancelled: -1 };

const VALID_TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['dispatched', 'cancelled'],
  dispatched: ['delivered'],
  delivered: [],
  cancelled: [],
};

function computeOverallStatus(subOrders) {
  if (!subOrders || subOrders.length === 0) return 'pending';
  const statuses = subOrders.map(so => so.status);
  if (statuses.every(s => s === 'delivered')) return 'delivered';
  if (statuses.every(s => s === 'cancelled')) return 'cancelled';
  const active = statuses.filter(s => s !== 'cancelled');
  if (active.length === 0) return 'cancelled';
  return active.reduce((min, s) => STATUS_RANK[s] < STATUS_RANK[min] ? s : min, active[0]);
}

export const updateSubOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const farmerId = req.user._id;

    if (!VALID_TRANSITIONS[status]) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const subOrder = await SubOrder.findById(id);
    if (!subOrder) {
      return res.status(404).json({ success: false, message: 'Sub-order not found' });
    }

    if (subOrder.farmerId.toString() !== farmerId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const allowed = VALID_TRANSITIONS[subOrder.status] || [];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Cannot transition from '${subOrder.status}' to '${status}'` });
    }

    subOrder.status = status;
    await subOrder.save();

    const subOrders = await SubOrder.find({ orderId: subOrder.orderId });
    const parentOrder = await Order.findById(subOrder.orderId);
    if (parentOrder) {
      parentOrder.status = computeOverallStatus(subOrders);
      await parentOrder.save();
    }

    res.json({ success: true, message: 'Sub-order status updated', data: subOrder });
  } catch (err) {
    console.error('updateSubOrderStatus error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getSubOrdersByOrder = async (req, res) => {
  try {
    const subOrders = await SubOrder.find({ orderId: req.params.orderId })
      .populate('farmerId', 'name')
      .populate('items.productId', 'name image price unit');
    res.json({ success: true, data: subOrders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
