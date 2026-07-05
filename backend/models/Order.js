import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity:  { type: Number },
    price:     { type: Number }
  }],
  totalAmount:     { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, enum: ['pending','confirmed','dispatched','delivered'], default: 'pending' },
  farmerStatuses: [{
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending','confirmed','dispatched','delivered','cancelled'], default: 'pending' }
  }]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;