import Product from '../models/Product.js';
import Order from '../models/Order.js';

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
    console.error('getFarmerOrders error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

export const getFarmerAnalytics = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id });
    
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    
    res.json({
      success: true,
      data: { totalProducts, totalStock },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching analytics' });
  }
};