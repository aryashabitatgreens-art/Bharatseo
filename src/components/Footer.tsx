import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Award,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { siteSettings } = useAuth();

  return (
    <footer className="bg-[#1A237E] text-slate-200 border-t border-blue-900">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: About Bharat SEO */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#FF9933] flex items-center justify-center text-white font-black text-lg shadow-sm">
                B
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                BHARAT<span className="text-[#FF9933]">SEO</span>
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {siteSettings.agency_tagline}. We combine strategic SEO, custom web engineering, performance marketing, and cloud infrastructure for Indian & global brands.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                <span>{siteSettings.office_address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF9933] shrink-0" />
                <a href={`tel:${siteSettings.contact_phone}`} className="hover:text-[#FF9933] transition">{siteSettings.contact_phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
                <a href={`mailto:${siteSettings.contact_email}`} className="hover:text-[#FF9933] transition">{siteSettings.contact_email}</a>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${siteSettings.whatsapp_number}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-900 pb-2">
              Our Services
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                'Search Engine Optimization (SEO)',
                'Custom Web Development',
                'E-Commerce Portals & Apps',
                'Google Ads & PPC Marketing',
                'Social Media Marketing & Reels',
                'Cloud Server & Security Setup'
              ].map((svc, i) => (
                <li key={i}>
                  <button 
                    onClick={() => setActiveTab('services')}
                    className="hover:text-[#FF9933] transition flex items-center gap-1 text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-[#FF9933]" />
                    <span>{svc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-900 pb-2">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'about', label: 'About Bharat SEO' },
                { id: 'portfolio', label: 'Case Studies & Results' },
                { id: 'career', label: 'Careers (We are Hiring!)' },
                { id: 'blog', label: 'SEO & Growth Blog' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'dashboard', label: 'Client Order Tracking' }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => setActiveTab(link.id)}
                    className="hover:text-[#FF9933] transition flex items-center gap-1 text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-[#FF9933]" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Trust & Guarantees */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-900 pb-2">
              Agency Standards
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-900 space-y-1">
                <p className="font-semibold text-[#FF9933] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Enterprise Data Protection
                </p>
                <p className="text-[11px] leading-tight text-slate-300">100% Data Privacy, SSL Encryption & High-Availability SLA Guarantee.</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-900 space-y-1">
                <p className="font-semibold text-white flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Razorpay Verified Checkout
                </p>
                <p className="text-[11px] leading-tight text-slate-300">Instant Indian UPI, NetBanking & Credit Card payments with GST Invoicing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-blue-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-300 gap-4">
          <p>© {new Date().getFullYear()} Bharat SEO Agency. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-300">
            <button onClick={() => setActiveTab('contact')} className="hover:text-[#FF9933] transition">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setActiveTab('contact')} className="hover:text-[#FF9933] transition">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#FF9933] transition">Client Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

