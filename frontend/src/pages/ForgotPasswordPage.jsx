import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const forgotMutation = useMutation({
    mutationFn: (data) => api.post('/auth/forgot-password', data),
    onSuccess: () => {
      setSent(true);
      setError('');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    forgotMutation.mutate({ email });
  };

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
              Secure Password Recovery
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-lg">
              We'll help you get back into your account safely. Your security is our priority.
            </p>

            <div className="glass-panel bg-white/5 p-md rounded-xl shadow-2xl w-full">
              <div className="flex items-center gap-md mb-md">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">shield</span>
                </div>
                <div>
                  <h4 className="font-h3 text-body-lg text-on-surface">Password History Check</h4>
                  <p className="text-label-sm text-on-surface-variant">Your new password cannot match recent ones</p>
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-primary to-surface-tint shadow-[0_0_10px_rgba(98,223,125,0.5)]" />
                </div>
                <div className="flex justify-between text-label-sm text-on-surface-variant">
                  <span>Last 5 passwords checked</span>
                  <span className="text-primary">Active</span>
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
              <Link to="/login" className="inline-flex items-center gap-xs text-label-sm font-label-sm text-primary hover:underline mb-lg">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Login
              </Link>
              <h1 className="text-h2 font-h2 text-on-surface">Forgot Password?</h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <div className="glass-panel bg-surface-container-low p-md lg:p-lg rounded-xl shadow-xl border-outline-variant/30">
              {error && (
                <div className="mb-md p-md bg-error/10 border border-error/20 text-error rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              {sent ? (
                <div className="text-center py-lg">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-md">
                    <span className="material-symbols-outlined text-primary text-3xl">mark_email_read</span>
                  </div>
                  <h3 className="text-h3 font-h3 text-on-surface mb-xs">Check Your Email</h3>
                  <p className="text-body-md text-on-surface-variant mb-lg">
                    We've sent a password reset link to <strong className="text-on-surface">{email}</strong>
                  </p>
                  <div className="bg-surface-container-highest rounded-lg p-md mb-lg text-left">
                    <p className="text-label-sm text-on-surface-variant mb-xs">Didn't receive the email?</p>
                    <ul className="text-sm text-on-surface-variant space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs text-primary">check</span>
                        Check your spam/junk folder
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs text-primary">check</span>
                        Make sure the email is correct
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs text-primary">check</span>
                        Wait a few minutes and try again
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => { setSent(false); setEmail(''); }}
                    className="w-full bg-primary text-on-primary font-h3 text-body-lg py-md rounded-lg shadow-lg shadow-primary/20 hover:bg-surface-tint transition-all active:scale-95"
                  >
                    Send Again
                  </button>
                </div>
              ) : (
                <form className="space-y-md" onSubmit={handleSubmit}>
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
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotMutation.isPending}
                    className="w-full bg-primary text-on-primary font-h3 text-body-lg py-md rounded-lg shadow-lg shadow-primary/20 hover:bg-surface-tint transition-all transform active:scale-95 duration-150 mt-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {forgotMutation.isPending ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              )}

              {!sent && (
                <div className="mt-lg pt-lg border-t border-outline-variant/20 text-center">
                  <p className="text-label-sm text-on-surface-variant">
                    Remember your password?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign In
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

export default ForgotPasswordPage;
