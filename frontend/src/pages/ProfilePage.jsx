import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getImageSrc } from '../utils/imageUtils';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, token } = useAuthStore();
  const fileInputRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const { data: profileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await api.get('/users/profile');
      return response.data;
    },
    enabled: isAuthenticated,
  });

  const profile = profileData?.data || user || {};

  useEffect(() => {
    if (profile.name) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
    }
  }, [profile.name, profile.phone, profile.address]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      if (avatarFile) {
        const fd = new FormData();
        fd.append('avatar', avatarFile);
        fd.append('name', data.name);
        fd.append('phone', data.phone);
        fd.append('address', data.address);
        const response = await api.put('/users/profile', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      }
      const response = await api.put('/users/profile', data);
      return response.data;
    },
    onSuccess: (data) => {
      setMessage('Profile updated successfully!');
      setAvatarFile(null);
      setAvatarPreview('');
      login({ ...user, ...data.data, id: data.data?._id || data.data?.id }, token);
      setTimeout(() => setMessage(''), 3000);
    },
    onError: () => {
      setMessage('Failed to update profile');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    updateMutation.mutate(formData);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-background text-on-surface min-h-screen">
        <Navbar />
        <div className="pt-32 pb-xl px-6 max-w-container-max mx-auto text-center">
          <h1 className="font-h1 text-h1 mb-lg">Login Required</h1>
          <button onClick={() => navigate('/login')} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold">
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
        <h1 className="font-h1 text-h1 mb-xl text-center">My Profile</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="glass-panel bg-surface-container/60 rounded-xl p-6">
            <div className="flex items-center gap-6 mb-xl">
              <label className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center overflow-hidden border-2 border-outline-variant group-hover:border-primary transition-colors">
                  {(avatarPreview || profile.avatar) ? (
                    <img
                      src={avatarPreview || getImageSrc(profile.avatar)}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <span
                    className="text-3xl font-bold text-on-primary"
                    style={(avatarPreview || profile.avatar) ? { display: 'none' } : { display: 'flex' }}
                  >
                    {profile.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
                </div>
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
              <div>
                <h2 className="font-h2 text-xl">{profile.name}</h2>
                <p className="text-on-surface-variant">{profile.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary/20 text-primary rounded-full text-label-sm capitalize">
                  {profile.role}
                </span>
                {avatarFile && (
                  <p className="text-xs text-primary mt-1">New photo selected - click Save to upload</p>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>
              
              {message && (
                <div className={`p-3 rounded-xl ${message.includes('success') ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {message}
                </div>
              )}
              
              <button 
                type="submit"
                disabled={updateMutation.isPending}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
