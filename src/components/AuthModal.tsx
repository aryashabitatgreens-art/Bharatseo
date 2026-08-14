import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    register 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        const res = await login(email, password);
        if (!res.success) setError(res.error || 'Login failed');
      } else if (authMode === 'register') {
        const res = await register(name, email, phone, password);
        if (!res.success) setError(res.error || 'Registration failed');
      } else if (authMode === 'forgot') {
        setOtpSent(true);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1A237E] flex items-center justify-center text-[#FF9933] font-black text-2xl mx-auto shadow-md border-2 border-orange-100">
            B
          </div>
          <h2 className="text-2xl font-black text-[#1A237E]">
            {authMode === 'login' && 'Welcome Back to Bharat SEO'}
            {authMode === 'register' && 'Create Client Account'}
            {authMode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {authMode === 'login' && 'Sign in to access live campaign stats, rankings, and invoices.'}
            {authMode === 'register' && 'Instant access to client dashboard, reporting, and 24/7 dedicated support.'}
            {authMode === 'forgot' && 'Enter your registered email to receive a password reset OTP.'}
          </p>
        </div>

        {/* Mode Selector Tabs (Sign In vs Create Account) */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
          <button 
            type="button" 
            onClick={() => { setAuthMode('login'); setError(''); }} 
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${authMode === 'login' ? 'bg-white text-[#1A237E] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Sign In
          </button>
          <button 
            type="button" 
            onClick={() => { setAuthMode('register'); setError(''); }} 
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${authMode === 'register' ? 'bg-white text-[#1A237E] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Register Free
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STANDARD EMAIL & PASSWORD FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'register' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white transition text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white transition text-xs"
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">WhatsApp / Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white transition text-xs"
                />
              </div>
            </div>
          )}

          {authMode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-slate-700 font-bold">Password *</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#FF9933] hover:underline font-bold"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3 py-3 text-slate-800 focus:outline-none focus:border-[#FF9933] focus:bg-white transition text-xs"
                />
              </div>
            </div>
          )}

          {otpSent && authMode === 'forgot' && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center space-y-1 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
              <p>Password reset OTP sent to <strong>{email}</strong>!</p>
              <p className="text-[11px] text-slate-500 font-normal">Check your inbox to complete password reset.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs transition shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              authMode === 'login' ? 'Sign In to Dashboard' :
              authMode === 'register' ? 'Create Client Account' : 'Send Password Reset Link'
            )}
          </button>
        </form>

        {/* Mode Switch Footer */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#FF9933] font-bold hover:underline"
              >
                Register Free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#1A237E] font-bold hover:underline"
              >
                Sign In Here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
