import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  category: { type: String, required: true },
  image: { type: String, default: '/images/placeholder.svg' },
  stock: { type: Number, required: true, default: 0 },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
