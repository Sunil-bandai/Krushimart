import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { FARMER_NAV } from '../constants/dashboardNav';

const FarmerAnalytics = () => {
  const { user } = useAuthStore();
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['farmerAnalytics'],
    queryFn: async () => {
      const response = await api.get('/farmer/analytics');
      return response.data;
    }
  });

  const analytics = analyticsData?.data || {};

  const stats = [
    { icon: 'inventory', label: 'Total Products', value: analytics.totalProducts || 0 },
    { icon: 'category', label: 'Total Stock', value: analytics.totalStock || 0 },
    { icon: 'shopping_cart', label: 'Total Orders', value: analytics.totalOrders || 0 },
    { icon: 'payments', label: 'Total Revenue', value: `₹${analytics.totalRevenue || 0}` },
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <DashboardSidebar
        title="Farmer Panel"
        subtitle={user?.name || 'Farmer'}
        navItems={FARMER_NAV}
        iconNode={<span className="material-symbols-outlined text-primary">agriculture</span>}
      />
      <main className="ml-64 pt-20 pb-xl px-6">
        <h1 className="font-h1 text-h1 mb-xl">Analytics</h1>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-xl">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-panel bg-surface-container/60 rounded-xl p-6">
                  <span className="material-symbols-outlined text-primary text-2xl mb-2">
                    {stat.icon}
                  </span>
                  <p className="text-label-sm text-on-surface-variant">{stat.label}</p>
                  <p className="font-h2 text-2xl">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel bg-surface-container/60 rounded-xl p-6">
              <h2 className="font-h2 text-xl mb-4">Sales Overview</h2>
              <p className="text-on-surface-variant">
                Sales charts and analytics visualizations will be displayed here.
              </p>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FarmerAnalytics;