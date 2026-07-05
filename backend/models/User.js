import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const passwordHistorySchema = new mongoose.Schema({
  password: { type: String, required: true },
  changedAt: { type: Date, default: Date.now },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['consumer', 'farmer', 'admin'], default: 'consumer' },
  avatar: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  passwordHistory: { type: [passwordHistorySchema], default: [], select: false },
  resetPasswordToken: { type: String, default: null, select: false },
  resetPasswordExpire: { type: Date, default: null, select: false },
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.isPasswordReused = async function (newPassword) {
  const history = await this.constructor.findById(this._id).select('passwordHistory').lean();
  if (!history || !history.passwordHistory || history.passwordHistory.length === 0) return false;
  for (const entry of history.passwordHistory) {
    const isMatch = await bcrypt.compare(newPassword, entry.password);
    if (isMatch) return true;
  }
  return false;
};

const User = mongoose.model('User', userSchema);
export default User;
