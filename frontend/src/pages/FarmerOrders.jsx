import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { FARMER_NAV } from '../constants/dashboardNav';
import { getImageSrc } from '../utils/imageUtils';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  dispatched: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500'
};

const TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['dispatched', 'cancelled'],
  dispatched: ['delivered'],
  delivered: [],
  cancelled: [],
};

const FarmerOrders = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['farmerOrders'],
    queryFn: async () => {
      const response = await api.get('/farmer/orders');
      return response.data;
    }
  });

  const orders = ordersData?.data || [];

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => api.put(`/orders/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmerOrders'] });
      useUIStore.getState().showNotification('Status updated', 'success');
    },
    onError: (error) => {
      useUIStore.getState().showNotification(
        error.response?.data?.message || 'Failed to update order status', 'error'
      );
    }
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  const getSubtotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <DashboardSidebar
        title="Farmer Panel"
        subtitle={user?.name || 'Farmer'}
        navItems={FARMER_NAV}
        iconNode={<span className="material-symbols-outlined text-primary">agriculture</span>}
      />
      <main className="ml-64 pt-20 pb-xl px-6">
        <h1 className="font-h1 text-h1 mb-xl">Orders</h1>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-on-surface-variant">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="glass-panel bg-surface-container/60 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Order ID</p>
                    <p className="font-mono">#{order._id?.slice(-8)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-label-sm ${statusColors[order.status] || statusColors.pending}`}>
                      Your status: {order.status}
                    </span>
                    {order.overallStatus !== order.status && (
                      <span className="px-3 py-1 rounded-full text-label-sm bg-surface-variant text-on-surface-variant">
                        Overall: {order.overallStatus}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-label-sm text-on-surface-variant">Customer</p>
                  <p>{order.consumerId?.name}</p>
                  <p className="text-sm text-on-surface-variant">{order.consumerId?.email}</p>
                  {order.consumerId?.phone && (
                    <a href={`tel:${order.consumerId.phone}`} className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-xs">call</span>
                      {order.consumerId.phone}
                    </a>
                  )}
                  {order.deliveryAddress && (
                    <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      {order.deliveryAddress}
                    </p>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-label-sm text-on-surface-variant">Your Items</p>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={getImageSrc(item.productId?.image)}
                          alt={item.productId?.name} 
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.productId?.name}</p>
                          <p className="text-sm text-on-surface-variant">
                            Qty: {item.quantity} {item.productId?.unit ? `/ ${item.productId.unit}` : ''}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-outline-variant pt-4 flex justify-between items-center">
                  <span className="font-bold">Your Subtotal</span>
                  <span className="font-bold text-lg text-primary">₹{getSubtotal(order.items)}</span>
                </div>

                <div className="border-t border-outline-variant pt-4 flex justify-between items-center mb-1">
                  <span className="text-sm text-on-surface-variant">Order Total (all farmers)</span>
                  <span className="font-bold">₹{order.totalAmount}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-outline-variant">
                  <p className="text-label-sm text-on-surface-variant mb-2">Update Status</p>
                  <div className="flex gap-2">
                    {(TRANSITIONS[order.status] || []).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(order._id, status)}
                        className={`px-4 py-2 rounded-lg text-sm capitalize ${
                          status === 'cancelled'
                            ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                            : 'bg-surface-variant text-on-surface hover:bg-primary/20'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                    {(!TRANSITIONS[order.status] || TRANSITIONS[order.status].length === 0) && (
                      <span className="text-sm text-on-surface-variant">
                        {order.status === 'delivered' ? 'Order completed' : 'No actions available'}
                      </span>
                    )}
                  </div>
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

export default FarmerOrders;
