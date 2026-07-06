import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  subOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubOrder', required: true },
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueType: {
    type: String,
    enum: ['wrong_item', 'damaged', 'missing', 'late_delivery', 'other'],
    required: true,
  },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'resolved', 'rejected'],
    default: 'pending',
  },
  adminReply: { type: String, default: '' },
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;
