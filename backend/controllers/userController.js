import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -passwordHistory');
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, avatar } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (phone !== undefined) update.phone = phone;
    if (address !== undefined) update.address = address;

    if (req.file) {
      update.avatar = `/uploads/${req.file.filename}`;
    } else if (avatar !== undefined) {
      update.avatar = avatar;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      update,
      { new: true }
    ).select('-password -passwordHistory');
    res.json({ success: true, message: 'Profile updated', data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const avatarPath = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarPath },
      { new: true }
    ).select('-password -passwordHistory');

    res.json({ success: true, message: 'Avatar uploaded', data: { avatar: avatarPath, user } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error uploading avatar' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
    }

    const user = await User.findById(req.user._id).select('+passwordHistory');
    
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const isReused = await user.isPasswordReused(newPassword);
    if (isReused) {
      return res.status(400).json({
        success: false,
        message: 'Cannot reuse a recent password. Please choose a different password.',
      });
    }

    const historyEntry = { password: user.password, changedAt: new Date() };
    user.passwordHistory = [...(user.passwordHistory || []), historyEntry].slice(-5);

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating password' });
  }
};