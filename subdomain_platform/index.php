<?php
/**
 * BharatSEO Platform — Master Portal for Subdomain (platform.bharatseo.site)
 * Next-Gen AI & Cloud Platform for Indian Businesses & Professionals
 */
require_once __DIR__ . '/config.php';

// Fetch dynamic roadmap if DB is ready, or use structured fallback
$db = get_platform_db();
$milestones = [];
if ($db) {
    try {
        $stmt = $db->query("SELECT * FROM platform_roadmap_milestones ORDER BY display_order ASC");
        $milestones = $stmt->fetchAll();
    } catch (Exception $e) {
        $milestones = [];
    }
}

// Default milestones fallback
if (empty($milestones)) {
    $milestones = [
        [
            'quarter_tag' => 'Q3 2026',
            'phase_title' => 'Phase 1: Foundation & AI Resume Engine',
            'headline' => 'AI Resume Builder MVP & ATS Scoring Sandbox',
            'detailed_description' => 'Initial rollout of our contextual parser and LaTeX formatting engine tailored for Indian engineering students, corporate job seekers, and recruiters.',
            'deliverables' => "Contextual parser engine\nATS scoring algorithm (0-100)\nLaTeX & PDF template generator\nLinkedIn data importer\nReal-time keyword gap analyzer",
            'target_date' => 'July - September 2026',
            'status' => 'in_pipeline'
        ],
        [
            'quarter_tag' => 'Q4 2026',
            'phase_title' => 'Phase 2: High-Speed Web Generation',
            'headline' => 'AI Website Generator Beta & Edge Hosting Engine',
            'detailed_description' => 'Automated headless static and dynamic web generation engine with native Schema.org integration and sub-second AWS CloudFront edge deployment.',
            'deliverables' => "Next.js 15 site compiler\nAutomatic Schema.org structured data\nInstant AWS CloudFront edge publishing\nBuilt-in lead capture & CRM webhooks\nMobile-first Core Web Vitals 99+ guarantee",
            'target_date' => 'October - December 2026',
            'status' => 'architecture_design'
        ],
        [
            'quarter_tag' => 'Q1 2027',
            'phase_title' => 'Phase 3: Unified Enterprise Workspace',
            'headline' => 'Business Dashboard & Client Management System',
            'detailed_description' => 'All-in-one operations hub for Indian MSMEs and agencies featuring automated GST billing, Kanban task boards, client portals, and performance reports.',
            'deliverables' => "GST-compliant invoice generator with Razorpay webhooks\nClient collaboration workspace\nAutomated monthly SEO performance reports\nRole-based access control (RBAC)\nTeam time-tracking & file lockers",
            'target_date' => 'January - March 2027',
            'status' => 'planned'
        ],
        [
            'quarter_tag' => 'Q2 2027',
            'phase_title' => 'Phase 4: Public General Availability',
            'headline' => 'SEO Intelligence Suite & Public Platform Launch',
            'detailed_description' => 'The full general availability launch of BharatSEO Platform uniting all modules under unified subscription, single sign-on, and real-time rank tracking.',
            'deliverables' => "BharatSEO Unified Single Sign-On (SSO)\nAutomated SERP intent clustering\nProgrammatic JSON-LD metadata generation\nDeveloper REST & GraphQL APIs\n24/7 Priority Indian Cloud Infrastructure",
            'target_date' => 'April - June 2027',
            'status' => 'planned'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BharatSEO Platform — Next-Gen AI & Cloud Platform (Coming 2027)</title>
  
  <!-- Meta & SEO Tags -->
  <meta name="description" content="BharatSEO is developing a next-generation AI and cloud platform for Indian businesses, creators, students, and startups. Explore our 4 core modules, technology architecture, and development roadmap." />
  <meta name="keywords" content="BharatSEO Platform, AI Resume Builder, AI Website Generator, SEO Intelligence Suite, Business Dashboard, Cloud Platform India, SaaS Roadmap" />
  <link rel="canonical" href="https://platform.bharatseo.site" />

  <!-- Google Fonts: Plus Jakarta Sans & Space Grotesk -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

  <!-- Font Awesome 6 Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"Space Grotesk"', 'monospace'],
          },
          colors: {
            brand: {
              navy: '#1A237E',
              dark: '#0a0e27',
              accent: '#FF9933',
              green: '#138808',
            }
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    .dot-pattern {
      background-image: radial-gradient(rgba(26, 35, 126, 0.08) 1.5px, transparent 1.5px);
      background-size: 24px 24px;
    }
    .gradient-mesh {
      background: radial-gradient(at 0% 0%, rgba(26, 35, 126, 0.06) 0px, transparent 50%),
                  radial-gradient(at 100% 100%, rgba(255, 153, 51, 0.06) 0px, transparent 50%);
    }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-[#FF9933]/20 selection:text-[#1A237E]">

  <!-- ======================================================== -->
  <!-- 1. TOP ANNOUNCEMENT TICKER -->
  <!-- ======================================================== -->
  <div class="bg-[#0a0e27] text-slate-300 py-2.5 px-4 text-xs font-semibold border-b border-blue-900/40">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FF9933]/20 text-[#FF9933] text-[10px] font-bold border border-[#FF9933]/30">
          <span class="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse"></span>
          CONFIDENTIAL PREVIEW
        </span>
        <span class="text-slate-300">BharatSEO Platform R&D in active development. Public Launch scheduled for 2027.</span>
      </div>
      <div class="flex items-center gap-4 text-[11px]">
        <a href="#early-access" class="text-[#FF9933] hover:underline font-bold flex items-center gap-1">
          <span>Join VIP Beta Waitlist</span>
          <i data-lucide="arrow-right" class="w-3 h-3"></i>
        </a>
        <span class="text-slate-600">|</span>
        <a href="https://bharatseo.site" class="text-slate-400 hover:text-white transition">Main Agency Website</a>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- 2. STICKY SAAS HEADER -->
  <!-- ======================================================== -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 shadow-2xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <a href="index.php" class="flex items-center gap-3 group">
        <div class="w-11 h-11 rounded-2xl bg-[#1A237E] flex items-center justify-center text-[#FF9933] font-black text-2xl shadow-md border-2 border-orange-100/60 group-hover:scale-105 transition-transform duration-300">
          B
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-black text-[#1A237E] tracking-tight leading-none">
            Bharat<span class="text-[#FF9933]">SEO</span>
          </span>
          <span class="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mt-1">
            Platform Labs 2027
          </span>
        </div>
      </a>

      <!-- Center Navigation Links -->
      <nav class="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-600">
        <a href="#modules" class="hover:text-[#1A237E] transition-colors flex items-center gap-1">
          <span>4 Core Modules</span>
        </a>
        <a href="#architecture" class="hover:text-[#1A237E] transition-colors flex items-center gap-1">
          <span>Cloud Stack</span>
        </a>
        <a href="#roadmap" class="hover:text-[#1A237E] transition-colors flex items-center gap-1">
          <span>Roadmap</span>
        </a>
        <a href="#comparison" class="hover:text-[#1A237E] transition-colors flex items-center gap-1">
          <span>Why BharatSEO</span>
        </a>
        <a href="install.php" class="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
          <i data-lucide="database" class="w-3.5 h-3.5"></i>
          <span>DB Setup</span>
        </a>
      </nav>

      <!-- Right Action CTA -->
      <div class="flex items-center gap-3">
        <a href="#early-access" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1A237E] to-blue-900 hover:from-blue-900 hover:to-[#1A237E] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#FF9933]"></i>
          <span>Reserve VIP Access</span>
        </a>
      </div>

    </div>
  </header>

  <!-- ======================================================== -->
  <!-- 3. HERO SECTION (SAAS LUXURY LOOK) -->
  <!-- ======================================================== -->
  <section class="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden dot-pattern gradient-mesh border-b border-slate-200/80">
    
    <!-- Ambient Lighting Glows -->
    <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-gradient-to-tr from-blue-200/40 via-indigo-100/50 to-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="absolute top-1/3 right-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
      
      <!-- Top Pill -->
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-sm backdrop-blur-md">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9933] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF9933]"></span>
        </span>
        <span class="text-xs font-bold text-[#1A237E] tracking-wide">
          Under Development • Public Launch 2027
        </span>
      </div>

      <!-- Main Headline & Subtitle -->
      <div class="max-w-4xl mx-auto space-y-6">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A237E] tracking-tight leading-[1.1]">
          Coming Soon: <span class="bg-gradient-to-r from-[#1A237E] via-blue-800 to-[#FF9933] bg-clip-text text-transparent">BharatSEO Platform</span>
        </h1>

        <p class="text-lg sm:text-xl font-semibold text-slate-800 max-w-3xl mx-auto leading-relaxed">
          We are building a next-generation AI and cloud platform for Indian businesses, creators, students, and startups.
        </p>

        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          BharatSEO is currently developing a suite of AI-powered tools designed to simplify website creation, resume generation, SEO automation, and business operations through a unified cloud platform.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="#modules" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all">
          <span>Explore 4 Core Modules</span>
          <i data-lucide="arrow-down" class="w-4 h-4 text-[#FF9933]"></i>
        </a>
        <a href="#roadmap" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-sm transition-all">
          <i data-lucide="milestone" class="w-4 h-4 text-slate-500"></i>
          <span>View 2026-2027 Roadmap</span>
        </a>
      </div>

      <!-- Bento Metrics Indicator Boxes -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
        <div class="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs text-left space-y-1 backdrop-blur-xs">
          <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">R&D Status</span>
          <p class="text-sm font-black text-[#1A237E] flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Active Architecture
          </p>
        </div>
        <div class="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs text-left space-y-1 backdrop-blur-xs">
          <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Initial MVP</span>
          <p class="text-sm font-black text-[#1A237E] flex items-center gap-1.5">
            <i data-lucide="calendar" class="w-4 h-4 text-[#FF9933]"></i>
            Q3 2026 (Resume)
          </p>
        </div>
        <div class="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs text-left space-y-1 backdrop-blur-xs">
          <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">General Availability</span>
          <p class="text-sm font-black text-[#1A237E] flex items-center gap-1.5">
            <i data-lucide="rocket" class="w-4 h-4 text-[#FF9933]"></i>
            Q2 2027 Launch
          </p>
        </div>
        <div class="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs text-left space-y-1 backdrop-blur-xs">
          <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Cloud Backbone</span>
          <p class="text-sm font-black text-[#1A237E] flex items-center gap-1.5">
            <i data-lucide="cloud" class="w-4 h-4 text-[#FF9933]"></i>
            AWS Serverless
          </p>
        </div>
      </div>

    </div>
  </section>

  <!-- ======================================================== -->
  <!-- 4. IN-DEPTH EXPLANATION: THE 4 CORE MODULES -->
  <!-- ======================================================== -->
  <section id="modules" class="py-24 bg-white border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs font-mono uppercase tracking-widest text-[#FF9933] font-bold px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80">
          Product Engineering Specifications
        </span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A237E] tracking-tight">
          Deep Dive: The 4 Core Platform Modules
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Each module is purpose-built to solve critical bottlenecks faced by Indian founders, job seekers, and digital creators with clean engineering and intelligent automation.
        </p>
      </div>

      <!-- =================================================== -->
      <!-- MODULE 1: AI RESUME BUILDER -->
      <!-- =================================================== -->
      <div class="bg-[#F8FAFC] rounded-[28px] p-8 sm:p-12 border border-slate-200/90 shadow-[0_8px_30px_rgba(26,35,126,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div class="lg:col-span-6 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-[#1A237E] text-white flex items-center justify-center shadow-md">
              <i data-lucide="file-text" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#FF9933] font-bold">Module 01 • GenAI & NLP</span>
              <h3 class="text-2xl sm:text-3xl font-black text-[#1A237E]">AI Resume Builder</h3>
            </div>
          </div>

          <p class="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Over 75% of job applicants in India get automatically filtered out before reaching a human recruiter due to non-standard formatting, missing keywords, and poor parser scores.
          </p>

          <div class="space-y-3 text-xs text-slate-600">
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Live ATS Scoring Engine (0 - 100)</strong>
                <span>Scans resumes against Workday, Taleo, Greenhouse, and Lever parsing standards to guarantee 90%+ parseability.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Contextual Bullet Point Optimizer</strong>
                <span>Rewrites generic job descriptions into high-impact metric-driven bullet points using standard action verbs.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">One-Click LaTeX & PDF Compiler</strong>
                <span>Exports crisp, pixel-perfect, recruiter-standard single-page resumes without formatting breakage.</span>
              </div>
            </div>
          </div>

          <div class="pt-2 flex items-center gap-3">
            <span class="px-3 py-1 rounded-xl bg-blue-100 text-[#1A237E] font-bold text-xs">Target MVP: Q3 2026</span>
            <span class="text-xs text-slate-500">Stack: Python, FastAPI, Bedrock LLM, Weasyprint</span>
          </div>
        </div>

        <!-- Visual Sandbox / Terminal Preview -->
        <div class="lg:col-span-6 bg-slate-900 rounded-3xl p-6 text-slate-300 font-mono text-xs border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
            </div>
            <span class="text-slate-500 text-[11px]">ats-parser-engine.py</span>
          </div>

          <div class="space-y-2 text-[11px] leading-relaxed">
            <p class="text-blue-400"># ATS Parsing Benchmark & Optimization</p>
            <p class="text-slate-400">> Uploaded: <span class="text-white">Software_Engineer_CV.pdf</span></p>
            <p class="text-slate-400">> Target Role: <span class="text-white">Full Stack Developer (Next.js / Node.js)</span></p>
            
            <div class="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 my-2 space-y-1.5">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-emerald-400">ATS Match Score</span>
                <span class="text-emerald-400">94 / 100</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                <div class="w-[94%] h-full bg-emerald-500 rounded-full"></div>
              </div>
              <p class="text-[10px] text-slate-400">✓ Keywords matched: Next.js, PostgreSQL, AWS Lambda, Tailwind CSS</p>
            </div>

            <p class="text-emerald-400">> Auto-suggested bullet rewrite:</p>
            <p class="text-slate-300 pl-3 border-l-2 border-[#FF9933]">"Engineered 14 microservices in Node.js, reducing API latency by 42% for 100k+ daily users."</p>
          </div>
        </div>

      </div>

      <!-- =================================================== -->
      <!-- MODULE 2: AI WEBSITE GENERATOR -->
      <!-- =================================================== -->
      <div class="bg-[#F8FAFC] rounded-[28px] p-8 sm:p-12 border border-slate-200/90 shadow-[0_8px_30px_rgba(26,35,126,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Visual Architecture Mockup -->
        <div class="lg:col-span-6 order-2 lg:order-1 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <span class="font-mono text-xs font-bold text-slate-400 uppercase">Core Web Vitals Benchmark</span>
            <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
              Google PageSpeed: 99/100
            </span>
          </div>

          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400">LCP (Largest Contentful Paint)</span>
              <p class="text-base font-black text-emerald-600 mt-1">0.6s</p>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400">FID (Interaction Delay)</span>
              <p class="text-base font-black text-emerald-600 mt-1">12ms</p>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400">CLS (Cumulative Shift)</span>
              <p class="text-base font-black text-emerald-600 mt-1">0.00</p>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs space-y-1">
            <p class="font-bold text-[#1A237E] flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i>
              <span>Zero-Bloat Guarantee</span>
            </p>
            <p class="text-slate-600 text-[11px]">
              No heavy WordPress plugins, no jQuery, no slow database queries. 100% pre-compiled Next.js assets served from the nearest AWS CloudFront edge location.
            </p>
          </div>
        </div>

        <div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-[#1A237E] text-white flex items-center justify-center shadow-md">
              <i data-lucide="globe" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#FF9933] font-bold">Module 02 • Cloud & Edge Hosting</span>
              <h3 class="text-2xl sm:text-3xl font-black text-[#1A237E]">AI Website Generator</h3>
            </div>
          </div>

          <p class="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Create ultra-fast, mobile-first websites for Indian local businesses, clinics, manufacturers, and startups in under 60 seconds with automated SEO metadata pre-injected.
          </p>

          <div class="space-y-3 text-xs text-slate-600">
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Automated Schema.org JSON-LD</strong>
                <span>Automatically generates LocalBusiness, Organization, FAQPage, and Service schema tags for Google rich snippets.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Instant WhatsApp & Lead Forms</strong>
                <span>Pre-wired conversion widgets that route customer inquiries straight to the business owner's WhatsApp and email.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Custom Domain & Free SSL Setup</strong>
                <span>One-click DNS binding with automated AWS Certificate Manager SSL renewal.</span>
              </div>
            </div>
          </div>

          <div class="pt-2 flex items-center gap-3">
            <span class="px-3 py-1 rounded-xl bg-orange-100 text-orange-800 font-bold text-xs">Target Beta: Q4 2026</span>
            <span class="text-xs text-slate-500">Stack: Next.js 15, React, AWS Lambda, CloudFront</span>
          </div>
        </div>

      </div>

      <!-- =================================================== -->
      <!-- MODULE 3: SEO INTELLIGENCE SUITE -->
      <!-- =================================================== -->
      <div class="bg-[#F8FAFC] rounded-[28px] p-8 sm:p-12 border border-slate-200/90 shadow-[0_8px_30px_rgba(26,35,126,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div class="lg:col-span-6 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-[#1A237E] text-white flex items-center justify-center shadow-md">
              <i data-lucide="search" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#FF9933] font-bold">Module 03 • Rank & Search Engine AI</span>
              <h3 class="text-2xl sm:text-3xl font-black text-[#1A237E]">SEO Intelligence Suite</h3>
            </div>
          </div>

          <p class="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Existing US-centric SEO tools cost $120+/month and ignore India's regional multilingual nuances. BharatSEO Intelligence is engineered specifically for Google India SERP patterns.
          </p>

          <div class="space-y-3 text-xs text-slate-600">
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Regional Search Intent Clustering</strong>
                <span>Groups user search intent by city, state, and regional language modifiers to uncover low-competition ranking keywords.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Programmatic Internal Link Graph</strong>
                <span>Scans website structure and suggests exact contextual anchor text placements to maximize PageRank distribution.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Algorithm Volatility & Leak Alerts</strong>
                <span>Real-time webhook notifications when Google core updates affect target search terms.</span>
              </div>
            </div>
          </div>

          <div class="pt-2 flex items-center gap-3">
            <span class="px-3 py-1 rounded-xl bg-blue-100 text-[#1A237E] font-bold text-xs">Target GA: Q2 2027</span>
            <span class="text-xs text-slate-500">Stack: ClickHouse, PostgreSQL, Bedrock, Node.js</span>
          </div>
        </div>

        <!-- Feature Graphical Mockup -->
        <div class="lg:col-span-6 bg-slate-900 rounded-3xl p-6 text-slate-300 font-mono text-xs border border-slate-800 shadow-xl space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800">
            <span class="text-slate-400 font-bold">SERP Gap & Intent Clustering Matrix</span>
            <span class="text-[#FF9933] text-[10px]">Google India (en-IN / hi-IN)</span>
          </div>

          <div class="space-y-2 pt-1 text-[11px]">
            <div class="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
              <div>
                <span class="text-white font-bold block">"best solar panel installation jaipur"</span>
                <span class="text-[10px] text-slate-400">High Commercial Intent • KD: 18</span>
              </div>
              <span class="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 text-[10px] font-bold">Opportunity: #1</span>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
              <div>
                <span class="text-white font-bold block">"gst registration cost for private limited"</span>
                <span class="text-[10px] text-slate-400">Informational / Service • KD: 22</span>
              </div>
              <span class="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 text-[10px] font-bold">Opportunity: #2</span>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
              <div>
                <span class="text-white font-bold block">"chartered accountant near me contact"</span>
                <span class="text-[10px] text-slate-400">Local Map Pack Intent • KD: 14</span>
              </div>
              <span class="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 text-[10px] font-bold">Opportunity: #1</span>
            </div>
          </div>
        </div>

      </div>

      <!-- =================================================== -->
      <!-- MODULE 4: BUSINESS DASHBOARD -->
      <!-- =================================================== -->
      <div class="bg-[#F8FAFC] rounded-[28px] p-8 sm:p-12 border border-slate-200/90 shadow-[0_8px_30px_rgba(26,35,126,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Visual Dashboard Mockup -->
        <div class="lg:col-span-6 order-2 lg:order-1 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <span class="font-mono text-xs font-bold text-slate-400 uppercase">Multi-Tenant Business Operations</span>
            <span class="px-2.5 py-1 rounded-full bg-blue-50 text-[#1A237E] font-bold text-[10px]">
              GST Ready 18% & 12%
            </span>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">₹</div>
                <div>
                  <p class="font-bold text-slate-800 text-xs">Invoice #BSEO-2026-89</p>
                  <p class="text-[10px] text-slate-400">SEO Retainer + AWS Hosting</p>
                </div>
              </div>
              <span class="text-xs font-black text-emerald-600">₹45,000 (Paid)</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <i data-lucide="check-square" class="w-4 h-4"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-800 text-xs">Kanban Task: Schema Audit</p>
                  <p class="text-[10px] text-slate-400">Assigned: Dev Team • Due: Tomorrow</p>
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">In Review</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-[#1A237E] text-white flex items-center justify-center shadow-md">
              <i data-lucide="layout-dashboard" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#FF9933] font-bold">Module 04 • Unified SaaS Operations</span>
              <h3 class="text-2xl sm:text-3xl font-black text-[#1A237E]">Business Dashboard</h3>
            </div>
          </div>

          <p class="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Replace 5+ scattered tools. Manage client accounts, automated GST invoices, team task boards, and revenue performance from one centralized workspace.
          </p>

          <div class="space-y-3 text-xs text-slate-600">
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Automated GST Invoicing & UPI Links</strong>
                <span>Generate compliant tax invoices with instant QR codes for direct UPI, Net Banking, and Card settlement.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Client Access Portals (White-Label)</strong>
                <span>Give clients a branded link to view their live rankings, active deliverables, and invoice histories.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-slate-800 block text-xs">Monthly Automated PDF Reports</strong>
                <span>One-click generation of professional growth reports sent directly to client emails via Amazon SES.</span>
              </div>
            </div>
          </div>

          <div class="pt-2 flex items-center gap-3">
            <span class="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 font-bold text-xs">Target MVP: Q1 2027</span>
            <span class="text-xs text-slate-500">Stack: TypeScript, PostgreSQL, Redis, SES</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- ======================================================== -->
  <!-- 5. TECHNOLOGY STACK ARCHITECTURE -->
  <!-- ======================================================== -->
  <section id="architecture" class="py-24 bg-[#F8FAFC] border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div class="text-center max-w-2xl mx-auto space-y-3">
        <span class="text-xs font-mono uppercase tracking-widest text-[#FF9933] font-bold">Cloud Infrastructure</span>
        <h2 class="text-3xl sm:text-4xl font-black text-[#1A237E] tracking-tight">
          Enterprise Cloud Architecture
        </h2>
        <p class="text-xs sm:text-sm text-slate-500">
          Engineered on robust cloud primitives for 99.99% uptime, strict Indian data residency, and sub-second latencies.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Frontend & Edge -->
        <div class="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-2xs space-y-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#1A237E] flex items-center justify-center">
              <i data-lucide="globe" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-800">Edge & Frontend Layer</h3>
              <p class="text-[11px] text-slate-400 font-mono">Next.js 15 & CloudFront</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Static site generation with incremental static regeneration (ISR) distributed globally across AWS edge points of presence (PoPs) in Mumbai, Delhi, Hyderabad, and Chennai.
          </p>
          <div class="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">Next.js 15</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">TypeScript</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">Tailwind CSS</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">CloudFront Edge</span>
          </div>
        </div>

        <!-- Backend & AI Compute -->
        <div class="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-2xs space-y-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-50 text-[#FF9933] flex items-center justify-center">
              <i data-lucide="cpu" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-800">Backend & Generative AI</h3>
              <p class="text-[11px] text-slate-400 font-mono">Serverless & Amazon Bedrock</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Scalable AWS Lambda serverless compute combined with fine-tuned Foundation Models for natural language processing, schema generation, and ATS resume scoring.
          </p>
          <div class="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">Node.js / Python</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">AWS Lambda</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">Amazon Bedrock</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">Amazon SES</span>
          </div>
        </div>

        <!-- Database & Storage -->
        <div class="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-2xs space-y-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <i data-lucide="database" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-800">Data Storage & Caching</h3>
              <p class="text-[11px] text-slate-400 font-mono">PostgreSQL & AWS S3</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Relational multi-tenant PostgreSQL with row-level security, high-speed Redis caching for session tokens, and encrypted AWS S3 object storage for generated PDFs and media.
          </p>
          <div class="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">PostgreSQL</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">Redis Cache</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">AWS S3 Glacier</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700">ClickHouse (Analytics)</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- ======================================================== -->
  <!-- 6. COMPREHENSIVE ROADMAP (2026 - 2027) -->
  <!-- ======================================================== -->
  <section id="roadmap" class="py-24 bg-white border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div class="text-center max-w-2xl mx-auto space-y-3">
        <span class="text-xs font-mono uppercase tracking-widest text-[#FF9933] font-bold">Execution Timeline</span>
        <h2 class="text-3xl sm:text-4xl font-black text-[#1A237E] tracking-tight">
          Product Development Roadmap
        </h2>
        <p class="text-xs sm:text-sm text-slate-500">
          A disciplined, staged engineering schedule delivering tested, audited, and resilient automation modules.
        </p>
      </div>

      <!-- Roadmap Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <?php foreach ($milestones as $idx => $m): ?>
          <div class="bg-[#F8FAFC] rounded-[24px] p-7 border border-slate-200/90 shadow-2xs space-y-6 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all">
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs font-black text-[#1A237E] bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <?php echo htmlspecialchars($m['quarter_tag']); ?>
                </span>
                
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase <?php 
                  echo $m['status'] === 'in_pipeline' ? 'bg-amber-100 text-amber-800' : 
                      ($m['status'] === 'architecture_design' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'); 
                ?>">
                  <?php echo str_replace('_', ' ', $m['status']); ?>
                </span>
              </div>

              <div class="space-y-1.5">
                <h3 class="text-base font-black text-[#1A237E]">
                  <?php echo htmlspecialchars($m['headline']); ?>
                </h3>
                <p class="text-xs text-slate-600 leading-relaxed">
                  <?php echo htmlspecialchars($m['detailed_description']); ?>
                </p>
              </div>

              <div class="pt-3 border-t border-slate-200/70 space-y-2 text-[11px] text-slate-700">
                <p class="font-bold text-[#1A237E]">Target Deliverables:</p>
                <?php 
                  $delivs = explode("\n", $m['deliverables']);
                  foreach ($delivs as $d):
                    if (trim($d) === '') continue;
                ?>
                  <div class="flex items-start gap-1.5">
                    <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"></i>
                    <span><?php echo htmlspecialchars(trim($d)); ?></span>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span><?php echo htmlspecialchars($m['target_date']); ?></span>
              <span class="font-bold text-[#FF9933]">Phase <?php echo $idx + 1; ?></span>
            </div>

          </div>
        <?php endforeach; ?>
      </div>

    </div>
  </section>

  <!-- ======================================================== -->
  <!-- 7. EARLY ACCESS VIP WAITLIST FORM (CONNECTS TO DATABASE) -->
  <!-- ======================================================== -->
  <section id="early-access" class="py-24 bg-[#0a0e27] text-white relative overflow-hidden border-t border-blue-900/50">
    
    <!-- Ambient Lights -->
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
      
      <div class="text-center space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FF9933] text-xs font-bold backdrop-blur-xs">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          <span>Early Access Waitlist</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Be the First to Access BharatSEO Platform
        </h2>

        <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Reserve your priority invitation for our Q3 2026 Resume Builder Beta and full 2027 General Availability release. No spam, guaranteed early-tester credits.
        </p>
      </div>

      <!-- Interactive Waitlist Form Card -->
      <div class="bg-slate-900/90 border border-slate-700/80 rounded-[28px] p-8 sm:p-10 shadow-2xl backdrop-blur-md space-y-6">
        
        <!-- Feedback Alert Container -->
        <div id="waitlist-alert" class="hidden p-4 rounded-2xl text-xs space-y-1"></div>

        <form id="waitlist-form" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300">Your Full Name *</label>
              <input type="text" id="w-name" required placeholder="e.g. Rahul Sharma" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF9933] transition" />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300">Email Address *</label>
              <input type="email" id="w-email" required placeholder="name@company.com" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF9933] transition" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300">Mobile / WhatsApp (Optional)</label>
              <input type="text" id="w-phone" placeholder="+91 98765 43210" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF9933] transition" />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300">I Am A *</label>
              <select id="w-role" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF9933] transition">
                <option value="business_owner">Business Owner / Founder</option>
                <option value="agency_freelancer">Agency / Freelancer</option>
                <option value="student_jobseeker">Student / Job Seeker</option>
                <option value="developer_creator">Developer / Creator</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-300">Modules of Greatest Interest</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <label class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-500">
                <input type="checkbox" name="module_interest" value="resume" checked class="rounded text-[#FF9933] focus:ring-0">
                <span>Resume Builder</span>
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-500">
                <input type="checkbox" name="module_interest" value="website" checked class="rounded text-[#FF9933] focus:ring-0">
                <span>Website Gen</span>
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-500">
                <input type="checkbox" name="module_interest" value="seo" checked class="rounded text-[#FF9933] focus:ring-0">
                <span>SEO Suite</span>
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-500">
                <input type="checkbox" name="module_interest" value="dashboard" checked class="rounded text-[#FF9933] focus:ring-0">
                <span>Dashboard</span>
              </label>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-300">Suggestions / What would you love to see? (Optional)</label>
            <textarea id="w-feedback" rows="2" placeholder="Tell us about your biggest operational or SEO headaches..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#FF9933] transition"></textarea>
          </div>

          <button type="submit" id="w-submit-btn" class="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF9933] to-orange-500 hover:from-orange-500 hover:to-[#FF9933] text-slate-950 font-black text-sm shadow-xl transition-all active:scale-98 flex items-center justify-center gap-2">
            <span>Reserve Early Access VIP Pass</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </form>

        <p class="text-center text-[11px] text-slate-500">
          🔒 Strictly confidential. We respect your inbox. Unsubscribe anytime.
        </p>

      </div>

    </div>
  </section>

  <!-- ======================================================== -->
  <!-- 8. FOUNDER NOTE & PHILOSOPHY -->
  <!-- ======================================================== -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="bg-gradient-to-r from-[#0a0e27] via-[#1A237E] to-[#0f1742] text-white rounded-[28px] p-8 sm:p-12 shadow-xl relative overflow-hidden border border-blue-900/50">
        
        <div class="relative z-10 space-y-6 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FF9933] text-xs font-bold">
            <i data-lucide="quote" class="w-3.5 h-3.5"></i>
            <span>Engineering Philosophy</span>
          </div>

          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug tracking-tight">
            "We are building BharatSEO as a long-term technology platform, not just a service website. Our goal is to create practical AI and automation tools that help Indian businesses launch faster, grow online, and operate more efficiently."
          </h3>

          <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-[#FF9933] text-lg">
                B
              </div>
              <div>
                <p class="font-bold text-white text-sm">BharatSEO Platform Core Team</p>
                <p class="text-blue-200 text-[11px]">Engineering for India's Digital Economy</p>
              </div>
            </div>

            <a href="https://bharatseo.site" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition border border-white/20 text-xs">
              <span>Visit BharatSEO Agency Site</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>

      </div>

      <!-- Legal Disclaimer -->
      <div class="text-center pt-8">
        <p class="text-xs text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-1.5 font-normal">
          <i data-lucide="info" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
          <span>Features, module specifications, and launch schedules may evolve during continuous engineering.</span>
        </p>
      </div>

    </div>
  </section>

  <!-- ======================================================== -->
  <!-- 9. CLEAN PLATFORM FOOTER -->
  <!-- ======================================================== -->
  <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-[#1A237E] flex items-center justify-center text-[#FF9933] font-bold text-sm">
          B
        </div>
        <span class="text-slate-200 font-bold tracking-tight">BharatSEO Platform</span>
        <span class="text-slate-600">|</span>
        <span>Subdomain Portal</span>
      </div>

      <div class="flex items-center gap-6">
        <a href="#modules" class="hover:text-white transition-colors">4 Modules</a>
        <a href="#architecture" class="hover:text-white transition-colors">Cloud Stack</a>
        <a href="#roadmap" class="hover:text-white transition-colors">Roadmap</a>
        <a href="install.php" class="hover:text-white transition-colors">DB Setup</a>
        <a href="https://bharatseo.site" class="hover:text-white transition-colors">Main Site</a>
      </div>

      <div>
        <p class="text-slate-500">© 2026 BharatSEO. All rights reserved.</p>
      </div>

    </div>
  </footer>

  <!-- ======================================================== -->
  <!-- JAVASCRIPT: AJAX FORM & ICONS INITIALIZATION -->
  <!-- ======================================================== -->
  <script>
    if (window.lucide) {
      lucide.createIcons();
    }

    // Waitlist Form AJAX Submission
    document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const btn = document.getElementById('w-submit-btn');
      const alertBox = document.getElementById('waitlist-alert');
      
      btn.disabled = true;
      btn.innerHTML = '<span>Submitting Reservation...</span>';

      const checkedModules = [];
      document.querySelectorAll('input[name="module_interest"]:checked').forEach(c => checkedModules.push(c.value));

      const payload = {
        full_name: document.getElementById('w-name').value,
        email: document.getElementById('w-email').value,
        phone: document.getElementById('w-phone').value,
        role_type: document.getElementById('w-role').value,
        modules: checkedModules,
        feedback: document.getElementById('w-feedback').value
      };

      try {
        const res = await fetch('api.php?action=join_waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        alertBox.classList.remove('hidden');

        if (data.success) {
          alertBox.className = 'p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs space-y-1 block';
          alertBox.innerHTML = `<strong>Success!</strong> ${data.message}`;
          document.getElementById('waitlist-form').reset();
        } else {
          alertBox.className = 'p-4 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-300 text-xs space-y-1 block';
          alertBox.innerHTML = `<strong>Error:</strong> ${data.message}`;
        }
      } catch (err) {
        alertBox.classList.remove('hidden');
        alertBox.className = 'p-4 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-300 text-xs space-y-1 block';
        alertBox.innerHTML = '<strong>Connection Error:</strong> Could not connect to API server. Please try again.';
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Reserve Early Access VIP Pass</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>';
        if (window.lucide) lucide.createIcons();
      }
    });
  </script>

</body>
</html>
