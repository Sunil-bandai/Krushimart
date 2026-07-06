import Product from '../models/Product.js';
import SubOrder from '../models/SubOrder.js';

export const getFarmerProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

export const getFarmerOrders = async (req, res) => {
  try {
    const subOrders = await SubOrder.find({ farmerId: req.user._id })
      .populate('items.productId', 'name image price unit category')
      .populate('consumerId', 'name email phone address')
      .populate('orderId', 'orderId status')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: subOrders });
  } catch (err) {
    console.error('getFarmerOrders error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

export const getFarmerAnalytics = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id });
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    res.json({ success: true, data: { totalProducts, totalStock } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching analytics' });
  }
};
