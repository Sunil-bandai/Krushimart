import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score;
};

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
const strengthColors = ['', 'bg-error', 'bg-orange-500', 'bg-yellow-500', 'bg-primary', 'bg-green-500'];

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(formData.newPassword);

  const resetMutation = useMutation({
    mutationFn: (data) => api.post('/auth/reset-password', data),
    onSuccess: () => {
      setSuccess(true);
      setError('');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    resetMutation.mutate({ token, newPassword: formData.newPassword });
  };

  if (!token) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-lg">
          <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-md">
            <span className="material-symbols-outlined text-error text-3xl">link_off</span>
          </div>
          <h1 className="text-h2 font-h2 text-on-surface mb-xs">Invalid Reset Link</h1>
          <p className="text-body-md text-on-surface-variant mb-lg">
            This password reset link is invalid or missing a token.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-surface overflow-hidden min-h-screen">
      <main className="flex min-h-screen w-full overflow-hidden">
        {/* Left Panel: Branding */}
        <section className="hidden lg:flex lg:w-1/2 relative bg-surface-container-lowest items-center justify-center p-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-on-primary-fixed-variant via-surface-container-lowest to-surface-dim" />
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-container/20 rounded-full" style={{ filter: 'blur(40px)', zIndex: 0 }} />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-surface-tint/10 rounded-full" style={{ filter: 'blur(40px)', zIndex: 0 }} />

          <div className="relative z-10 flex flex-col items-start max-w-md">
            <div className="mb-lg">
              <span className="text-h1 font-h1 text-primary tracking-tighter">KrushiMart</span>
              <div className="h-1.5 w-24 bg-primary mt-xs rounded-full" />
            </div>
            <h2 className="text-h1 font-h1 text-on-surface mb-md">
              Create a Strong Password
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-lg">
              Your new password must be different from previously used passwords.
            </p>

            <div className="glass-panel bg-white/5 p-md rounded-xl shadow-2xl w-full">
              <h4 className="font-h3 text-body-lg text-on-surface mb-md">Password Requirements</h4>
              <div className="flex flex-col gap-sm text-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${formData.newPassword.length >= 8 ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    {formData.newPassword.length >= 8 ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  At least 8 characters
                </div>
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${/[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    {/[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  Upper and lowercase letters
                </div>
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${/\d/.test(formData.newPassword) ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    {/\d/.test(formData.newPassword) ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  At least one number
                </div>
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${/[^a-zA-Z0-9]/.test(formData.newPassword) ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    {/[^a-zA-Z0-9]/.test(formData.newPassword) ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  At least one special character
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-md lg:p-xl bg-surface relative overflow-y-auto">
          <div className="absolute top-md left-md lg:hidden">
            <span className="text-h3 font-h3 text-primary">KrushiMart</span>
          </div>

          <div className="w-full max-w-lg">
            <div className="mb-xl">
              <h1 className="text-h2 font-h2 text-on-surface">Reset Password</h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
                Create a new strong password for your account
              </p>
            </div>

            <div className="glass-panel bg-surface-container-low p-md lg:p-lg rounded-xl shadow-xl border-outline-variant/30">
              {error && (
                <div className="mb-md p-md bg-error/10 border border-error/20 text-error rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center py-lg">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-md">
                    <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-h3 font-h3 text-on-surface mb-xs">Password Reset Successful!</h3>
                  <p className="text-body-md text-on-surface-variant mb-lg">
                    Your password has been updated. You can now sign in with your new password.
                  </p>
                  <Link
                    to="/login"
                    className="inline-block w-full bg-primary text-on-primary font-h3 text-body-lg py-md rounded-lg shadow-lg shadow-primary/20 hover:bg-surface-tint transition-all active:scale-95 text-center"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <form className="space-y-md" onSubmit={handleSubmit}>
                  <div className="space-y-xs">
                    <label className="text-label-sm font-label-sm text-on-surface-variant px-xs">
                      New Password
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                        lock
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        required
                        minLength={8}
                        className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-xl text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none"
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
                    {formData.newPassword && (
                      <div className="mt-xs">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-surface-container-highest'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-on-surface-variant">
                          Strength: <span className="font-medium">{strengthLabels[strength] || 'Too short'}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-xs">
                    <label className="text-label-sm font-label-sm text-on-surface-variant px-xs">
                      Confirm New Password
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                        lock
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        minLength={8}
                        className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-xl text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none"
                      />
                    </div>
                    {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                      <p className="text-xs text-error mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">error</span>
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={resetMutation.isPending || !formData.newPassword || !formData.confirmPassword}
                    className="w-full bg-primary text-on-primary font-h3 text-body-lg py-md rounded-lg shadow-lg shadow-primary/20 hover:bg-surface-tint transition-all transform active:scale-95 duration-150 mt-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              )}

              {!success && (
                <div className="mt-lg pt-lg border-t border-outline-variant/20 text-center">
                  <p className="text-label-sm text-on-surface-variant">
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Back to Login
                    </Link>
                  </p>
                </div>
              )}
            </div>

            <p className="mt-xl text-center text-label-sm font-label-sm text-on-surface-variant/60 uppercase tracking-widest">
              © 2026 KRUSHIMART. FUTURE-FORWARD GROWTH.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
