import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    googleLogin, 
    register 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googlePickerOpen, setGooglePickerOpen] = useState(false);
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

  const handleSelectGoogleAccount = async (gEmail: string, gName: string) => {
    setLoading(true);
    await googleLogin(gEmail, gName);
    setLoading(false);
    setGooglePickerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl relative animate-fadeIn">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1A237E] flex items-center justify-center text-[#FF9933] font-black text-2xl mx-auto shadow-sm">
            B
          </div>
          <h2 className="text-2xl font-black text-[#1A237E]">
            {authMode === 'login' && 'Welcome Back to Bharat SEO'}
            {authMode === 'register' && 'Create Your Client Account'}
            {authMode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {authMode === 'login' && 'Log in to track orders, download invoices, and manage tickets.'}
            {authMode === 'register' && 'Access live service timeline tracking and custom quotes.'}
            {authMode === 'forgot' && 'Enter your email to receive an instant verification OTP.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* GOOGLE LOGIN BUTTON */}
        {authMode !== 'forgot' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setGooglePickerOpen(true)}
              className="w-full py-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-3 transition shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative z-10">Or email</span>
            </div>
          </div>
        )}

        {/* GOOGLE ACCOUNT INPUT / PICKER */}
        {googlePickerOpen && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-[#1A237E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
                Google Account Sign-In
              </span>
              <button onClick={() => setGooglePickerOpen(false)} className="text-slate-500 text-xs hover:text-slate-700">Cancel</button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const gEmail = (form.elements.namedItem('gEmail') as HTMLInputElement).value;
              const gName = (form.elements.namedItem('gName') as HTMLInputElement).value;
              if (gEmail && gName) {
                handleSelectGoogleAccount(gEmail, gName);
              }
            }} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Google Email *</label>
                <input
                  name="gEmail"
                  type="email"
                  required
                  placeholder="user@gmail.com"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#FF9933]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  name="gName"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#FF9933]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition shadow-sm"
              >
                Continue with Google
              </button>
            </form>
          </div>
        )}

        {/* AUTH FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'register' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#FF9933]"
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                />
              </div>
            </div>
          )}

          {authMode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-700 font-semibold">Password *</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#FF9933] hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                />
              </div>
            </div>
          )}

          {otpSent && authMode === 'forgot' && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center space-y-1">
              <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
              <p>Password reset OTP sent to {email}!</p>
              <p className="text-[10px] text-slate-500">Check your inbox to complete reset.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs transition shadow-sm"
          >
            {loading ? 'Processing...' : (
              authMode === 'login' ? 'Sign In to Dashboard' :
              authMode === 'register' ? 'Create Account' : 'Send Reset Link'
            )}
          </button>
        </form>



        {/* Switch Auth Mode Toggle */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#FF9933] font-bold hover:underline"
              >
                Register Now
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#FF9933] font-bold hover:underline"
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
