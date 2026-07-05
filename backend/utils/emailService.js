import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

const isConfigured = () => {
  return process.env.SMTP_USER && process.env.SMTP_PASS;
};

export const sendWelcomeEmail = async (user) => {
  if (!isConfigured()) {
    console.log('[Email] SMTP not configured — skipping welcome email');
    return;
  }

  const mailOptions = {
    from: `"KrushiMart" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'Welcome to KrushiMart — Fresh From Farm to You!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; padding: 30px; border-radius: 12px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #62df7d;">
          <h1 style="color: #62df7d; margin: 0;">🥬 KrushiMart</h1>
          <p style="color: #94a3b8; margin-top: 5px;">Farm Fresh. Direct to You.</p>
        </div>
        <div style="padding: 30px 0;">
          <h2 style="color: #ffffff;">Welcome, ${user.name}!</h2>
          <p>Thank you for joining KrushiMart — India's freshest agricultural marketplace.</p>
          <p>You can now:</p>
          <ul style="color: #62df7d;">
            <li>Browse fresh produce directly from local farmers</li>
            <li>Place orders and get home delivery</li>
            <li>Track your orders in real-time</li>
            <li>Rate and review products</li>
          </ul>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3002'}/shop" 
             style="display: inline-block; background: #62df7d; color: #1a1a2e; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 15px;">
            Start Shopping →
          </a>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333; color: #64748b; font-size: 12px;">
          <p>© 2026 KrushiMart. Empowering farmers, delighting consumers.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email] Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error(`[Email] Failed to send welcome email: ${error.message}`);
  }
};

export const sendOrderConfirmationEmail = async (user, order) => {
  if (!isConfigured()) {
    console.log('[Email] SMTP not configured — skipping order confirmation');
    return;
  }

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #333;">${item.productId?.name || 'Product'}</td>
      <td style="padding: 8px; border-bottom: 1px solid #333; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #333; text-align: right;">₹${item.price * item.quantity}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: `"KrushiMart" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: `Order Confirmed #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; padding: 30px; border-radius: 12px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #62df7d;">
          <h1 style="color: #62df7d; margin: 0;">🥬 KrushiMart</h1>
        </div>
        <div style="padding: 30px 0;">
          <h2 style="color: #62df7d;">Order Confirmed! ✓</h2>
          <p>Hi ${user.name}, your order has been placed successfully.</p>
          <div style="background: #16213e; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
            <p style="margin: 5px 0;"><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #fbbf24;">Pending</span></p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <tr style="background: #16213e;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Price</th>
            </tr>
            ${itemsHtml}
          </table>
          <div style="text-align: right; padding: 15px 0; border-top: 2px solid #62df7d;">
            <strong style="font-size: 18px; color: #62df7d;">Total: ₹${order.totalAmount}</strong>
          </div>
          <p style="color: #94a3b8; font-size: 13px;">You will receive an email when your order status changes.</p>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333; color: #64748b; font-size: 12px;">
          <p>© 2026 KrushiMart.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email] Order confirmation sent to ${user.email}`);
  } catch (error) {
    console.error(`[Email] Failed to send order confirmation: ${error.message}`);
  }
};

export const sendOrderStatusEmail = async (user, order, oldStatus, newStatus) => {
  if (!isConfigured()) {
    console.log('[Email] SMTP not configured — skipping status update email');
    return;
  }

  const statusMessages = {
    confirmed: { color: '#3f88c5', icon: '✓', text: 'Your order has been confirmed and is being prepared.' },
    dispatched: { color: '#f97316', icon: '🚚', text: 'Your order has been dispatched and is on its way!' },
    delivered: { color: '#62df7d', icon: '📦', text: 'Your order has been delivered. Enjoy your fresh produce!' },
  };

  const statusInfo = statusMessages[newStatus] || { color: '#94a3b8', icon: '•', text: `Order status updated to ${newStatus}.` };

  const mailOptions = {
    from: `"KrushiMart" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: `Order #${order._id.toString().slice(-8).toUpperCase()} — ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; padding: 30px; border-radius: 12px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #62df7d;">
          <h1 style="color: #62df7d; margin: 0;">🥬 KrushiMart</h1>
        </div>
        <div style="padding: 30px 0; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 15px;">${statusInfo.icon}</div>
          <h2 style="color: ${statusInfo.color};">${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}</h2>
          <p style="font-size: 16px; margin: 15px 0;">${statusInfo.text}</p>
          <div style="background: #16213e; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
            <p style="margin: 5px 0;"><strong>Total:</strong> ₹${order.totalAmount}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${order.deliveryAddress}</p>
          </div>
          ${newStatus === 'delivered' ? '<p style="color: #62df7d; font-weight: bold;">Thank you for shopping with KrushiMart!</p>' : ''}
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333; color: #64748b; font-size: 12px;">
          <p>© 2026 KrushiMart.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email] Status update (${newStatus}) sent to ${user.email}`);
  } catch (error) {
    console.error(`[Email] Failed to send status update: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  if (!isConfigured()) {
    console.log('[Email] SMTP not configured — skipping password reset email');
    return;
  }

  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3002'}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"KrushiMart" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'KrushiMart — Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; padding: 30px; border-radius: 12px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #62df7d;">
          <h1 style="color: #62df7d; margin: 0;">🥬 KrushiMart</h1>
          <p style="color: #94a3b8; margin-top: 5px;">Password Reset Request</p>
        </div>
        <div style="padding: 30px 0;">
          <h2 style="color: #ffffff;">Hi ${user.name},</h2>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; background: #62df7d; color: #1a1a2e; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Reset Password →
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 13px;">This link will expire in 15 minutes. If you didn't request this, please ignore this email.</p>
          <div style="background: #16213e; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 5px 0; color: #fbbf24; font-size: 13px;">⚠️ For your security, your new password cannot be one of your recently used passwords.</p>
          </div>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333; color: #64748b; font-size: 12px;">
          <p>© 2026 KrushiMart. Empowering farmers, delighting consumers.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email] Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error(`[Email] Failed to send password reset email: ${error.message}`);
  }
};
