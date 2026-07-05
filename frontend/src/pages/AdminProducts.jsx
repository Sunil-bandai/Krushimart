import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { ADMIN_NAV } from '../constants/dashboardNav';
import { getImageSrc } from '../utils/imageUtils';

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: async () => {
      const response = await api.get('/admin/products');
      return response.data;
    }
  });

  const products = productsData?.data || productsData || [];

  const approveMutation = useMutation({
    mutationFn: (id) => api.put(`/admin/products/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: () => {
      useUIStore.getState().showNotification('Failed to approve product', 'error');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: () => {
      useUIStore.getState().showNotification('Failed to delete product', 'error');
    }
  });

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <DashboardSidebar
        title="Admin Panel"
        subtitle={user?.name || 'Admin'}
        navItems={ADMIN_NAV}
        iconNode={<span className="material-symbols-outlined text-purple-500">admin_panel_settings</span>}
      />
      <main className="ml-64 pt-20 pb-xl px-6">
        <h1 className="font-h1 text-h1 mb-xl">Products</h1>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading...</div>
        ) : (
          <div className="glass-panel bg-surface-container/60 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-variant">
                <tr>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Farmer</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Approved</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-outline-variant">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={getImageSrc(product.image)}
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-on-surface-variant">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant">{product.farmer?.name}</td>
                    <td className="p-4">₹{product.price}</td>
                    <td className="p-4">
                      <span className={product.isApproved ? 'text-green-500' : 'text-yellow-500'}>
                        {product.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4">
                      {!product.isApproved && (
                        <button
                          onClick={() => approveMutation.mutate(product._id)}
                          className="text-primary hover:underline mr-3"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => {
                          useUIStore.getState().showConfirm({
                            title: 'Delete Product',
                            message: 'Are you sure you want to delete this product?',
                            confirmText: 'Delete',
                            cancelText: 'Cancel',
                            onConfirm: () => deleteMutation.mutate(product._id),
                          });
                        }}
                        className="text-error hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminProducts;