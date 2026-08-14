import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Globe, 
  Search, 
  LayoutDashboard, 
  Milestone, 
  Quote, 
  Info,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Code2,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  Bot,
  Database,
  Cloud
} from 'lucide-react';

export const FuturePlatformSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const upcomingFeatures = [
    {
      id: 0,
      icon: <FileText className="w-6 h-6 text-[#1A237E]" />,
      title: 'AI Resume Builder',
      description: 'Generate ATS-friendly resumes, improve content automatically, and export professional templates with AI assistance.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/90',
      tag: 'GenAI & Parsing',
      highlights: ['ATS score scanner & live fixer', 'Contextual bullet point enhancer', 'One-click LaTeX & PDF exports'],
      previewType: 'resume'
    },
    {
      id: 1,
      icon: <Globe className="w-6 h-6 text-[#1A237E]" />,
      title: 'AI Website Generator',
      description: 'Create fast, responsive business websites with modern design, SEO optimization, and cloud-ready deployment.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/90',
      tag: 'Cloud & Static Gen',
      highlights: ['Semantic HTML & Schema.org auto-tagging', 'Sub-second Core Web Vitals performance', 'Instant CloudFront CDN deployment'],
      previewType: 'website'
    },
    {
      id: 2,
      icon: <Search className="w-6 h-6 text-[#1A237E]" />,
      title: 'SEO Intelligence Suite',
      description: 'Automate keyword research, metadata generation, internal linking, and performance recommendations.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/90',
      tag: 'Rank & Search Engine AI',
      highlights: ['Multilingual search intent clustering', 'Automated JSON-LD metadata generation', 'Rank volatility alerts & backlink tracking'],
      previewType: 'seo'
    },
    {
      id: 3,
      icon: <LayoutDashboard className="w-6 h-6 text-[#1A237E]" />,
      title: 'Business Dashboard',
      description: 'Manage clients, projects, invoices, support, and growth analytics from a single workspace.',
      status: 'In Development',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/90',
      tag: 'Unified SaaS Workspace',
      highlights: ['Multi-tenant GST invoice automation', 'Team task boards & client access portals', 'Real-time revenue & campaign analytics'],
      previewType: 'dashboard'
    },
  ];

  const techStack = [
    { name: 'Next.js', category: 'Frontend Framework', icon: <Code2 className="w-3.5 h-3.5" /> },
    { name: 'TypeScript', category: 'Type Safety', icon: <Terminal className="w-3.5 h-3.5" /> },
    { name: 'Node.js', category: 'Backend Runtime', icon: <Cpu className="w-3.5 h-3.5" /> },
    { name: 'PostgreSQL', category: 'Database Engine', icon: <Database className="w-3.5 h-3.5" /> },
    { name: 'AWS S3', category: 'Object Storage', icon: <Cloud className="w-3.5 h-3.5" /> },
    { name: 'CloudFront', category: 'Global CDN', icon: <Globe className="w-3.5 h-3.5" /> },
    { name: 'SES', category: 'Email Automation', icon: <Zap className="w-3.5 h-3.5" /> },
    { name: 'Lambda', category: 'Serverless Functions', icon: <Layers className="w-3.5 h-3.5" /> },
    { name: 'Amazon Bedrock', category: 'Generative AI', icon: <Bot className="w-3.5 h-3.5" /> },
  ];

  const roadmap = [
    { period: 'Q3 2026', milestone: 'Resume Builder MVP', status: 'Phase 1', progress: 'In Pipeline' },
    { period: 'Q4 2026', milestone: 'Website Generator Beta', status: 'Phase 2', progress: 'Architecture Design' },
    { period: 'Q1 2027', milestone: 'Business Dashboard', status: 'Phase 3', progress: 'System Integration' },
    { period: 'Q2 2027', milestone: 'Public Platform Launch', status: 'Target Launch', progress: 'General Availability' },
  ];

  return (
    <section id="future-platform" className="relative py-24 lg:py-32 bg-slate-50/50 border-y border-slate-200/80 overflow-hidden font-sans">
      
      {/* SaaS Ambient Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#1A237E 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-200/30 via-indigo-100/40 to-orange-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. HERO HEADER WITH SAAS CRAFT */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9933] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9933]"></span>
            </span>
            <span className="text-[#1A237E] font-bold text-xs tracking-wide">
              Under Development • Public Launch 2027
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A237E] tracking-tight leading-[1.15]">
            Coming Soon: <span className="bg-gradient-to-r from-[#1A237E] via-blue-900 to-[#FF9933] bg-clip-text text-transparent">BharatSEO Platform</span>
          </h2>

          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed">
            We are building a next-generation AI and cloud platform for Indian businesses, creators, students, and startups.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            BharatSEO is currently developing a suite of AI-powered tools designed to simplify website creation, resume generation, SEO automation, and business operations through a unified cloud platform.
          </p>
        </div>

        {/* 2. FOUR PREMIUM SAAS FEATURE CARDS WITH MICRO-INTERACTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingFeatures.map((feat) => {
            const isSelected = activeCard === feat.id;
            return (
              <div 
                key={feat.id}
                onClick={() => setActiveCard(feat.id)}
                className={`cursor-pointer rounded-[24px] p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-white border-2 border-[#1A237E] shadow-[0_12px_36px_rgba(26,35,126,0.12)] -translate-y-1.5' 
                    : 'bg-white/90 hover:bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(26,35,126,0.03)] hover:shadow-[0_10px_30px_rgba(26,35,126,0.08)] hover:-translate-y-1'
                }`}
              >
                {/* Top status & badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 border ${
                      isSelected 
                        ? 'bg-[#1A237E] text-white border-[#1A237E]' 
                        : 'bg-slate-50 text-[#1A237E] border-slate-200 group-hover:bg-[#1A237E] group-hover:text-white'
                    }`}>
                      {React.cloneElement(feat.icon, {
                        className: `w-6 h-6 transition-colors ${isSelected ? 'text-white' : 'text-[#1A237E] group-hover:text-white'}`
                      })}
                    </div>
                    
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200/90 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{feat.status}</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-[#1A237E]">
                        {feat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="pt-2 space-y-2 border-t border-slate-100 text-[11px] text-slate-600">
                    {feat.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span className="text-[#FF9933] font-bold">{feat.tag}</span>
                  <span className="flex items-center gap-1 group-hover:text-[#1A237E] transition-colors">
                    <span>Module Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. TECHNOLOGY PREVIEW & ROADMAP (SAAS BENTO GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Technology Preview Box */}
          <div className="lg:col-span-6 bg-white rounded-[24px] p-7 sm:p-9 border border-slate-200/90 shadow-[0_4px_24px_rgba(26,35,126,0.04)] space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#1A237E] flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1A237E]">Technology Preview</h3>
                    <span className="text-[11px] font-semibold text-slate-400">Enterprise Cloud Architecture</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  Target Stack
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The upcoming BharatSEO platform is being designed with a modern cloud architecture focused on performance, security, automation, and scalability.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>Core Frameworks & Cloud Services</span>
                <span>AWS & Next.js</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {techStack.map((tech, i) => (
                  <div 
                    key={i} 
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-200 text-xs font-semibold text-slate-700 hover:text-[#1A237E] transition-all"
                  >
                    <span className="text-slate-400">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Development Roadmap Box */}
          <div className="lg:col-span-6 bg-white rounded-[24px] p-7 sm:p-9 border border-slate-200/90 shadow-[0_4px_24px_rgba(26,35,126,0.04)] space-y-6 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#FF9933] flex items-center justify-center">
                    <Milestone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1A237E]">Development Roadmap</h3>
                    <span className="text-[11px] font-semibold text-slate-400">Execution Timeline</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1A237E] border border-blue-200 text-[10px] font-bold">
                  2026 - 2027
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                A staged rollout plan focused on delivering stable, audited, and resilient automation modules.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roadmap.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-start gap-3 hover:bg-white hover:border-[#1A237E]/40 hover:shadow-sm transition-all"
                >
                  <span className="font-mono text-xs font-black text-[#1A237E] bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs shrink-0">
                    {item.period}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800">{item.milestone}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-slate-500">{item.status}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-[#FF9933]">{item.progress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. FOUNDER NOTE CARD (PREMIUM DEEP INDIGO GRADIENT) */}
        <div className="bg-gradient-to-r from-[#0d1344] via-[#1A237E] to-[#121858] text-white rounded-[24px] p-8 sm:p-10 shadow-[0_16px_40px_rgba(26,35,126,0.18)] relative overflow-hidden border border-blue-800/50">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FF9933] text-xs font-bold backdrop-blur-xs">
              <Quote className="w-3.5 h-3.5" />
              <span>Founder Note</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug tracking-tight">
              "We are building BharatSEO as a long-term technology platform, not just a service website. Our goal is to create practical AI and automation tools that help Indian businesses launch faster, grow online, and operate more efficiently."
            </h3>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-black text-[#FF9933]">
                  B
                </div>
                <div>
                  <p className="font-bold text-white">BharatSEO Platform Core Team</p>
                  <p className="text-blue-200 text-[11px]">Next-Gen Platform Initiative</p>
                </div>
              </div>
              <span className="text-[#FF9933] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Engineering for India's Digital Economy
              </span>
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
