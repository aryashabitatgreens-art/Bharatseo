import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Globe, 
  Search, 
  LayoutDashboard, 
  Layers, 
  Milestone, 
  Quote, 
  Info,
  Cpu,
  ShieldCheck,
  Server,
  Cloud,
  Code2
} from 'lucide-react';

export const FuturePlatformSection: React.FC = () => {
  const upcomingFeatures = [
    {
      icon: <FileText className="w-6 h-6 text-[#1A237E]" />,
      title: 'AI Resume Builder',
      description: 'Generate ATS-friendly resumes, improve content automatically, and export professional templates with AI assistance.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
    {
      icon: <Globe className="w-6 h-6 text-[#1A237E]" />,
      title: 'AI Website Generator',
      description: 'Create fast, responsive business websites with modern design, SEO optimization, and cloud-ready deployment.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
    {
      icon: <Search className="w-6 h-6 text-[#1A237E]" />,
      title: 'SEO Intelligence Suite',
      description: 'Automate keyword research, metadata generation, internal linking, and performance recommendations.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
    {
      icon: <LayoutDashboard className="w-6 h-6 text-[#1A237E]" />,
      title: 'Business Dashboard',
      description: 'Manage clients, projects, invoices, support, and growth analytics from a single workspace.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
  ];

  const techStack = [
    { name: 'Next.js', category: 'Frontend Framework' },
    { name: 'TypeScript', category: 'Type Safety' },
    { name: 'Node.js', category: 'Backend Runtime' },
    { name: 'PostgreSQL', category: 'Database Engine' },
    { name: 'AWS S3', category: 'Object Storage' },
    { name: 'CloudFront', category: 'Global CDN' },
    { name: 'SES', category: 'Email Automation' },
    { name: 'Lambda', category: 'Serverless Functions' },
    { name: 'Amazon Bedrock', category: 'Generative AI' },
  ];

  const roadmap = [
    { period: 'Q3 2026', milestone: 'Resume Builder MVP', status: 'Phase 1' },
    { period: 'Q4 2026', milestone: 'Website Generator Beta', status: 'Phase 2' },
    { period: 'Q1 2027', milestone: 'Business Dashboard', status: 'Phase 3' },
    { period: 'Q2 2027', milestone: 'Public Platform Launch', status: 'Target Launch' },
  ];

  return (
    <section id="future-platform" className="relative py-20 lg:py-28 bg-white border-y border-slate-200/70 overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1A237E] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse"></span>
            <span>Under Development • Public Launch 2027</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A237E] tracking-tight">
            Coming Soon: BharatSEO Platform
          </h2>

          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed">
            We are building a next-generation AI and cloud platform for Indian businesses, creators, students, and startups.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            BharatSEO is currently developing a suite of AI-powered tools designed to simplify website creation, resume generation, SEO automation, and business operations through a unified cloud platform.
          </p>
        </div>

        {/* 2. FOUR PREMIUM FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingFeatures.map((feat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_20px_rgba(26,35,126,0.04)] hover:shadow-[0_10px_30px_rgba(26,35,126,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center group-hover:bg-[#1A237E] group-hover:text-white transition-colors duration-300">
                    <span className="group-hover:text-white transition-colors">
                      {feat.icon}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${feat.badgeColor}`}>
                    {feat.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#1A237E]">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>Next-Gen Cloud Architecture</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3. TECHNOLOGY PREVIEW & ROADMAP (2-COLUMN GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Technology Preview Box */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-[24px] p-7 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100/60 text-[#1A237E]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#1A237E]">Technology Preview</h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The upcoming BharatSEO platform is being designed with a modern cloud architecture focused on performance, security, automation, and scalability.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/70 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Target Cloud & Stack Components
              </span>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs hover:border-[#1A237E] hover:text-[#1A237E] transition-colors"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Development Roadmap Box */}
          <div className="lg:col-span-6 bg-white rounded-[24px] p-7 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-100/60 text-[#FF9933]">
                  <Milestone className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#1A237E]">Development Roadmap</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                A staged rollout plan focused on delivering stable, audited, and resilient automation modules.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roadmap.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-blue-50/40 hover:border-blue-100 transition-colors"
                >
                  <span className="font-mono text-xs font-black text-[#1A237E] bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                    {item.period}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800">{item.milestone}</p>
                    <p className="text-[11px] text-slate-500">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. FOUNDER NOTE CARD */}
        <div className="bg-gradient-to-r from-blue-950 via-[#1A237E] to-blue-900 text-white rounded-[24px] p-7 sm:p-9 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FF9933] text-xs font-semibold">
              <Quote className="w-3.5 h-3.5" />
              <span>Founder Note</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              "We are building BharatSEO as a long-term technology platform, not just a service website. Our goal is to create practical AI and automation tools that help Indian businesses launch faster, grow online, and operate more efficiently."
            </h3>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-300">
              <span>BharatSEO Platform Core Team</span>
              <span className="text-[#FF9933] font-semibold">Engineering for India's Digital Economy</span>
            </div>
          </div>
        </div>

        {/* 5. FOOTER DISCLAIMER NOTE */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Features, integrations, and launch timelines may evolve during development.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
