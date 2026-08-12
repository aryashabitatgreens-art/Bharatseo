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
('Bharat SEO Admin', 'admin@bharatseo.in', '+91 98765 43210', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHe1fS3X93mJ4OaF9M1l9v6Q2qXwP2s1W', 'admin', 'active')
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
(1, 'SEO', 'Technical & Local Google SEO', 'google-seo-campaigns', 'Dominate Google Page 1 search results with data-backed keyword optimization, high-authority link building, and local GMB rankings.', 'Comprehensive SEO campaigns engineered to rank your website organically on Google search for high-converting commercial keywords.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'),
(2, 'Web Development', 'Custom Web & E-Commerce Engineering', 'custom-web-development', 'High-speed custom websites, web portals, and e-commerce stores designed for 95+ PageSpeed performance and maximum sales conversions.', 'Bespoke web applications built with modern frontend responsive layouts, payment gateway integration, and secure backend APIs.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'),
(3, 'PPC / Ads', 'Google & Meta Performance Ads', 'google-meta-ppc-ads', 'Data-driven paid advertisement campaigns across Google Search, Instagram Reels, and Facebook to generate instant, qualified leads.', 'Maximize Return on Ad Spend (ROAS) with hyper-targeted audience campaigns, custom landing pages, and automated lead routing.', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80')
ON DUPLICATE KEY UPDATE `title`=`title`;

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
(1, 1, 'Starter', 14999.00, 'monthly', 'Target 10 Main Keywords, On-Page SEO & Meta Tags, Google Business Profile (GMB) Setup, Monthly Ranking Report'),
(2, 1, 'Growth', 29999.00, 'monthly', 'Target 25 Main Keywords, High PR Backlink Building, Technical Schema & Speed Tuning, Dedicated SEO Strategist'),
(3, 1, 'Enterprise', 59999.00, 'monthly', '50+ High-Volume Keywords, Custom Content Strategy, Competitor Ad Hijacking, 24/7 Dedicated Support'),
(4, 2, 'Starter', 24999.00, 'one-time', '5-Page Responsive Business Site, WhatsApp Chat Integration, SSL Certificate & Fast Hosting Setup, Basic On-Page SEO'),
(5, 2, 'Growth', 49999.00, 'one-time', '15-Page Custom Web App, Razorpay Payment Gateway, Admin CMS Panel, 95+ Google PageSpeed Guarantee'),
(6, 2, 'Enterprise', 99999.00, 'one-time', 'Full E-Commerce Portal / SaaS Engine, Multi-Vendor Capabilities, Custom ERP/CRM Sync, Priority Maintenance')
ON DUPLICATE KEY UPDATE `price`=`price`;

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
('contact_email', 'contact@bharatseo.in'),
('contact_phone', '+91 98765 43210'),
('whatsapp_number', '919876543210'),
('office_address', 'Bharat Tower, Connaught Place, New Delhi 110001'),
('razorpay_key_id', 'rzp_test_BHARATSEO2026'),
('google_client_id', '102938475612-bharatseo.apps.googleusercontent.com')
ON DUPLICATE KEY UPDATE `value`=VALUES(`value`);
