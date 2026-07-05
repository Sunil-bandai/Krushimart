import { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { FARMER_NAV } from '../constants/dashboardNav';
import { getImageSrc } from '../utils/imageUtils';

const initialProfileForm = {
  name: '',
  phone: '',
  address: '',
  avatar: '',
};

const initialPasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const FarmerSettings = () => {
  const navigate = useNavigate();
  const { user, token, login } = useAuthStore();
  const showNotification = useUIStore((state) => state.showNotification);
  const [profileForm, setProfileForm] = useState(initialProfileForm);
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [passwordError, setPasswordError] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef(null);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['farmerProfile'],
    queryFn: async () => {
      const response = await api.get('/users/profile');
      return response.data;
    },
  });

  const profile = profileData?.data || user || {};

  useEffect(() => {
    setProfileForm({
      name: profile.name || '',
      phone: profile.phone || '',
      address: profile.address || '',
      avatar: profile.avatar || '',
    });
  }, [profile.name, profile.phone, profile.address, profile.avatar]);

  const profileMutation = useMutation({
    mutationFn: async (data) => {
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        if (data.name) formData.append('name', data.name);
        if (data.phone) formData.append('phone', data.phone);
        if (data.address) formData.append('address', data.address);
        const response = await api.put('/users/profile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      }
      const response = await api.put('/users/profile', data);
      return response.data;
    },
    onSuccess: (data) => {
      login({ ...user, ...data.data, id: data.data?._id || data.data?.id }, token);
      setAvatarFile(null);
      setAvatarPreview('');
      showNotification('Settings saved', 'success');
    },
    onError: () => {
      showNotification('Could not save settings', 'error');
    },
  });

  const passwordMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put('/users/password', data);
      return response.data;
    },
    onSuccess: () => {
      setPasswordForm(initialPasswordForm);
      setPasswordError('');
      showNotification('Password updated', 'success');
    },
    onError: (error) => {
      setPasswordError(error.response?.data?.message || 'Could not update password');
    },
  });

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    profileMutation.mutate(profileForm);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    setPasswordError('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    passwordMutation.mutate({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <DashboardSidebar
        title="Farmer Dashboard"
        subtitle="Settings"
        avatarSrc={profile.avatar}
        navItems={FARMER_NAV}
        ctaLabel="Add Product"
        ctaIcon="add"
        onCtaClick={() => navigate('/farmer/inventory')}
      />

      <main className="ml-64 pt-20 pb-xl px-6">
        <div className="mb-xl">
          <h1 className="font-h1 text-h1 mb-2">Settings</h1>
          <p className="text-on-surface-variant">Manage your farmer profile and account access.</p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading settings...</div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section className="glass-panel bg-surface-container/60 rounded-xl p-6">
              <h2 className="font-h2 text-xl mb-6">Profile</h2>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <label className="block">
                  <span className="block text-label-sm text-on-surface-variant mb-2">Name</span>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>

                <label className="block">
                  <span className="block text-label-sm text-on-surface-variant mb-2">Phone</span>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(event) => setProfileForm({ ...profileForm, phone: event.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="block">
                  <span className="block text-label-sm text-on-surface-variant mb-2">Farm Address</span>
                  <textarea
                    value={profileForm.address}
                    onChange={(event) => setProfileForm({ ...profileForm, address: event.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </label>

                <label className="block">
                  <span className="block text-label-sm text-on-surface-variant mb-2">Profile Photo</span>
                  <div className="flex gap-3 items-start">
                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-1">cloud_upload</span>
                      <span className="text-sm text-on-surface-variant">
                        {avatarFile ? avatarFile.name : 'Click to upload photo'}
                      </span>
                      <span className="text-xs text-on-surface-variant/60 mt-1">JPG, PNG up to 5MB</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png,image/jpg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (avatarPreview && avatarPreview.startsWith('blob:')) {
                              URL.revokeObjectURL(avatarPreview);
                            }
                            setAvatarFile(file);
                            setAvatarPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                    {(avatarPreview || profileForm.avatar) && (
                      <img
                        src={avatarPreview || getImageSrc(profileForm.avatar)}
                        alt="Avatar preview"
                        className="w-20 h-20 object-cover rounded-xl border border-outline-variant"
                      />
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2">Or paste image URL:</p>
                  <input
                    type="url"
                    value={profileForm.avatar}
                    onChange={(event) => {
                      setProfileForm({ ...profileForm, avatar: event.target.value });
                      setAvatarFile(null);
                      setAvatarPreview(event.target.value);
                    }}
                    className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary mt-1"
                    placeholder="https://..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={profileMutation.isPending}
                  className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {profileMutation.isPending ? 'Saving...' : 'Save Settings'}
                </button>
              </form>
            </section>

            <section className="glass-panel bg-surface-container/60 rounded-xl p-6">
              <h2 className="font-h2 text-xl mb-6">Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <label className="block">
                  <span className="block text-label-sm text-on-surface-variant mb-2">Current Password</span>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>

                <label className="block">
                  <span className="block text-label-sm text-on-surface-variant mb-2">New Password</span>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                    required
                    minLength={6}
                  />
                </label>

                <label className="block">
                  <span className="block text-label-sm text-on-surface-variant mb-2">Confirm New Password</span>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                    required
                    minLength={6}
                  />
                </label>

                {passwordError && (
                  <p className="bg-error/10 border border-error/20 text-error rounded-xl p-3 text-sm">{passwordError}</p>
                )}

                <button
                  type="submit"
                  disabled={passwordMutation.isPending}
                  className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {passwordMutation.isPending ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FarmerSettings;
