import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const populateCart = (cart) => cart.populate('items.product', 'name image price stock category unit');

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name image price stock category unit');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching cart' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const requestedQuantity = Math.max(1, Number(quantity) || 1);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    const currentQty = existingItem ? existingItem.quantity : 0;
    if (currentQty + requestedQuantity > product.stock) {
      return res.status(400).json({ success: false, message: `Only ${product.stock} items available in stock` });
    }

    if (existingItem) {
      existingItem.quantity += requestedQuantity;
    } else {
      cart.items.push({ product: productId, quantity: requestedQuantity, price: product.price });
    }
    await cart.save();
    await populateCart(cart);
    res.json({ success: true, message: 'Added to cart', data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching cart' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === req.params.productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({ success: false, message: `Only ${product.stock} items available in stock` });
      }
      item.quantity = quantity;
    }
    await cart.save();
    await populateCart(cart);
    res.json({ success: true, message: 'Cart updated', data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating cart' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    await populateCart(cart);
    res.json({ success: true, message: 'Item removed from cart', data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error removing item from cart' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true }
    );
    if (cart) {
      await populateCart(cart);
    }
    res.json({ success: true, message: 'Cart cleared', data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error clearing cart' });
  }
};
