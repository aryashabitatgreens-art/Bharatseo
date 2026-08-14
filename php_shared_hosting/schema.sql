-- ===================================================
-- BHARAT SEO - COMPLETE MYSQL DATABASE SCHEMA (.sql)
-- Production Ready for Shared Hosting (cPanel / Hostinger / MySQL 5.7+ / 8.0+)
-- ===================================================

CREATE DATABASE IF NOT EXISTS `bharat_seo_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bharat_seo_db`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(20) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `role` ENUM('user', 'admin') DEFAULT 'user',
  `status` ENUM('active', 'blocked') DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Admin User (Password: admin123)
INSERT INTO `users` (`name`, `email`, `phone`, `password`, `role`, `status`) VALUES
('Bharat SEO Admin', 'ceo@bharatseo.site', '+91 95208 68276', '$2y$10$wT0r7yK8o2O5c9Wz8F.8ue6RkL9uWdYrT61.p2o/aKzW7nE.G3E7G', 'admin', 'active')
ON DUPLICATE KEY UPDATE `name`=`name`;

-- 2. Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(100) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(200) NOT NULL UNIQUE,
  `short_desc` TEXT DEFAULT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Services
INSERT INTO `services` (`id`, `category`, `title`, `slug`, `short_desc`, `description`, `image`) VALUES
(1, 'SEO', 'Technical & Organic SEO Dominance', 'technical-organic-seo-campaigns', 'Dominate Google Page #1 rankings with AI Overview optimization, high-intent commercial keywords, and high-DA authority backlinks.', 'Our enterprise SEO campaigns help your brand capture top spots on Google Search for high-value commercial keywords. We integrate deep keyword research, Core Web Vitals speed tuning, high-authority editorial link acquisition, and AI Overview (SGE) optimization.', 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=800&q=80'),
(2, 'SEO', 'Local SEO & Google Maps (3-Pack) Ranking', 'local-seo-gmb-ranking', 'Capture nearby customers and dominate the Google Local 3-Pack with hyper-local citations, review automation, and geo-targeted landing pages.', 'Transform your physical store, clinic, or regional agency into the #1 searched service in your city. We optimize your Google Business Profile (GBP), deploy geo-tagged photo citations, manage reputation, and build hyper-local authority.', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80'),
(3, 'Web Development', 'Custom Web Development & E-Commerce', 'custom-web-development-ecommerce', 'Lightning-fast, mobile-first websites, web portals, and Shopify/WooCommerce stores engineered for 95+ PageSpeed and high conversions.', 'We craft bespoke web platforms with clean architecture, sub-second TTFB, seamless mobile responsiveness, and bank-grade payment security. From enterprise portals to multi-vendor e-commerce stores, we build for conversion and scale.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'),
(4, 'PPC / Ads', 'Google Ads & High-ROAS Performance Marketing', 'google-ads-ppc-marketing', 'Stop wasting ad spend. Maximize Return on Ad Spend (ROAS) with hyper-targeted Google Search, Shopping, YouTube, and Performance Max campaigns.', 'We design high-converting PPC campaigns with rigorous A/B ad creative testing, high-intent negative keyword moats, advanced conversion pixel tracking, and dedicated landing page optimization to deliver maximum lead quality.', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'),
(5, 'Social Media', 'Social Media Growth, Meta Ads & Viral Reels', 'social-media-marketing-reels', 'Build an authoritative brand presence on Instagram, Facebook, and LinkedIn with trending 4K Reels, lead-generation ad funnels, and community engagement.', 'Transform social media from vanity metrics into revenue. We produce eye-catching carousel designs, viral video Reels/Shorts editing, founder brand building on LinkedIn, and high-converting Meta lead generation ads.', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'),
(6, 'Hosting & Deployment', 'Cloud Infrastructure, cPanel & VPS Hardening', 'cloud-hosting-vps-deployment', 'Ultra-secure, lightning-fast web deployment on LiteSpeed cPanel, AWS, or DigitalOcean with zero downtime, SSL, and automated off-site backups.', 'We take complete care of your digital infrastructure so your website never crashes. Complete domain DNS configuration, business SMTP email server setup, LiteSpeed cache acceleration, automated off-site daily backups, and malware protection.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80')
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `description`=VALUES(`description`), `short_desc`=VALUES(`short_desc`);

-- 3. Service Plans Table
CREATE TABLE IF NOT EXISTS `service_plans` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_id` INT NOT NULL,
  `plan_name` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `billing_period` VARCHAR(50) DEFAULT 'monthly',
  `features` LONGTEXT NOT NULL,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Plans
INSERT INTO `service_plans` (`id`, `service_id`, `plan_name`, `price`, `billing_period`, `features`) VALUES
(1, 1, 'Starter', 14999.00, 'monthly', '15 High-Intent Keywords, On-Page & Core Web Vitals Fixes, Search Console & GA4 Setup, Monthly Traffic Audit, GMB Profile Sync'),
(2, 1, 'Growth', 29999.00, 'monthly', '35 High-Commercial Keywords, 3 High DA (50+) Contextual Backlinks, Schema Graph Markup, Competitor Conquesting, CRO Audit, Bi-Weekly Strategy Reviews'),
(3, 1, 'Enterprise', 59999.00, 'monthly', 'Top 75+ High-Volume Keywords, 8 High-DA Editorial Backlinks/Mo, AI Overview (SGE) Strategy, E-Commerce Silo Architecture, Dedicated SEO Director, Weekly Live Tracking'),
(4, 2, 'Starter', 8999.00, 'monthly', 'Single Location GMB Optimization, 50 Local Citations & NAP Sync, Review Generation QR Kit, Weekly Geo-Tagged Posts, Monthly Maps Proximity Report'),
(5, 2, 'Growth', 17999.00, 'monthly', 'Up to 3 Business Locations, 120 Geo-Tagged Citations, Google Maps 3-Pack Rank Engine, Review Response Management, Local Press Release Backlinks'),
(6, 2, 'Enterprise', 34999.00, 'monthly', 'Multi-City Franchise Network (Up to 10 Locations), Hyper-Local City Landing Pages, Automated WhatsApp Review Booster, Dedicated Local Reputation Manager'),
(7, 3, 'Starter', 24999.00, 'one-time', '5-Page Responsive Business Site, WhatsApp Instant Chat + Forms, 1 Year NVMe Hosting & SSL, Full Technical SEO Included, 5-Day Delivery'),
(8, 3, 'Growth', 49999.00, 'one-time', '15 Custom Pages or E-Commerce (100 Products), Razorpay / Stripe Payment Gateway, Custom Client Portal & CMS, 95+ PageSpeed Guarantee, GA4 Tracking'),
(9, 3, 'Enterprise', 99999.00, 'one-time', 'Bespoke Web App / SaaS / Marketplace, Custom REST APIs & Database, Dedicated Cloud VPS Deployment (cPanel/AWS), DDoS Shield, 1 Year Priority SLA Support'),
(10, 4, 'Starter', 12999.00, 'monthly', 'Google Search Ads Setup & Optimization, Negative Keyword Shield, Up to ₹50,000 Ad Spend Management, Conversion Tracking, Monthly ROI Dashboard'),
(11, 4, 'Growth', 27999.00, 'monthly', 'Search + Shopping + YouTube Ads, Custom High-Converting Landing Page Design, Up to ₹2.5 Lakh Spend Management, A/B Split Testing, Bi-Weekly Calls'),
(12, 4, 'Enterprise', 54999.00, 'monthly', 'Omnichannel Performance Max (PMax) Funnels, Unlimited Ad Spend Management, CRM Offline Conversion Import, Dedicated PPC Director, Weekly Scaling Calls'),
(13, 5, 'Starter', 14999.00, 'monthly', '12 Custom Engagement Graphics, 4 High-Converting 4K Reels/Shorts, Instagram & Facebook Management, Hashtag SEO Strategy, Monthly Growth Report'),
(14, 5, 'Growth', 29999.00, 'monthly', '20 Custom Posts + 8 Reels, Meta Lead Gen Ads Management, Community DM Handling, LinkedIn Thought-Leadership for Founders, Competitor Benchmarking'),
(15, 5, 'Enterprise', 59999.00, 'monthly', 'Daily Content (30 Posts + 15 Viral Reels/Shorts), Full Influencer Outreach, Advanced Retargeting Funnels, Dedicated Designer & Video Editor Team'),
(16, 6, 'Starter', 4999.00, 'yearly', '1 Site on LiteSpeed cPanel, Free AutoSSL & Unlimited Corporate Emails, 15GB NVMe SSD Storage, Automated Weekly Backups, 99.9% Uptime Guarantee'),
(17, 6, 'Growth', 11999.00, 'yearly', 'Host Unlimited Websites, 75GB NVMe SSD Storage, Custom Socket SMTP Mail Setup, Daily Automated Cloud Backups, Free Site Migration'),
(18, 6, 'Enterprise', 24999.00, 'yearly', 'Dedicated Managed Cloud VPS (AWS/DigitalOcean), Full Root Access & WHM License, Cloudflare Enterprise CDN, 24/7 DevOps Monitoring, Real-Time Malware Shield')
ON DUPLICATE KEY UPDATE `price`=VALUES(`price`), `features`=VALUES(`features`);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `user_id` INT NOT NULL,
  `service_id` INT NOT NULL,
  `plan_name` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_status` ENUM('paid', 'pending', 'failed') DEFAULT 'paid',
  `order_status` ENUM('Order Placed', 'Under Review', 'In Progress', 'Delivered', 'On Hold') DEFAULT 'In Progress',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Enquiries / Leads Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `service_interest` VARCHAR(150) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'contacted', 'closed') DEFAULT 'new',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Jobs Table
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `requirements` LONGTEXT NOT NULL,
  `status` ENUM('open', 'closed') DEFAULT 'open',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `jobs` (`id`, `title`, `department`, `location`, `type`, `description`, `requirements`, `status`) VALUES
(1, 'Senior Technical SEO Strategist', 'SEO & Analytics', 'New Delhi / Remote', 'Full-time', 'Lead client SEO strategies, technical audits, and organic traffic growth campaigns for enterprise brands.', '3+ years experience in technical SEO, Google Search Console, Ahrefs, SEMrush, and schema implementation.', 'open'),
(2, 'Full-Stack Web Developer', 'Engineering', 'Bengaluru / Hybrid', 'Full-time', 'Build high-performance custom web applications, e-commerce portals, and enterprise APIs.', '2+ years experience in PHP, MySQL, JavaScript, HTML5/CSS3, and RESTful API design.', 'open')
ON DUPLICATE KEY UPDATE `title`=`title`;

-- 7. Blogs Table
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `excerpt` TEXT DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `author` VARCHAR(100) DEFAULT 'Bharat SEO Editorial',
  `status` ENUM('published', 'draft') DEFAULT 'published',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `blogs` (`id`, `title`, `slug`, `category`, `excerpt`, `content`, `image`, `author`) VALUES
(1, '10 Technical SEO Tactics to Rank #1 on Google India in 2026', '10-technical-seo-tactics-rank-1-google', 'SEO', 'Discover proven local and technical search engine optimization strategies tailored for Indian e-commerce and B2B brands.', 'Search engine algorithms evolve rapidly. To dominate local and national rankings in 2026, businesses must combine structured schema markup, sub-second page load times, and semantic keyword topical authority.', 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?auto=format&fit=crop&w=800&q=80', 'Vikramaditya Sharma'),
(2, 'Why Fast Website Loading Speed Drives Higher Google Rankings & Sales', 'fast-website-speed-drives-google-rankings', 'Web Development', 'Discover how 90+ Google PageSpeed scores reduce bounce rates, boost organic keyword rankings, and increase conversion rates.', 'In modern digital marketing, site speed is a direct ranking factor on Google. A website that loads in under 2 seconds retains 70% more visitors than a sluggish site.', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', 'Priya Patel')
ON DUPLICATE KEY UPDATE `title`=`title`;

-- 8. Team Members Table
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `designation` VARCHAR(150) NOT NULL,
  `photo` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `team_members` (`id`, `name`, `designation`, `photo`) VALUES
(1, 'Vikramaditya Sharma', 'Founder & Chief SEO Strategist', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'),
(2, 'Priya Patel', 'Head of Web Engineering', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'),
(3, 'Rohan Verma', 'Lead Performance Ads Specialist', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')
ON DUPLICATE KEY UPDATE `name`=`name`;

-- 9. Settings Table
CREATE TABLE IF NOT EXISTS `settings` (
  `key_name` VARCHAR(100) PRIMARY KEY,
  `value` LONGTEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settings` (`key_name`, `value`) VALUES
('site_name', 'Bharat SEO'),
('agency_tagline', 'Empowering Indian & Global Businesses with Data-Driven Digital Growth'),
('contact_email', 'ceo@bharatseo.site'),
('contact_phone', '+91 95208 68276'),
('whatsapp_number', '919520868276'),
('office_address', 'Bharat Tower, Connaught Place, New Delhi 110001'),
('razorpay_key_id', 'rzp_test_BHARATSEO2026'),
('google_client_id', '102938475612-bharatseo.apps.googleusercontent.com')
ON DUPLICATE KEY UPDATE `value`=VALUES(`value`);
