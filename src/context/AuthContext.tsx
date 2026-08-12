import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SiteSettings } from '../types';

interface AuthContextType {
  user: User | null;
  siteSettings: SiteSettings;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  googleLogin: (email: string, name: string, photo?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  refreshSettings: () => Promise<void>;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register' | 'forgot';
  setAuthMode: (mode: 'login' | 'register' | 'forgot') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bharat_seo_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    site_name: 'Bharat SEO',
    agency_tagline: 'Empowering Indian & Global Businesses with Data-Driven Digital Growth',
    contact_email: 'contact@bharatseo.in',
    contact_phone: '+91 98765 43210',
    whatsapp_number: '919876543210',
    office_address: 'Bharat Tower, Connaught Place, New Delhi 110001',
    razorpay_key_id: 'rzp_test_BHARATSEO2026',
    google_client_id: '102938475612-bharatseo.apps.googleusercontent.com',
    smtp_host: 'smtp.bharatseo.in',
    smtp_user: 'noreply@bharatseo.in'
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  const refreshSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSiteSettings(data);
      }
    } catch (e) {
      console.error('Failed to fetch settings:', e);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bharat_seo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bharat_seo_user');
    }
  }, [user]);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        setAuthModalOpen(false);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (e) {
      return { success: false, error: 'Network error during login' };
    }
  };

  const googleLogin = async (email: string, name: string, photo?: string) => {
    try {
      const res = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, profile_photo: photo })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        setAuthModalOpen(false);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password: pass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        setAuthModalOpen(false);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (e) {
      return { success: false, error: 'Network error during registration' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        const data = await res.json();
        setSiteSettings(data.settings);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      siteSettings,
      login,
      googleLogin,
      register,
      logout,
      updateSettings,
      refreshSettings,
      authModalOpen,
      setAuthModalOpen,
      authMode,
      setAuthMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
