import React, { useState } from 'react';
import { Sparkles, TrendingUp, ArrowUpRight, BarChart3, CheckCircle2 } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const caseStudies = [
    {
      id: 'cs-1',
      client: 'Agarwal Healthcare Ltd., New Delhi',
      category: 'SEO',
      title: '350% Organic Search Growth for Regional Multi-Specialty Clinic',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      results: ['+350% Monthly Organic Traffic', '#1 Google Rank for 18 High-Intent Medical Keywords', '2.4x Doctor Appointment Conversions'],
      summary: 'Rebuilt website structure with Schema markup, optimized Google Business Profiles, and published authoritative local health content.'
    },
    {
      id: 'cs-2',
      client: 'SouthBites Foods, Bengaluru',
      category: 'Web Development',
      title: 'Custom Fast Ordering Portal & Order Management App',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      results: ['99+ Google PageSpeed Score', 'Razorpay Automated Checkout', 'Kitchen Staff Real-Time Order Screen'],
      summary: 'Developed a lightweight custom digital ordering portal with instant WhatsApp confirmation receipts and automated delivery tracking.'
    },
    {
      id: 'cs-3',
      client: 'Jaipur Crafts & Jewels',
      category: 'PPC / Ads',
      title: '6.4x ROAS on Meta & Google Shopping Campaigns',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      results: ['6.4x Return on Ad Spend (ROAS)', 'Over ₹1.2 Crore Revenue Generated in 90 Days', '42% Reduction in Cost Per Acquisition (CPA)'],
      summary: 'Implemented high-converting video carousel ad creatives targeting international NRI & domestic luxury jewelry buyers.'
    },
    {
      id: 'cs-4',
      client: 'Kaveri Logistics & Express',
      category: 'Hosting & Deployment',
      title: 'cPanel & LiteSpeed VPS Migration with Zero Downtime',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      results: ['0 Seconds Downtime During Migration', '65% Faster Page Load Speeds', 'Custom Socket SMTP Setup for Automated Ship Tracking'],
      summary: 'Migrated 4 legacy web applications to a LiteSpeed enterprise server with automated daily backups and SSL hardening.'
    }
  ];

  const categories = ['All', 'SEO', 'Web Development', 'PPC / Ads', 'Hosting & Deployment'];

  const filtered = filter === 'All' ? caseStudies : caseStudies.filter(c => c.category === filter);

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#FF9933]" />
          <span>Proven Results & Verified Data</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A237E] tracking-tight">
          Portfolio & Case Studies
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Discover how Bharat SEO delivers tangible revenue growth, search rankings, and engineering speed for our partners.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              filter === cat
                ? 'bg-[#1A237E] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((cs) => (
          <div key={cs.id} className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition">
            <div>
              <div className="relative overflow-hidden h-52">
                <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#1A237E] text-[#FF9933] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {cs.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{cs.client}</p>
                  <h2 className="text-xl font-bold text-[#1A237E] mt-1 group-hover:text-[#FF9933] transition">{cs.title}</h2>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{cs.summary}</p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <p className="text-xs font-extrabold text-[#FF9933] uppercase tracking-wider flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5" />
                    Key Results Achieved
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {cs.results.map((r, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
