import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { FARMER_NAV } from '../constants/dashboardNav';
import { getImageSrc } from '../utils/imageUtils';

const orderStatusClasses = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  dispatched: 'bg-orange-500/20 text-orange-500',
  delivered: 'bg-green-500/20 text-green-500',
};

const stats = [
  {
    icon: 'inventory',
    label: 'Total Products',
    value: '0',
    badge: '',
    badgeColor: 'text-primary',
    iconBg: 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-on-primary',
  },
  {
    icon: 'local_shipping',
    label: 'Active Orders',
    value: '0',
    badge: 'Active',
    badgeColor: 'text-primary',
    iconBg: 'bg-secondary-container/50 text-secondary group-hover:bg-secondary group-hover:text-on-secondary',
  },
  {
    icon: 'payments',
    label: 'Total Earnings',
    value: 'Rs. 0',
    badge: 'Live',
    badgeColor: 'text-[#fbbf24]',
    iconBg: 'bg-tertiary-container/30 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary',
  },
  {
    icon: 'pending_actions',
    label: 'Pending Orders',
    value: '0',
    badge: 'Action Req.',
    badgeColor: 'text-error',
    iconBg: 'bg-error-container/30 text-error group-hover:bg-error group-hover:text-on-error',
  },
];

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Fetch farmer's products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['farmerProducts'],
    queryFn: async () => {
      const response = await api.get('/farmer/products');
      return response.data;
    }
  });

  const { data: ordersData, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['farmerOrders'],
    queryFn: async () => {
      const response = await api.get('/farmer/orders');
      return response.data;
    }
  });

  const myProducts = productsData?.data || productsData || [];
  const farmerOrders = ordersData?.data || ordersData || [];
  const incomingOrders = farmerOrders.slice(0, 4);
  const totalRevenue = farmerOrders.reduce((sum, order) => {
    const orderTotal = (order.items || []).reduce((itemSum, item) => {
      return itemSum + Number(item.price || item.productId?.price || 0) * Number(item.quantity || 0);
    }, 0);
    return sum + orderTotal;
  }, 0);
  const dashboardStats = [
    { ...stats[0], value: String(myProducts.length), badge: 'Live' },
    {
      ...stats[1],
      value: String(farmerOrders.filter((order) => order.status !== 'delivered').length),
      badge: 'Active',
    },
    { ...stats[2], value: `Rs. ${totalRevenue.toFixed(0)}`, badge: 'Live' },
    {
      ...stats[3],
      value: String(farmerOrders.filter((order) => order.status === 'pending').length).padStart(2, '0'),
      badge: 'Action Req.',
    },
  ];

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmerProducts'] });
    },
    onError: () => {
      useUIStore.getState().showNotification('Failed to delete product', 'error');
    }
  });
  return (
    <div className="dark bg-background text-on-surface min-h-screen font-body-md antialiased overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary-container/10 blur-[120px] rounded-full" />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar
          title="Farmer Dashboard"
          subtitle={user?.name || 'Farmer'}
          avatarSrc={user?.avatar}
          navItems={FARMER_NAV}
          ctaLabel="Add Product"
          ctaIcon="add"
          onCtaClick={() => navigate('/farmer/inventory')}
          iconNode={<span className="material-symbols-outlined text-primary">agriculture</span>}
        />

        {/* Top Header */}
        <header className="flex justify-between items-center px-6 py-4 fixed top-0 z-50 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md font-['Plus_Jakarta_Sans'] antialiased tracking-tight border-b border-white/20 shadow-xl ml-64 w-[calc(100%-16rem)]">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full bg-surface-container/50 border border-white/10 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:border-primary/50 text-body-md font-body-md"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">search</span>
          </div>
            <div className="flex items-center gap-6">
              <button className="relative text-slate-300 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
              </button>
              <button onClick={() => navigate('/cart')} className="text-slate-300 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">{user?.name}</span>
                  <button onClick={logout} className="px-4 py-2 text-slate-300 hover:text-white transition-colors">Logout</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => navigate('/login')} className="px-4 py-2 text-slate-300 hover:text-white transition-colors">Login</button>
                  <button onClick={() => navigate('/register')} className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg hover:brightness-110 transition-all">
                    Register
                  </button>
                </div>
              )}
            </div>
        </header>

        {/* Main Content */}
        <main className="ml-64 pt-24 pb-20 px-8 w-[calc(100%-16rem)]">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="font-h1 text-h1 text-on-surface mb-2">
              Grow your harvest, <span className="text-primary">{user?.name || 'Farmer'}.</span>
            </h1>
            <p className="text-slate-400 font-body-md">Your marketplace performance is looking healthy today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 perspective-container">
            {dashboardStats.map(({ icon, label, value, badge, badgeColor, iconBg }) => (
              <div
                key={label}
                className="bg-surface-container/40 backdrop-blur-md border border-white/10 p-6 rounded-[20px] hover:scale-105 transition-all duration-300 shadow-xl group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl transition-colors ${iconBg}`}>
                    <span
                      className="material-symbols-outlined material-fill"
                    >
                      {icon}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${badgeColor}`}>{badge}</span>
                </div>
                <p className="text-slate-400 text-sm uppercase tracking-widest font-label-sm">{label}</p>
                <h2 className="text-h2 font-h2 mt-1">{value}</h2>
              </div>
            ))}
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Products */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-h3 text-h3">My Product Listings</h3>
                <button
                  onClick={() => navigate('/farmer/inventory')}
                  className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  <div className="col-span-full py-10 text-center text-primary animate-pulse">Loading products...</div>
                ) : myProducts.length > 0 ? (
                  myProducts.map((p) => (
                  <div
                    key={p._id || p.id}
                    className="bg-surface-container/30 backdrop-blur-md border border-white/10 rounded-[20px] overflow-hidden hover:scale-[1.02] transition-all group"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={getImageSrc(p.image)}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute top-3 right-3 ${p.statusBg || (p.isApproved ? 'bg-primary-container/80' : 'bg-secondary-container/80')} backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {p.status || (p.isApproved ? 'Active' : 'Pending')}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className={`text-xs font-bold uppercase tracking-wider ${p.categoryColor || 'text-primary'}`}>{p.category}</p>
                          <h4 className="font-bold text-lg">{p.name}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[#fbbf24] font-black text-lg">Rs. {Number(p.price || 0).toFixed(2)}</p>
                          <p className="text-xs text-slate-400">per {p.unit || 'unit'}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-500 text-sm">inventory_2</span>
                          <span className="text-sm text-slate-300">{p.stock} in stock</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate('/farmer/inventory')}
                            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button 
                            onClick={() => useUIStore.getState().showConfirm({
                              title: 'Delete Product',
                              message: 'Are you sure you want to delete this product?',
                              confirmText: 'Delete',
                              cancelText: 'Cancel',
                              onConfirm: () => deleteMutation.mutate(p._id || p.id),
                            })}
                            className="p-2 hover:bg-error/20 rounded-lg text-error/80 transition-colors disabled:opacity-50"
                            disabled={deleteMutation.isPending}
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center text-slate-500">No products listed yet.</div>
                )}
              </div>
            </div>

            {/* Incoming Orders */}
            <div className="space-y-6">
              <h3 className="font-h3 text-h3">Incoming Orders</h3>
              <div className="bg-surface-container/30 backdrop-blur-md border border-white/10 rounded-[20px] p-6 space-y-4">
                {isOrdersLoading ? (
                  <div className="py-8 text-center text-primary animate-pulse">Loading orders...</div>
                ) : incomingOrders.length > 0 ? (
                  incomingOrders.map((o) => {
                    const itemCount = o.items?.reduce((sum, item) => sum + Number(item.quantity || 0), 0) || 0;
                    const orderTotal = o.items?.reduce((sum, item) => sum + Number(item.price || item.productId?.price || 0) * Number(item.quantity || 0), 0) || 0;
                    return (
                      <button
                        key={o._id || o.id}
                        onClick={() => navigate('/farmer/orders')}
                        className="w-full flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors text-left group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-white/5">
                          <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-bold text-sm">{o.consumerId?.name || 'Customer'}</p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${orderStatusClasses[o.status] || orderStatusClasses.pending}`}>
                              {o.status || 'pending'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{itemCount} item{itemCount === 1 ? '' : 's'} - Rs. {orderTotal.toFixed(2)}</p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-slate-500">No incoming orders yet.</div>
                )}
                <button
                  onClick={() => navigate('/farmer/orders')}
                  className="w-full py-3 mt-4 border border-white/10 rounded-xl text-slate-400 text-sm font-bold hover:bg-white/5 transition-colors"
                >
                  Manage All Orders
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating FAB */}
      <button
        onClick={() => navigate('/farmer/inventory')}
        className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50 group"
      >
        <span className="material-symbols-outlined text-4xl group-hover:rotate-90 transition-transform">add</span>
        <span className="absolute right-20 bg-primary-container text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Add New Listing
        </span>
      </button>

      <Footer sidebarOffset />
    </div>
  );
};

export default FarmerDashboard;
