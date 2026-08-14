import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
  }
}

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    googleLogin, 
    register,
    siteSettings 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const gsiContainerRef = useRef<HTMLDivElement>(null);

  const clientId = siteSettings?.google_client_id || '102938475612-bharatseo.apps.googleusercontent.com';

  // Process Google ID token (JWT) returned by Google Identity Services
  const handleGoogleCredentialResponse = async (response: any) => {
    if (!response || !response.credential) return;
    setLoading(true);
    setError('');
    try {
      // Decode JWT token payload
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);

      if (payload && payload.email) {
        const gEmail = payload.email;
        const gName = payload.name || payload.given_name || gEmail.split('@')[0];
        const gPicture = payload.picture || '';

        const success = await googleLogin(gEmail, gName, gPicture);
        if (!success) {
          setError('Failed to authenticate with Google. Please try again.');
        }
      }
    } catch (err) {
      console.error('Google auth decoding error:', err);
      setError('Could not process Google Sign-In response.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize official Google Identity Services & Render Button
  useEffect(() => {
    if (!authModalOpen) return;

    const initGsi = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          if (gsiContainerRef.current) {
            gsiContainerRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(gsiContainerRef.current, {
              type: 'standard',
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              shape: 'pill',
              logo_alignment: 'left',
              width: 380,
            });
          }
        } catch (e) {
          console.warn('Google Identity initialization notice:', e);
        }
      }
    };

    // Retry if script still loading
    const timer = setTimeout(initGsi, 300);
    return () => clearTimeout(timer);
  }, [authModalOpen, authMode, clientId]);

  // Direct trigger for Google OAuth Popup (Token Flow)
  const triggerGoogleOAuthPopup = () => {
    setError('');
    
    if (window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              setLoading(true);
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userData = await res.json();
                if (userData && userData.email) {
                  await googleLogin(userData.email, userData.name || userData.email.split('@')[0], userData.picture);
                } else {
                  setError('Google account info could not be retrieved.');
                }
              } catch (fetchErr) {
                console.error('Userinfo error:', fetchErr);
                setError('Failed to fetch user profile from Google.');
              } finally {
                setLoading(false);
              }
            } else if (tokenResponse?.error) {
              setError(`Google Sign-In notice: ${tokenResponse.error}`);
            }
          },
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (oauthErr) {
        console.warn('OAuth tokenClient error:', oauthErr);
      }
    }

    // Fallback: Trigger Google GIS One-Tap prompt
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setError('Please click the official Google button above to proceed.');
        }
      });
    } else {
      setError('Google Sign-In service is initializing. Please wait a second and retry.');
    }
  };

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

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. AUTO GOOGLE SIGN-IN SECTION */}
        {authMode !== 'forgot' && (
          <div className="space-y-3">
            {/* Google Official Rendered Button Container */}
            <div className="flex justify-center w-full min-h-[44px]">
              <div ref={gsiContainerRef} className="w-full flex justify-center"></div>
            </div>

            {/* Direct Instant Google Popup Button */}
            <button
              type="button"
              onClick={triggerGoogleOAuthPopup}
              disabled={loading}
              className="w-full py-3 px-4 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-3 transition shadow-sm hover:shadow active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? 'Authenticating with Google...' : 'Instant Google One-Click Login'}</span>
            </button>

            <div className="relative flex items-center justify-center pt-1">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative z-10">Or with Email</span>
            </div>
          </div>
        )}

        {/* 2. STANDARD EMAIL & PASSWORD FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'register' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
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
                  placeholder="+91 95208 68276"
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
