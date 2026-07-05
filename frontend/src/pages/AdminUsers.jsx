import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { ADMIN_NAV } from '../constants/dashboardNav';

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const showNotification = useUIStore((s) => s.showNotification);

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const response = await api.get('/admin/users');
      return response.data;
    }
  });

  const users = usersData?.data || usersData || [];

  const toggleUserMutation = useMutation({
    mutationFn: (id) => api.put(`/admin/users/${id}/toggle`),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['admin-analytics'] });
      const user = users.find(u => u._id === id);
      const newStatus = user?.isActive ? 'deactivated' : 'activated';
      showNotification(`${user?.name || 'User'} has been ${newStatus}`, 'success');
    },
    onError: () => {
      showNotification('Failed to update user status', 'error');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['admin-analytics'] });
      showNotification('User deleted successfully', 'success');
    },
    onError: () => {
      showNotification('Failed to delete user', 'error');
    }
  });

  const roleColors = {
    consumer: 'bg-blue-500/20 text-blue-500',
    farmer: 'bg-green-500/20 text-green-500',
    admin: 'bg-purple-500/20 text-purple-500'
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
          <div>
            <h1 className="font-h1 text-h1">Users</h1>
            <p className="text-on-surface-variant text-sm mt-1">{users.length} total users</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading...</div>
        ) : (
          <div className="glass-panel bg-surface-container/60 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-variant">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Joined</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-outline-variant hover:bg-surface-variant/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                          {u.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-label-sm font-bold ${roleColors[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${u.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={`text-sm font-medium ${u.isActive !== false ? 'text-green-500' : 'text-red-500'}`}>
                          {u.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant text-sm">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            const action = u.isActive !== false ? 'deactivate' : 'activate';
                            useUIStore.getState().showConfirm({
                              title: `${action === 'deactivate' ? 'Deactivate' : 'Activate'} User`,
                              message: `Are you sure you want to ${action} ${u.name}?`,
                              confirmText: action === 'deactivate' ? 'Deactivate' : 'Activate',
                              cancelText: 'Cancel',
                              onConfirm: () => toggleUserMutation.mutate(u._id),
                            });
                          }}
                          disabled={toggleUserMutation.isPending}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ${
                            u.isActive !== false
                              ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30'
                              : 'bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30'
                          }`}
                        >
                          {toggleUserMutation.isPending ? '...' : u.isActive !== false ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => {
                            useUIStore.getState().showConfirm({
                              title: 'Delete User',
                              message: `Are you sure you want to delete ${u.name}? This cannot be undone.`,
                              confirmText: 'Delete',
                              cancelText: 'Cancel',
                              onConfirm: () => deleteMutation.mutate(u._id),
                            });
                          }}
                          disabled={deleteMutation.isPending}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30 transition-all disabled:opacity-50"
                        >
                          {deleteMutation.isPending ? '...' : 'Delete'}
                        </button>
                      </div>
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

export default AdminUsers;
