import mongoose from 'mongoose';

const subOrderSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  subOrderId: { type: String, required: true, unique: true },
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerSnapshot: {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    price: { type: Number },
  }],
  subtotal: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

subOrderSchema.index({ farmerId: 1, status: 1 });
subOrderSchema.index({ orderId: 1 });

const SubOrder = mongoose.model('SubOrder', subOrderSchema);
export default SubOrder;
