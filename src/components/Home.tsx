import React from 'react';
import { 
  TrendingUp, 
  Code, 
  Target, 
  Share2, 
  Server, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Users, 
  Award, 
  ShieldCheck, 
  Sparkles,
  Zap,
  BarChart3,
  PhoneCall,
  MessageCircle,
  Clock,
  Layers
} from 'lucide-react';
import { Service, Blog, Testimonial } from '../types';

interface HomeProps {
  services: Service[];
  blogs: Blog[];
  testimonials: Testimonial[];
  setActiveTab: (tab: string) => void;
  onSelectService: (service: Service) => void;
  onOpenConsultation: () => void;
}

export const Home: React.FC<HomeProps> = ({
  services,
  blogs,
  testimonials,
  setActiveTab,
  onSelectService,
  onOpenConsultation,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    TrendingUp: <TrendingUp className="w-6 h-6 text-[#FF9933]" />,
    Code: <Code className="w-6 h-6 text-[#FF9933]" />,
    Target: <Target className="w-6 h-6 text-[#FF9933]" />,
    Share2: <Share2 className="w-6 h-6 text-[#FF9933]" />,
    Server: <Server className="w-6 h-6 text-[#FF9933]" />,
  };

  return (
    <div className="space-y-16 lg:space-y-24 bg-[#F8FAFC] text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-[#1A237E] text-white">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF9933]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#FF9933]/40 text-[#FF9933] text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-[#FF9933]" />
                <span>India's Premier Digital & Web Agency</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Grow Your Business Online with <span className="text-[#FF9933]">Bharat SEO</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We combine high-ROI Search Engine Optimization, custom web development, Meta/Google PPC ad campaigns, and cloud hosting deployment to generate predictable leads and sales for your brand.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('services')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-extrabold text-base shadow-lg shadow-orange-950/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Explore Services & Plans</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-5 h-5 text-[#FF9933]" />
                  <span>Free Consultation</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-200">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Guaranteed ROI Strategy</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Clock className="w-4 h-4 text-[#FF9933] shrink-0" />
                  <span>Live Order Timeline Tracking</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Google & Razorpay Verified</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Visual Card / Quick Quote Box */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-100 relative space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider">Live Agency Metrics</span>
                    <h2 className="text-xl font-bold text-[#1A237E]">Performance Overview</h2>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                </div>

                {/* Metric Bars */}
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 font-semibold">
                      <span>Organic Traffic Growth (Average Client)</span>
                      <span className="text-[#1A237E] font-bold">+340%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#FF9933] w-[85%] rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 font-semibold">
                      <span>Ad ROAS (Meta & Google PPC)</span>
                      <span className="text-[#1A237E] font-bold">5.8x</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#1A237E] w-[92%] rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-700 font-semibold">
                      <span>Client Retainership & Satisfaction</span>
                      <span className="text-[#1A237E] font-bold">99.2%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[99%] rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Order Button */}
                <div className="pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                    <p className="text-xs font-semibold text-slate-700">
                      Ready to boost your website ranking or launch a new project?
                    </p>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="w-full py-2.5 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs transition shadow-sm"
                    >
                      Instant Purchase via Razorpay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#1A237E]">1200+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">Projects Delivered</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#1A237E]">450+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">Active Business Clients</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#1A237E]">3 Years</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">Industry Mastery</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#FF9933]">99.4%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">Positive Client Rating</div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20">
            Our Core Specializations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A237E]">Full-Funnel Digital Services</h2>
          <p className="text-slate-600 text-sm">
            From dominating search engine rankings to building lightning-fast web applications and executing high-ROI advertising.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#FF9933] transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-[#FF9933]/15 transition">
                    {iconMap[svc.icon] || <TrendingUp className="w-6 h-6 text-[#FF9933]" />}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-[#1A237E]">
                    {svc.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1A237E] group-hover:text-[#FF9933] transition">
                    {svc.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2 line-clamp-3">
                    {svc.short_desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Plans starting at:</p>
                  <p className="text-lg font-black text-[#1A237E]">
                    ₹{svc.plans[0]?.price.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">/{svc.plans[0]?.billing_period}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectService(svc)}
                className="w-full py-3 rounded-full bg-[#1A237E] hover:bg-[#FF9933] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Plans & Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20">
              The Bharat SEO Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A237E]">Why Businesses Trust Bharat SEO</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A237E]">Data-Driven Approach</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                No guessing games. Every keyword strategy and ad campaign is backed by hard analytics and search volume metrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A237E]">Real-Time Order Tracking</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Log into your client dashboard anytime to monitor step-by-step milestone progress on your purchased services.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A237E]">Clean & Scalable Codebase</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                High-performance custom web applications engineered for speed, 95+ PageSpeed scores, and seamless mobile responsiveness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A237E]">Dedicated Account Manager</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Direct WhatsApp and phone line to senior strategists based in New Delhi & Bengaluru. No generic call center queues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A237E]">Loved by 450+ Business Owners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-4 flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF9933] text-[#FF9933]" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs leading-relaxed italic">
                  "{t.message}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={t.photo} alt={t.client_name} className="w-10 h-10 rounded-full object-cover border border-[#FF9933]/50" />
                <div>
                  <h3 className="text-sm font-bold text-[#1A237E]">{t.client_name}</h3>
                  <p className="text-[11px] text-slate-500">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST BLOG POSTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20">
              Agency Insights
            </span>
            <h2 className="text-3xl font-black text-[#1A237E] mt-2">Latest Marketing & Tech Blogs</h2>
          </div>
          <button
            onClick={() => setActiveTab('blog')}
            className="text-xs font-bold text-[#FF9933] hover:underline flex items-center gap-1"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((b) => (
            <div key={b.id} className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src={b.image} alt={b.title} className="w-full h-44 object-cover" />
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span className="font-bold text-[#FF9933] uppercase">{b.category}</span>
                    <span>{b.read_time}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1A237E] line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{b.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveTab('blog')}
                  className="text-xs font-semibold text-[#1A237E] hover:text-[#FF9933] flex items-center gap-1 transition"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1A237E] text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black">Ready to Supercharge Your Business Organic Reach?</h2>
            <p className="text-slate-200 text-sm">
              Purchase your service package today and watch live order status updates on your client dashboard!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('services')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-extrabold text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Select Plan & Buy Now</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur transition flex items-center justify-center gap-2 border border-white/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to SEO Specialist</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
