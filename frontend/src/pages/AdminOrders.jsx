import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { ADMIN_NAV } from '../constants/dashboardNav';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  dispatched: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

const AdminOrders = () => {
  const { user } = useAuthStore();
  const [downloading, setDownloading] = useState(false);
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const response = await api.get('/orders');
      return response.data;
    }
  });

  const orders = ordersData?.data || ordersData || [];

  const handleDownloadReport = async () => {
    setDownloading(true);
    try {
      const response = await api.get('/admin/reports/orders', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `KrushiMart_Order_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      useUIStore.getState().showNotification('Report downloaded successfully', 'success');
    } catch (error) {
      console.error('Download error:', error);
      useUIStore.getState().showNotification('Failed to download report', 'error');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <DashboardSidebar
        title="Admin Panel"
        subtitle={user?.name || 'Admin'}
        navItems={ADMIN_NAV}
        iconNode={<span className="material-symbols-outlined text-purple-500">admin_panel_settings</span>}
      />
      <main className="ml-64 pt-20 pb-xl px-6">
        <div className="flex justify-between items-center mb-xl">
          <h1 className="font-h1 text-h1">All Orders</h1>
          <button
            onClick={handleDownloadReport}
            disabled={downloading || orders.length === 0}
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">
              {downloading ? 'hourglass_empty' : 'download'}
            </span>
            {downloading ? 'Generating...' : 'Download Report'}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading...</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="glass-panel bg-surface-container/60 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Order ID</p>
                    <p className="font-mono font-bold">{order.orderId || `#${order._id?.slice(-8)}`}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-label-sm ${statusColors[order.status] || statusColors.pending}`}>
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Customer</p>
                    <p>{order.consumerId?.name}</p>
                    <p className="text-sm text-on-surface-variant">{order.consumerId?.email}</p>
                  </div>
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Delivery Address</p>
                    <p className="text-sm">{order.deliveryAddress}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.productId?.name} x{item.quantity}</span>
                      <span className="font-bold">Rs.{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {order.subOrders?.length > 0 && (
                  <div className="border-t border-outline-variant pt-3 mt-3">
                    <p className="text-label-sm text-on-surface-variant mb-2">Sub-Orders</p>
                    <div className="space-y-2">
                      {order.subOrders.map((sub) => (
                        <div key={sub._id} className="flex justify-between items-center text-sm bg-surface-variant/50 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs">{sub.subOrderId}</span>
                            <span className="text-on-surface-variant">{sub.farmerSnapshot?.name || sub.farmerId?.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[sub.status] || statusColors.pending}`}>{sub.status}</span>
                            <span className="font-bold">Rs.{sub.subtotal}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-outline-variant pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg text-primary">Rs.{order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;
