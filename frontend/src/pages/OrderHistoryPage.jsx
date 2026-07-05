import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getImageSrc } from '../utils/imageUtils';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  dispatched: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500'
};

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get('/orders/myorders');
      return response.data;
    },
    enabled: isAuthenticated
  });

  const orders = ordersData?.data || ordersData || [];

  if (!isAuthenticated) {
    return (
      <div className="bg-background text-on-surface min-h-screen">
        <Navbar />
        <div className="pt-32 pb-xl px-6 max-w-container-max mx-auto text-center">
          <h1 className="font-h1 text-h1 mb-lg">Login Required</h1>
          <p className="text-on-surface-variant mb-xl">Please login to view your orders.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold"
          >
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
            <button 
              onClick={() => navigate('/shop')}
              className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="glass-panel bg-surface-container/60 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-label-sm text-on-surface-variant">Order ID</p>
                    <p className="font-mono text-sm">#{order._id?.slice(-8)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-label-sm ${statusColors[order.status] || statusColors.pending}`}>
                    {order.status}
                  </span>
                </div>
                
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
                
                <div className="border-t border-outline-variant pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg text-primary">₹{order.totalAmount}</span>
                </div>

                {(order.status === 'dispatched' || order.status === 'delivered') && (() => {
                  const farmerMap = new Map();
                  order.items?.forEach(item => {
                    const farmer = item.productId?.farmer;
                    if (farmer && farmer._id && !farmerMap.has(farmer._id)) {
                      farmerMap.set(farmer._id, farmer);
                    }
                  });
                  const farmers = Array.from(farmerMap.values());
                  if (farmers.length === 0) return null;
                  return (
                    <div className="border-t border-outline-variant mt-4 pt-4">
                      <p className="text-label-sm text-on-surface-variant mb-2">
                        {farmers.length === 1 ? 'Farmer Contact' : `${farmers.length} Farmers — Contact Details`}
                      </p>
                      <div className="space-y-3">
                        {farmers.map((farmer) => (
                          <div key={farmer._id} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">person</span>
                            <div>
                              <p className="font-medium">{farmer.name}</p>
                              {farmer.phone && (
                                <a href={`tel:${farmer.phone}`} className="text-primary text-sm hover:underline flex items-center gap-1">
                                  <span className="material-symbols-outlined text-xs">call</span>
                                  {farmer.phone}
                                </a>
                              )}
                              {farmer.address && (
                                <p className="text-xs text-on-surface-variant flex items-center gap-1">
                                  <span className="material-symbols-outlined text-xs">location_on</span>
                                  {farmer.address}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;