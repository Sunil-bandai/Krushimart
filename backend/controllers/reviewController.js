import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'productId, rating, and comment are required' });
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5 || !Number.isInteger(numRating)) {
      return res.status(400).json({ success: false, message: 'Rating must be an integer between 1 and 5' });
    }

    const existingReview = await Review.findOne({ productId, consumerId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const hasPurchased = await Order.findOne({
      consumerId: req.user._id,
      'items.productId': productId,
      status: 'delivered'
    });
    if (!hasPurchased) {
      return res.status(400).json({ success: false, message: 'You can only review products you have purchased and received' });
    }

    const imagePaths = req.files?.map((file) => `/uploads/${file.filename}`) || [];
    const reviewData = {
      productId,
      rating: numRating,
      comment,
      consumerId: req.user._id,
      images: imagePaths,
    };

    const review = await Review.create(reviewData);

    const ratingResult = await Review.aggregate([
      { $match: { productId: review.productId } },
      { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    const avg = ratingResult.length > 0 ? ratingResult[0].avgRating : 0;
    const count = ratingResult.length > 0 ? ratingResult[0].count : 0;
    await Product.findByIdAndUpdate(productId, { rating: Math.round(avg * 10) / 10, numReviews: count });

    res.status(201).json({ success: true, message: 'Review added', data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error adding review' });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate('consumerId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching reviews' });
  }
};