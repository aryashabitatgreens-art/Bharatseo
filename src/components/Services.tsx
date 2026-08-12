import React, { useState } from 'react';
import { Service, ServicePlan } from '../types';
import { 
  CheckCircle2, 
  Search, 
  TrendingUp, 
  Code, 
  Target, 
  Share2, 
  Server, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

interface ServicesProps {
  services: Service[];
  onBuyPlan: (service: Service, plan: ServicePlan) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onBuyPlan }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'SEO', 'Web Development', 'PPC / Ads', 'Social Media', 'Hosting & Deployment'];

  const filteredServices = services.filter((svc) => {
    const matchesCat = selectedCategory === 'All' || svc.category === selectedCategory;
    const matchesSearch = svc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          svc.short_desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const iconMap: Record<string, React.ReactNode> = {
    TrendingUp: <TrendingUp className="w-6 h-6 text-[#FF9933]" />,
    Code: <Code className="w-6 h-6 text-[#FF9933]" />,
    Target: <Target className="w-6 h-6 text-[#FF9933]" />,
    Share2: <Share2 className="w-6 h-6 text-[#FF9933]" />,
    Server: <Server className="w-6 h-6 text-[#FF9933]" />,
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Title */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#FF9933]" />
          <span>Transparent Pricing & Guaranteed Milestones</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A237E] tracking-tight">
          Services & Pricing Plans
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Select a package that fits your business scale. All orders receive dedicated account managers and real-time timeline tracking on your dashboard.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-[#1A237E] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
            />
          </div>
        </div>
      </div>

      {/* Services List with Pricing Plans */}
      <div className="max-w-6xl mx-auto space-y-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <p className="text-lg font-bold text-slate-700">No services match your filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs text-[#FF9933] underline font-semibold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-8 shadow-sm"
            >
              {/* Service Title & Info */}
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start border-b border-slate-100 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    {iconMap[svc.icon] || <TrendingUp className="w-6 h-6 text-[#FF9933]" />}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider">{svc.category}</span>
                    <h2 className="text-2xl font-black text-[#1A237E]">{svc.title}</h2>
                    <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Pricing Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {svc.plans.map((plan) => {
                  const isGrowth = plan.plan_name === 'Growth';
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-2xl p-6 border flex flex-col justify-between space-y-6 relative transition hover:-translate-y-1 ${
                        isGrowth
                          ? 'bg-blue-50/50 border-[#1A237E] shadow-md'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      {isGrowth && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF9933] text-white font-black text-[10px] uppercase px-3 py-0.5 rounded-full shadow">
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-extrabold text-[#1A237E]">{plan.plan_name} Plan</h3>
                          <p className="text-slate-500 text-xs">For growing enterprises</p>
                        </div>

                        <div className="py-2 border-y border-slate-100">
                          <div className="text-2xl sm:text-3xl font-black text-[#1A237E]">
                            ₹{plan.price.toLocaleString('en-IN')}
                          </div>
                          <span className="text-[11px] font-medium text-slate-500">
                            per {plan.billing_period}
                          </span>
                        </div>

                        {/* Feature List */}
                        <ul className="space-y-2 text-xs text-slate-600">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-tight">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Buy Button */}
                      <button
                        onClick={() => onBuyPlan(svc, plan)}
                        className={`w-full py-3 rounded-full font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm ${
                          isGrowth
                            ? 'bg-[#FF9933] hover:bg-orange-600 text-white'
                            : 'bg-[#1A237E] hover:bg-blue-900 text-white'
                        }`}
                      >
                        <span>Buy Plan Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
