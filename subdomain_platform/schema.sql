-- ========================================================
-- BHARATSEO PLATFORM: DATABASE SCHEMA
-- For Subdomain Deployment (e.g., platform.bharatseo.site)
-- ========================================================

CREATE TABLE IF NOT EXISTS `platform_waitlist` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `phone` VARCHAR(30) NULL,
  `role_type` ENUM('business_owner', 'agency_freelancer', 'student_jobseeker', 'developer_creator', 'other') DEFAULT 'business_owner',
  `interested_modules` VARCHAR(255) DEFAULT 'all', -- Comma-separated: resume, website, seo, dashboard
  `company_name` VARCHAR(150) NULL,
  `feedback_notes` TEXT NULL,
  `referral_source` VARCHAR(100) DEFAULT 'direct',
  `status` ENUM('pending', 'verified', 'invited', 'beta_access') DEFAULT 'pending',
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `platform_feature_votes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `module_key` ENUM('resume_builder', 'website_generator', 'seo_suite', 'business_dashboard', 'core_cloud') NOT NULL,
  `feature_name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `votes_count` INT DEFAULT 1,
  `status` ENUM('under_review', 'planned', 'in_development', 'testing') DEFAULT 'planned',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `platform_roadmap_milestones` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `quarter_tag` VARCHAR(20) NOT NULL, -- e.g., 'Q3 2026', 'Q4 2026'
  `phase_title` VARCHAR(100) NOT NULL,
  `headline` VARCHAR(200) NOT NULL,
  `detailed_description` TEXT NOT NULL,
  `deliverables` TEXT NOT NULL, -- JSON or newline separated items
  `target_date` VARCHAR(50) NOT NULL,
  `status` ENUM('planned', 'in_pipeline', 'architecture_design', 'beta_testing', 'completed') DEFAULT 'planned',
  `display_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `platform_modules_metadata` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(80) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `tagline` VARCHAR(255) NOT NULL,
  `icon_class` VARCHAR(50) NOT NULL,
  `badge_status` VARCHAR(50) DEFAULT 'In Development',
  `target_launch` VARCHAR(50) NOT NULL,
  `tech_stack` VARCHAR(255) NOT NULL,
  `architecture_overview` TEXT NOT NULL,
  `key_capabilities` TEXT NOT NULL,
  `problem_solved` TEXT NOT NULL,
  `target_audience` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- SEED INITIAL ROADMAP MILESTONES
-- ========================================================
INSERT INTO `platform_roadmap_milestones` (`quarter_tag`, `phase_title`, `headline`, `detailed_description`, `deliverables`, `target_date`, `status`, `display_order`) VALUES
('Q3 2026', 'Phase 1: Foundation & AI Resume Engine', 'AI Resume Builder MVP & ATS Scoring Sandbox', 'Initial rollout of our contextual parser and LaTeX formatting engine tailored for Indian engineering students, corporate job seekers, and recruiters.', 'Contextual parser engine\nATS scoring algorithm\nLaTeX & PDF template generator\nLinkedIn data importer\nReal-time keyword gap analyzer', 'July - September 2026', 'in_pipeline', 1),
('Q4 2026', 'Phase 2: High-Speed Web Generation', 'AI Website Generator Beta & Edge Hosting Engine', 'Automated headless static and dynamic web generation engine with native Schema.org integration and sub-second AWS CloudFront edge deployment.', 'Next.js 15 site compiler\nAutomatic Schema.org structured data\nInstant AWS CloudFront edge publishing\nBuilt-in lead capture & CRM webhooks\nMobile-first Core Web Vitals 99+ guarantee', 'October - December 2026', 'architecture_design', 2),
('Q1 2027', 'Phase 3: Unified Enterprise Workspace', 'Business Dashboard & Client Management System', 'All-in-one operations hub for Indian MSMEs and agencies featuring automated GST billing, Kanban task boards, client portals, and performance reports.', 'GST-compliant invoice generator with Razorpay webhooks\nClient collaboration workspace\nAutomated monthly SEO performance reports\nRole-based access control (RBAC)\nTeam time-tracking & file lockers', 'January - March 2027', 'planned', 3),
('Q2 2027', 'Phase 4: Public General Availability', 'SEO Intelligence Suite & Public Platform Launch', 'The full general availability launch of BharatSEO Platform uniting all modules under unified subscription, single sign-on, and real-time rank tracking.', 'BharatSEO Unified Single Sign-On (SSO)\nAutomated SERP intent clustering\nProgrammatic JSON-LD metadata generation\nDeveloper REST & GraphQL APIs\n24/7 Priority Indian Cloud Infrastructure', 'April - June 2027', 'planned', 4)
ON DUPLICATE KEY UPDATE `headline` = VALUES(`headline`);

-- ========================================================
-- SEED INITIAL MODULES METADATA
-- ========================================================
INSERT INTO `platform_modules_metadata` (`slug`, `title`, `tagline`, `icon_class`, `badge_status`, `target_launch`, `tech_stack`, `architecture_overview`, `key_capabilities`, `problem_solved`, `target_audience`) VALUES
('resume-builder', 'AI Resume Builder', 'ATS-optimized resumes, bullet enhancement & LaTeX template export', 'fa-file-invoice', 'In Development', 'Q3 2026', 'Python, FastAPI, Bedrock LLM, Weasyprint / LaTeX, AWS S3', 'Serverless parsing pipeline using NLP named entity recognition, parsing incoming CVs against target job descriptions, scoring keyword density, and streaming real-time improvement suggestions.', 'Live ATS scoring (0-100)\nTarget job description matching\nAction-verb bullet point rewrites\nOne-click PDF/LaTeX download\nRecruiter-tested typography & spacing', 'Over 75% of Indian applicants get auto-rejected by enterprise ATS filters due to bad formatting, missing keywords, and non-parseable layouts.', 'Students, job seekers, fresh graduates, IT professionals, executives'),

('website-generator', 'AI Website Generator', 'High-performance, SEO-ready business websites built on modern cloud architecture', 'fa-globe', 'In Development', 'Q4 2026', 'Next.js 15, React, Tailwind CSS, AWS Lambda, AWS S3, CloudFront CDN', 'Generative component assembly engine that analyzes industry prompts, creates structured JSON-LD schemas, builds semantic React layouts, compiles statically, and deploys globally in under 60 seconds.', 'Sub-second page load times (Core Web Vitals 95+)\nAutomated local business Schema.org JSON-LD\nIntegrated contact & WhatsApp conversion lead funnels\nCustom domain & free SSL auto-provisioning\nNo-code live inline visual editing', 'Traditional WordPress websites are bloated, slow to build, expensive to host, and frequently fail Google Core Web Vitals checks.', 'MSMEs, local shopkeepers, clinics, service agencies, digital creators'),

('seo-suite', 'SEO Intelligence Suite', 'Automated keyword research, regional search intent clustering & rank volatility tracking', 'fa-chart-line', 'In Development', 'Q2 2027', 'Node.js, PostgreSQL, ClickHouse, Amazon Bedrock, Puppeteer Cluster', 'High-throughput SERP monitoring engine fetching localized Google India search data, extracting competitor gap opportunities, and generating schema markup automatically.', 'Regional & multi-lingual search intent clustering\nAlgorithmic JSON-LD structured data generator\nReal-time rank volatility monitors & alert webhooks\nContent gap and internal link recommendation graphs\nCompetitor backlink overlap audits', 'Traditional SEO tools cost $100+/mo and are tuned for US markets rather than India\'s unique multilingual, mobile-first search patterns.', 'SEO agencies, in-house marketing teams, e-commerce founders, bloggers'),

('business-dashboard', 'Business Dashboard', 'Unified workspace for GST invoicing, client projects, analytics, and team workflows', 'fa-table-columns', 'In Development', 'Q1 2027', 'TypeScript, Next.js, Express, PostgreSQL, Redis, SES', 'Multi-tenant relational database with strict row-level security, integrated webhook processors for payment gateways (UPI/Razorpay), and automated PDF generation.', 'Automated GST-compliant invoices & payment receipts\nWhite-label client access portals\nKanban campaign trackers with deliverable sign-offs\nLive revenue, retainer MRR & churn dashboards\nIntegrated support ticketing with WhatsApp notifications', 'Indian agencies and small business owners juggle 5+ disjointed tools for invoicing, WhatsApp chat, Google Docs, and rank tracking.', 'Digital agencies, freelancers, consultants, service businesses')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);
