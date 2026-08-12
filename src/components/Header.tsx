import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout, setAuthModalOpen, setAuthMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About Us' },
    { id: 'career', label: 'Careers' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-sm border-b border-slate-100">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1A237E] flex items-center justify-center text-[#FF9933] font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            <span className="font-extrabold">B</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-tight text-[#1A237E]">BHARAT</span>
              <span className="text-2xl font-black text-[#FF9933]">SEO</span>
            </div>
            <p className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">Digital & Web Deployment</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-[#1A237E] uppercase tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 transition-all ${
                  isActive
                    ? 'border-b-2 border-[#FF9933] text-[#FF9933] font-bold'
                    : 'text-[#1A237E] hover:text-[#FF9933]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full border border-slate-200 transition text-sm text-[#1A237E]"
              >
                <div className="w-7 h-7 rounded-full bg-[#1A237E] text-[#FF9933] flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                  {user.profile_photo ? (
                    <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <span className="font-bold text-[#1A237E] max-w-[120px] truncate">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-sm text-slate-700 animate-fadeIn"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-[#1A237E] truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FF9933]/15 text-[#FF9933]">
                      {user.role} Account
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#FF9933]" />
                    <span>My Dashboard & Orders</span>
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-[#1A237E] font-bold border-t border-slate-100"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
                      <span>Admin Control Panel</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      setActiveTab('home');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-rose-600 font-medium border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="bg-[#1A237E] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm"
              >
                Client Login
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="bg-[#FF9933] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full shadow-md shadow-orange-200 text-sm transition transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          {user && (
            <button
              onClick={() => setActiveTab(user.role === 'admin' ? 'admin' : 'dashboard')}
              className="p-1.5 rounded-full bg-[#FF9933]/15 text-[#FF9933] text-xs font-bold"
            >
              Dashboard
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#1A237E] hover:bg-slate-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-2 animate-slideDown shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition ${
                activeTab === link.id
                  ? 'bg-[#FF9933]/15 text-[#FF9933] font-bold'
                  : 'text-[#1A237E] hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-100 text-[#1A237E] font-bold flex items-center gap-2 text-sm"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#FF9933]" />
                  My Dashboard & Orders
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl bg-blue-50 text-[#1A237E] font-bold flex items-center gap-2 text-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
                    Admin Control Panel
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    setActiveTab('home');
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-rose-600 hover:bg-slate-50 flex items-center gap-2 text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-full bg-[#1A237E] text-white font-bold text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-full bg-[#FF9933] text-white font-bold text-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
