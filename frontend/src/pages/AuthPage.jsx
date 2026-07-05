import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAuthStore from '../store/authStore';

const AuthPage = ({ defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode); // 'login' | 'register'
  const [role, setRole] = useState('farmer'); // 'farmer' | 'consumer'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const loginMutation = useMutation({
    mutationFn: (data) => api.post('/auth/login', data),
    onSuccess: (response) => {
      const userData = response.data.data?.user || response.data.user;
      const token = response.data.data?.token || response.data.token;
      login(userData, token);
      if (userData?.role === 'farmer') navigate('/farmer');
      else if (userData?.role === 'admin') navigate('/admin');
      else navigate('/shop');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  });

  const registerMutation = useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
    onSuccess: () => {
      setMode('login');
      setError('');
      setError('Registration successful! Please login.');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'login') {
      loginMutation.mutate({ email: formData.email, password: formData.password });
    } else {
      registerMutation.mutate({ ...formData, role });
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface overflow-hidden min-h-screen">
      {/* Auth Split Screen */}
      <main className="flex min-h-screen w-full overflow-hidden">

        {/* ── Left Panel: Branding ── */}
        <section className="hidden lg:flex lg:w-1/2 relative bg-surface-container-lowest items-center justify-center p-xl overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-on-primary-fixed-variant via-surface-container-lowest to-surface-dim" />
          <div
            className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-container/20 rounded-full"
            style={{ filter: 'blur(40px)', zIndex: 0 }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-surface-tint/10 rounded-full"
            style={{ filter: 'blur(40px)', zIndex: 0 }}
          />

          {/* Branding Content */}
          <div className="relative z-10 flex flex-col items-start max-w-md">
            <div className="mb-lg">
              <span className="text-h1 font-h1 text-primary tracking-tighter">KrushiMart</span>
              <div className="h-1.5 w-24 bg-primary mt-xs rounded-full" />
            </div>
            <h2 className="text-h1 font-h1 text-on-surface mb-md">
              Empowering the Future of Agriculture.
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-lg">
              Experience a premium marketplace connecting local farmers directly to modern consumers
              through high-end digital commerce.
            </p>

            {/* Feature card */}
            <div className="perspective-container w-full">
              <div className="tilt-card glass-panel bg-white/5 p-md rounded-xl shadow-2xl">
                <div className="flex items-center gap-md mb-md">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">eco</span>
                  </div>
                  <div>
                    <h4 className="font-h3 text-body-lg text-on-surface">Sustainable Sourcing</h4>
                    <p className="text-label-sm text-on-surface-variant">Verified Organic Partners</p>
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-primary to-surface-tint shadow-[0_0_10px_rgba(98,223,125,0.5)]" />
                  </div>
                  <div className="flex justify-between text-label-sm text-on-surface-variant">
                    <span>Quality Index</span>
                    <span className="text-primary">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Right Panel: Auth Forms ── */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-md lg:p-xl bg-surface relative overflow-y-auto">
          {/* Mobile logo */}
          <div className="absolute top-md left-md lg:hidden">
            <span className="text-h3 font-h3 text-primary">KrushiMart</span>
          </div>

          <div className="w-full max-w-lg">
            {/* Tab switcher */}
            <div className="flex items-center justify-between mb-xl">
              <div>
                <h1 className="text-h2 font-h2 text-on-surface">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  {mode === 'login'
                    ? 'Enter your details to access your account'
                    : 'Join the KrushiMart community today'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-label-sm font-label-sm text-on-surface-variant block mb-xs">
                  {mode === 'login' ? 'New here?' : 'Already a member?'}
                </span>
                <button
                  className="text-label-sm font-label-sm text-primary hover:underline transition-all"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' ? 'Create Account' : 'Sign In'}
                </button>
              </div>
            </div>

            {/* Auth Form Card */}
            <div className="glass-panel bg-surface-container-low p-md lg:p-lg rounded-xl shadow-xl border-outline-variant/30">
              {/* Role Selector */}
              <div className="mb-lg">
                <label className="text-label-sm font-label-sm text-on-surface-variant block mb-xs">
                  Register as
                </label>
                <div className="grid grid-cols-2 gap-xs p-base bg-surface-container-highest rounded-lg">
                  <button
                    onClick={() => setRole('farmer')}
                    className={`font-label-sm py-xs rounded-lg shadow-sm transition-all ${
                      role === 'farmer'
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:bg-white/5'
                    }`}
                  >
                    Farmer
                  </button>
                  <button
                    onClick={() => setRole('consumer')}
                    className={`font-label-sm py-xs rounded-lg transition-all ${
                      role === 'consumer'
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:bg-white/5'
                    }`}
                  >
                    Consumer
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-md p-md bg-error/10 border border-error/20 text-error rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              <form className="space-y-md" onSubmit={handleSubmit}>
                {/* Full name – only on register */}
                {mode === 'register' && (
                  <div className="space-y-xs">
                    <label className="text-label-sm font-label-sm text-on-surface-variant px-xs">
                      Full Name
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                        person
                      </span>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required={mode === 'register'}
                        className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-on-surface-variant px-xs">
                    Email Address
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                      mail
                    </span>
                    <input
                      type="email"
                      placeholder="farmer@krushimart.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-on-surface-variant px-xs">
                    Password
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none"
                    />
                    <button
                      type="button"
                      className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Phone – only on register & farmer */}
                {mode === 'register' && role === 'farmer' && (
                  <div className="space-y-xs">
                    <label className="text-label-sm font-label-sm text-on-surface-variant px-xs">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                        phone
                      </span>
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Address – only on register & farmer */}
                {mode === 'register' && role === 'farmer' && (
                  <div className="space-y-xs">
                    <label className="text-label-sm font-label-sm text-on-surface-variant px-xs">
                      Farm Address
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                        location_on
                      </span>
                      <textarea
                        placeholder="Enter your farm address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows="2"
                        className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Remember / Forgot */}
                {mode === 'login' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-xs cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/20 transition-all"
                      />
                      <span className="text-label-sm font-label-sm text-on-surface-variant group-hover:text-on-surface">
                        Remember me
                      </span>
                    </label>
                    <Link to="/forgot-password" className="text-label-sm font-label-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Submit */}
                  <button
                    type="submit"
                    disabled={loginMutation.isPending || registerMutation.isPending}
                    className="w-full bg-primary text-on-primary font-h3 text-body-lg py-md rounded-lg shadow-lg shadow-primary/20 hover:bg-surface-tint transition-all transform active:scale-95 duration-150 mt-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loginMutation.isPending || registerMutation.isPending 
                      ? 'Processing...' 
                      : mode === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
              </form>

              {/* OAuth */}
              <div className="mt-lg pt-lg border-t border-outline-variant/20">
                <p className="text-center text-label-sm font-label-sm text-on-surface-variant mb-md">
                  Or continue with
                </p>
                <div className="grid grid-cols-2 gap-md">
                  <button className="flex items-center justify-center gap-xs bg-surface-container-highest border border-outline-variant/30 py-xs rounded-lg hover:bg-white/5 transition-all group">
                    <img
                      src="https://th.bing.com/th/id/OIP.HgH-NjiOdFOrkmwjsZCCfAHaHl?w=167&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="text-label-sm font-label-sm text-on-surface">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-xs bg-surface-container-highest border border-outline-variant/30 py-xs rounded-lg hover:bg-white/5 transition-all group">
                    <span className="material-symbols-outlined text-on-surface">ios</span>
                    <span className="text-label-sm font-label-sm text-on-surface">Apple ID</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer text */}
            <p className="mt-xl text-center text-label-sm font-label-sm text-on-surface-variant/60 uppercase tracking-widest">
              © 2026 KRUSHIMART. FUTURE-FORWARD GROWTH.
            </p>
          </div>
        </section>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 right-0 p-lg pointer-events-none opacity-10">
        <span className="text-[120px] font-black text-primary select-none">GROW</span>
      </div>
    </div>
  );
};

export default AuthPage;
