import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 0, size = 12, farmer } = req.query;
    let query = { isApproved: true };
    if (category && category !== 'All Produce') query.category = category;
    if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.name = { $regex: escaped, $options: 'i' };
    }
    if (farmer) query.farmer = farmer;

    const skip = page * size;
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('farmer', 'name phone avatar address')
      .skip(skip)
      .limit(Number(size));

    res.json({
      success: true,
      data: {
        content: products,
        totalPages: Math.ceil(total / size),
        totalElements: total,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name avatar address');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching product' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, unit } = req.body;
    const productData = { name, description, price: Number(price), category, stock: Number(stock), unit, farmer: req.user._id };
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    const product = await Product.create(productData);
    res.status(201).json({ success: true, message: 'Product created', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error creating product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, unit, image } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (category !== undefined) updateData.category = category;
    if (stock !== undefined) updateData.stock = Number(stock);
    if (unit !== undefined) updateData.unit = unit;
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (image !== undefined && image !== '') {
      updateData.image = image;
    }
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user._id },
      updateData, { new: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product updated', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error deleting product' });
  }
};