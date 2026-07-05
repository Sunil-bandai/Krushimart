import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { ADMIN_NAV } from '../constants/dashboardNav';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  dispatched: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500'
};

const AdminOrders = () => {
  const { user } = useAuthStore();
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const response = await api.get('/orders');
      return response.data;
    }
  });

  const orders = ordersData?.data || ordersData || [];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <DashboardSidebar
        title="Admin Panel"
        subtitle={user?.name || 'Admin'}
        navItems={ADMIN_NAV}
        iconNode={<span className="material-symbols-outlined text-purple-500">admin_panel_settings</span>}
      />
      <main className="ml-64 pt-20 pb-xl px-6">
        <h1 className="font-h1 text-h1 mb-xl">All Orders</h1>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading...</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="glass-panel bg-surface-container/60 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Order ID</p>
                    <p className="font-mono">#{order._id?.slice(-8)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-label-sm ${statusColors[order.status]}`}>
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
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-outline-variant pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg text-primary">₹{order.totalAmount}</span>
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