import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, Mail, Key, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';

const AuthModal = () => {
  const { loginAdminUser, setIsAdminOpen, showToast } = usePortfolio();
  const [view, setView] = useState('login'); // 'login', 'forgot', 'reset'
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Status States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetData, setResetData] = useState(null); // { token, url }

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.loginAdmin(email, password);
      if (res.success && res.data) {
        loginAdminUser(res.data.token, res.data);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Check credentials or backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResetData(null);

    try {
      const res = await api.forgotPasswordAdmin(email);
      if (res.success) {
        setResetData({
          token: res.resetToken,
          url: res.resetUrl,
        });
        showToast('Password reset link generated!');
      }
    } catch (err) {
      setError(err.message || 'Could not send reset link. Ensure user email exists.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await api.resetPasswordAdmin(resetToken, password);
      if (res.success && res.data) {
        loginAdminUser(res.data.token, res.data);
        showToast('Password reset successful! You are now logged in.');
      }
    } catch (err) {
      setError(err.message || 'Password reset failed. Token might be expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-bg-card border border-border-color rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Modal Button */}
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-text-muted hover:text-text-main hover:bg-bg-base transition-colors"
        >
          ✕
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-3.5 rounded-2xl bg-primary/10 text-primary mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-text-main">
            {view === 'login' && 'Admin Studio Login'}
            {view === 'forgot' && 'Reset Password'}
            {view === 'reset' && 'Create New Password'}
          </h2>
          <p className="text-xs text-text-muted mt-1 max-w-xs">
            {view === 'login' && 'Sign in to access real-time customization and contact inbox.'}
            {view === 'forgot' && 'Enter your admin email to generate a secure recovery token.'}
            {view === 'reset' && 'Enter and confirm your new secure administrator password.'}
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ================= LOGIN VIEW ================= */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-text-muted">Password</label>
                <button
                  type="button"
                  onClick={() => { setView('forgot'); setError(null); }}
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? 'Signing In...' : 'Sign In to Studio'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Default Credentials Notice */}
            <div className="mt-6 p-3.5 rounded-2xl bg-bg-base/80 border border-border-color text-xs text-text-muted space-y-1">
              <div className="font-bold text-text-main flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Default Initial Setup Credentials:</span>
              </div>
              <div className="font-mono text-[11px]">
                Email: <span className="text-primary font-bold">admin@example.com</span>
              </div>
              <div className="font-mono text-[11px]">
                Password: <span className="text-primary font-bold">admin123</span>
              </div>
            </div>
          </form>
        )}

        {/* ================= FORGOT PASSWORD VIEW ================= */}
        {view === 'forgot' && (
          <div className="space-y-4">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Registered Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Generating Link...' : 'Send Password Reset Link'}
              </button>
            </form>

            {/* Simulated Email Delivery / Reset Link Banner */}
            {resetData && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Recovery Token Generated!</span>
                </div>
                <p className="text-[11px] text-emerald-500/90 leading-relaxed">
                  For your testing convenience without an SMTP email server, click the button below to jump directly to the password reset screen:
                </p>
                <button
                  onClick={() => {
                    setResetToken(resetData.token);
                    setView('reset');
                    setError(null);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Reset Password Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => { setView('login'); setError(null); setResetData(null); }}
              className="w-full py-2 text-xs font-semibold text-text-muted hover:text-text-main flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </div>
        )}

        {/* ================= RESET PASSWORD VIEW ================= */}
        {view === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Reset Recovery Token</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  required
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  placeholder="Paste reset token here..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-bg-base border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main text-sm focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? 'Updating Password...' : 'Save New Password & Login'}
            </button>

            <button
              type="button"
              onClick={() => { setView('login'); setError(null); }}
              className="w-full py-2 text-xs font-semibold text-text-muted hover:text-text-main flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default AuthModal;
