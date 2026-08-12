import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Building,
  Clock,
  User,
  MessageSquare
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { siteSettings } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('SEO');
  const [message, setMessage] = useState('');

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          service_interest: service,
          message,
          source: 'Contact Page'
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#FF9933]" />
          <span>Get in Touch with SEO Experts</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A237E] tracking-tight">
          Contact Bharat SEO Agency
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Have a query about custom SEO campaigns, website development, or server deployment? Reach out to our senior strategist team.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Info & Office Addresses */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#1A237E]">Headquarters & Offices</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-[#FF9933] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A237E] text-sm">Headquarters & Office Address</p>
                  <p className="text-slate-600 leading-relaxed mt-1 whitespace-pre-line">{siteSettings.office_address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-[#FF9933] shrink-0" />
                <div>
                  <p className="font-bold text-[#1A237E] text-sm">Direct Phone Hotline</p>
                  <a href={`tel:${siteSettings.contact_phone}`} className="text-slate-600 hover:text-[#FF9933] transition">{siteSettings.contact_phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-[#FF9933] shrink-0" />
                <div>
                  <p className="font-bold text-[#1A237E] text-sm">Email Consultation</p>
                  <a href={`mailto:${siteSettings.contact_email}`} className="text-slate-600 hover:text-[#FF9933] transition">{siteSettings.contact_email}</a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${siteSettings.whatsapp_number}?text=Hi%20Bharat%20SEO,%20I%20want%20to%20discuss%20a%20project!`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Strategy Session</span>
              </a>
            </div>
          </div>

          {/* Map Graphic Preview */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-[#1A237E]">Google Map Location</h3>
            <div className="h-44 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')` }}></div>
              <MapPin className="w-8 h-8 text-[#FF9933] animate-bounce relative z-10" />
              <p className="text-xs font-bold text-[#1A237E] relative z-10 mt-2">{siteSettings.site_name} Headquarters</p>
              <p className="text-[10px] text-slate-500 relative z-10 line-clamp-2 max-w-xs">{siteSettings.office_address}</p>
            </div>
          </div>
        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
            <div>
              <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider">Free Enquiry</span>
              <h2 className="text-2xl font-black text-[#1A237E]">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500">Fill in your requirements below. Our lead strategist will reply within 2 hours.</p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-[#1A237E]">Enquiry Submitted Successfully!</h3>
                <p className="text-xs text-slate-600">
                  Thank you for reaching out. A Bharat SEO specialist will review your project details and contact you via phone or email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-xs rounded-full transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@company.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Service Interest *</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                  >
                    <option value="SEO">Search Engine Optimization (SEO)</option>
                    <option value="Web Development">Custom Web Development & E-Commerce</option>
                    <option value="PPC / Ads">Google Ads & Performance PPC</option>
                    <option value="Social Media">Social Media Growth & Meta Ads</option>
                    <option value="Hosting & Deployment">cPanel / LiteSpeed VPS Hosting</option>
                    <option value="Other">General Strategy Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Project Details / Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your website, business goals, or current traffic challenges..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Enquiry...' : 'Submit Project Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
