import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getImageSrc } from '../utils/imageUtils';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  dispatched: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

const issueTypes = [
  { value: 'wrong_item', label: 'Wrong Item' },
  { value: 'damaged', label: 'Damaged Product' },
  { value: 'missing', label: 'Missing Items' },
  { value: 'late_delivery', label: 'Late Delivery' },
  { value: 'other', label: 'Other' },
];

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [issueModal, setIssueModal] = useState(null);
  const [issueForm, setIssueForm] = useState({ issueType: 'damaged', message: '' });

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get('/orders/myorders');
      return response.data;
    },
    enabled: isAuthenticated
  });

  const orders = ordersData?.data || [];

  const reportIssueMutation = useMutation({
    mutationFn: (data) => api.post('/issues', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      useUIStore.getState().showNotification('Issue reported successfully', 'success');
      setIssueModal(null);
      setIssueForm({ issueType: 'damaged', message: '' });
    },
    onError: (err) => {
      useUIStore.getState().showNotification(err.response?.data?.message || 'Failed to report issue', 'error');
    }
  });

  const handleReportIssue = () => {
    if (!issueForm.message.trim()) return;
    reportIssueMutation.mutate({
      subOrderId: issueModal._id,
      issueType: issueForm.issueType,
      message: issueForm.message,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-background text-on-surface min-h-screen">
        <Navbar />
        <div className="pt-32 pb-xl px-6 max-w-container-max mx-auto text-center">
          <h1 className="font-h1 text-h1 mb-lg">Login Required</h1>
          <p className="text-on-surface-variant mb-xl">Please login to view your orders.</p>
          <button onClick={() => navigate('/login')} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold">
            Login
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      <div className="floating-orb bg-primary w-96 h-96" style={{ top: '-10%', left: '-5%' }} />
      <div className="floating-orb bg-tertiary-container w-[500px] h-[500px]" style={{ bottom: '-10%', right: '-5%' }} />

      <Navbar />

      <main className="pt-32 pb-xl px-6 max-w-container-max mx-auto">
        <h1 className="font-h1 text-h1 mb-xl text-center">My Orders</h1>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-on-surface-variant mb-xl">No orders yet.</p>
            <button onClick={() => navigate('/shop')} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="glass-panel bg-surface-container/60 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Order ID</p>
                    <p className="font-mono text-sm font-bold">{order.orderId || `#${order._id?.slice(-8)}`}</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-label-sm ${statusColors[order.status] || statusColors.pending}`}>
                    {order.status}
                  </span>
                </div>

                {order.subOrders?.length > 0 ? (
                  <div className="space-y-4">
                    {order.subOrders.map((sub) => (
                      <div key={sub._id} className="border border-outline-variant/30 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">person</span>
                            <p className="font-medium text-sm">{sub.farmerSnapshot?.name || sub.farmerId?.name}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[sub.status] || statusColors.pending}`}>
                            {sub.status}
                          </span>
                        </div>

                        <div className="space-y-2 mb-3">
                          {sub.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <img src={getImageSrc(item.productId?.image)} alt={item.productId?.name} className="w-10 h-10 object-cover rounded-lg" />
                                <div>
                                  <p className="text-sm font-medium">{item.productId?.name}</p>
                                  <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="text-sm font-bold">₹{item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center border-t border-outline-variant/30 pt-3">
                          <span className="text-sm text-on-surface-variant">Subtotal</span>
                          <span className="text-sm font-bold">₹{sub.subtotal}</span>
                        </div>

                        {sub.status === 'delivered' && (
                          <button
                            onClick={() => setIssueModal(sub)}
                            className="mt-3 w-full py-2 border border-error/30 text-error rounded-lg text-xs font-bold hover:bg-error/10 transition-all"
                          >
                            Report Issue
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 mb-4">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <img src={getImageSrc(item.productId?.image)} alt={item.productId?.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                            <p className="font-medium">{item.productId?.name}</p>
                            <p className="text-sm text-on-surface-variant">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-outline-variant pt-4 flex justify-between mt-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg text-primary">₹{order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {issueModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-h3 text-lg mb-4">Report Issue</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Order: {issueModal.orderId?.orderId || 'N/A'} | Farmer: {issueModal.farmerSnapshot?.name}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-2">Issue Type</label>
                <select
                  value={issueForm.issueType}
                  onChange={(e) => setIssueForm({ ...issueForm, issueType: e.target.value })}
                  className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                >
                  {issueTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label-sm text-on-surface-variant mb-2">Description</label>
                <textarea
                  value={issueForm.message}
                  onChange={(e) => setIssueForm({ ...issueForm, message: e.target.value })}
                  placeholder="Describe the issue..."
                  className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setIssueModal(null); setIssueForm({ issueType: 'damaged', message: '' }); }}
                className="flex-1 py-3 border border-outline-variant rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleReportIssue}
                disabled={!issueForm.message.trim() || reportIssueMutation.isPending}
                className="flex-1 py-3 bg-error text-white rounded-xl font-bold disabled:opacity-50"
              >
                {reportIssueMutation.isPending ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
