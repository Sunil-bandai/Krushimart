import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { ADMIN_NAV } from '../constants/dashboardNav';
import { getImageSrc } from '../utils/imageUtils';

const categoryColors = {
  Vegetables: '#62df7d',
  Fruits: '#3f88c5',
  Grains: '#fbbf24',
  Dairy: '#a78bfa',
  Spices: '#f87171',
  Other: '#94a3b8',
};

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics');
      return res.data.data;
    }
  });

  const { data: ordersData } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await api.get('/orders');
      return res.data.data || res.data;
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id) => api.put(`/admin/products/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-analytics'] });
    },
    onError: () => {
      useUIStore.getState().showNotification('Failed to approve product', 'error');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-analytics'] });
    },
    onError: () => {
      useUIStore.getState().showNotification('Failed to delete product', 'error');
    }
  });

  const a = analyticsData || {};
  const categories = a.categoryData || [];
  const totalCatCount = categories.reduce((sum, c) => sum + c.count, 0);
  const recentUsers = a.recentUsers || [];
  const pendingProducts = a.pendingProductList || [];
  const orders = Array.isArray(ordersData) ? ordersData : [];

  const stats = [
    {
      icon: 'payments',
      label: 'Total Revenue',
      value: `₹${(a.totalRevenue || 0).toLocaleString()}`,
      badge: `${a.totalOrders || 0} orders`,
      borderColor: 'border-l-4 border-primary',
      iconBg: 'bg-primary/10 text-primary',
    },
    {
      icon: 'groups',
      label: 'Total Users',
      value: (a.totalUsers || 0).toLocaleString(),
      badge: `${a.totalFarmers || 0} farmers`,
      borderColor: 'border-l-4 border-tertiary-container',
      iconBg: 'bg-tertiary-container/10 text-tertiary-container',
    },
    {
      icon: 'package_2',
      label: 'Total Products',
      value: (a.totalProducts || 0).toLocaleString(),
      badge: `${a.pendingProducts || 0} pending`,
      borderColor: 'border-l-4 border-secondary',
      iconBg: 'bg-secondary/10 text-secondary',
    },
    {
      icon: 'trending_up',
      label: 'Approved Products',
      value: (a.approvedProducts || 0).toLocaleString(),
      badge: `${a.totalProducts ? Math.round((a.approvedProducts / a.totalProducts) * 100) : 0}% approved`,
      borderColor: 'border-l-4 border-surface-tint',
      iconBg: 'bg-surface-tint/10 text-surface-tint',
    },
  ];

  const orderStatusCounts = { pending: 0, confirmed: 0, dispatched: 0, delivered: 0 };
  orders.forEach(o => { if (orderStatusCounts[o.status] !== undefined) orderStatusCounts[o.status]++; });
  const maxStatus = Math.max(...Object.values(orderStatusCounts), 1);

  return (
    <div className="dark bg-surface text-on-surface min-h-screen font-body-md antialiased overflow-x-hidden">
      <div className="flex min-h-screen">
        <DashboardSidebar
          title="Admin Panel"
          subtitle={user?.name || 'Admin'}
          navItems={ADMIN_NAV}
          iconNode={<span className="material-symbols-outlined text-purple-500">admin_panel_settings</span>}
        />

        <main className="ml-64 pt-28 px-8 pb-12 min-h-screen bg-surface w-[calc(100%-16rem)]">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="font-h1 text-h2 text-on-surface mb-2">Overview</h1>
              <p className="text-on-surface-variant font-body-md">
                Manage your agricultural ecosystem and monitor marketplace health.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          {analyticsLoading ? (
            <div className="text-center py-10 text-primary animate-pulse">Loading analytics...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map(({ icon, label, value, badge, borderColor, iconBg }) => (
                  <div key={label} className={`glass-panel p-6 rounded-2xl bg-surface-container hover:scale-[1.02] transition-transform duration-300 ${borderColor}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${iconBg}`}>
                        <span className="material-symbols-outlined">{icon}</span>
                      </div>
                    </div>
                    <h3 className="text-on-surface-variant text-label-sm uppercase mb-1">{label}</h3>
                    <p className="text-h3 font-h2 text-on-surface">{value}</p>
                    <p className="text-xs text-on-surface-variant mt-2">{badge}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Order Status Bar Chart */}
                <div className="lg:col-span-2 glass-panel p-8 rounded-2xl bg-surface-container h-[360px] flex flex-col">
                  <h3 className="font-h3 text-on-surface mb-6">Order Status Distribution</h3>
                  <div className="flex-1 flex items-end gap-6 px-4 pb-8">
                    {Object.entries(orderStatusCounts).map(([status, count]) => (
                      <div key={status} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-sm font-bold text-on-surface">{count}</span>
                        <div className="w-full rounded-t-lg transition-all duration-500" style={{
                          height: `${(count / maxStatus) * 200}px`,
                          backgroundColor: status === 'pending' ? '#fbbf24' : status === 'confirmed' ? '#3f88c5' : status === 'dispatched' ? '#f97316' : '#62df7d'
                        }} />
                        <span className="text-xs text-on-surface-variant capitalize">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Pie Chart */}
                <div className="glass-panel p-8 rounded-2xl bg-surface-container h-[360px] flex flex-col items-center">
                  <h3 className="font-h3 text-on-surface self-start mb-6">Category Distribution</h3>
                  <div className="relative w-44 h-44 mb-6">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {categories.reduce((acc, cat, i) => {
                        const pct = totalCatCount > 0 ? (cat.count / totalCatCount) * 251.2 : 0;
                        acc.elements.push(
                          <circle key={cat._id} cx="50" cy="50" fill="transparent" r="40"
                            stroke={categoryColors[cat._id] || '#94a3b8'}
                            strokeDasharray={`${pct} ${251.2 - pct}`}
                            strokeDashoffset={-acc.offset}
                            strokeWidth="20" />
                        );
                        acc.offset += pct;
                        return acc;
                      }, { elements: [], offset: 0 }).elements}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-h3 font-h2 text-on-surface">{totalCatCount}</span>
                      <span className="text-[10px] text-on-surface-variant uppercase">Products</span>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <div key={cat._id} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoryColors[cat._id] || '#94a3b8' }} />
                        <span className="text-xs text-on-surface-variant">{cat._id || 'Unknown'}</span>
                        <span className="text-xs text-on-surface-variant ml-auto">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-h3 text-on-surface">Recent Users</h3>
                  <button onClick={() => navigate('/admin/users')} className="text-primary text-label-sm font-bold hover:underline">View All Users</button>
                </div>
                <div className="glass-panel overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/30">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/30 bg-white/5">
                        <th className="px-6 py-4 text-label-sm text-slate-400 font-medium">User</th>
                        <th className="px-6 py-4 text-label-sm text-slate-400 font-medium">Role</th>
                        <th className="px-6 py-4 text-label-sm text-slate-400 font-medium">Status</th>
                        <th className="px-6 py-4 text-label-sm text-slate-400 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {recentUsers.map((u) => (
                        <tr key={u._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                {u.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <div className="text-on-surface font-semibold text-body-md">{u.name}</div>
                                <div className="text-slate-500 text-xs">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-widest ${u.role === 'admin' ? 'bg-error/10 text-error border border-error/20' : u.role === 'farmer' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary-container/20 text-secondary border border-secondary/20'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${u.isActive !== false ? 'bg-primary' : 'bg-slate-500'}`} />
                              <span className="text-on-surface text-sm">{u.isActive !== false ? 'Active' : 'Inactive'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending Products */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-h3 text-on-surface">Pending Products</h3>
                  {a.pendingProducts > 0 && (
                    <span className="px-2 py-1 bg-tertiary-container/20 text-tertiary-container text-[10px] font-bold rounded border border-tertiary-container/30">
                      {a.pendingProducts} PENDING
                    </span>
                  )}
                </div>
                {pendingProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pendingProducts.map((p) => (
                      <div key={p._id} className="glass-panel p-4 rounded-2xl bg-surface-container flex gap-4">
                        <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                          <img src={getImageSrc(p.image)} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-body-lg font-h3 text-on-surface leading-tight">{p.name}</h4>
                              <p className="text-xs text-slate-500">By {p.farmer?.name || 'Farmer'}</p>
                            </div>
                            <span className="text-primary font-bold">₹{p.price}</span>
                          </div>
                          <div className="flex gap-3 mt-4">
                            <button onClick={() => approveMutation.mutate(p._id)} className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition-all" disabled={approveMutation.isPending}>
                              Approve
                            </button>
                            <button onClick={() => useUIStore.getState().showConfirm({
                              title: 'Reject Product',
                              message: 'Are you sure you want to reject this product?',
                              confirmText: 'Reject',
                              cancelText: 'Cancel',
                              onConfirm: () => deleteMutation.mutate(p._id),
                            })} className="flex-1 py-2 border border-error/30 text-error rounded-lg text-xs font-bold hover:bg-error/10 transition-all">
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel p-8 rounded-2xl bg-surface-container text-center text-on-surface-variant">
                    No pending products to review.
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      <Footer sidebarOffset />
    </div>
  );
};

export default AdminDashboard;
