import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number },
    price: { type: Number }
  }],
  subtotal: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, default: 'cod' },
  paymentStatus: { type: String, default: 'pending' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending'
  },
  statusHistory: [{ status: String, date: { type: Date, default: Date.now } }],
}, { timestamps: true });

orderSchema.statics.generateOrderId = async function () {
  const count = await this.countDocuments();
  const seq = String(count + 1).padStart(4, '0');
  const year = new Date().getFullYear();
  return `KM-${year}-${seq}`;
};

const Order = mongoose.model('Order', orderSchema);
export default Order;
