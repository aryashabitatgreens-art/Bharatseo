import { Service, Job, Blog, TeamMember, Testimonial, SiteSettings, User, Order } from '../types';

export const initialSiteSettings: SiteSettings = {
  site_name: 'Bharat SEO',
  agency_tagline: 'Empowering Indian & Global Businesses with Data-Driven Digital Growth',
  contact_email: 'ceo@bharatseo.site',
  contact_phone: '+91 95208 68276',
  whatsapp_number: '919520868276',
  office_address: 'Bharat Tower, 4th Floor, Connaught Place, New Delhi, 110001 / Tech Park, Indiranagar, Bengaluru',
  razorpay_key_id: 'rzp_test_BHARATSEO2026',
  google_client_id: '102938475612-bharatseo.apps.googleusercontent.com',
  smtp_host: 'smtp.bharatseo.site',
  smtp_user: 'ceo@bharatseo.site',
};

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    category: 'SEO',
    title: 'Technical & Organic SEO Dominance',
    slug: 'technical-organic-seo-campaigns',
    short_desc: 'Dominate Google Page #1 rankings with AI Overview optimization, high-intent commercial keywords, and high-DA authority backlinks.',
    description: 'Our enterprise SEO campaigns help your brand capture top spots on Google Search for high-value commercial keywords. We integrate deep keyword research, Core Web Vitals speed tuning, high-authority editorial link acquisition, and AI Overview (SGE) optimization.',
    image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=800&q=80',
    icon: 'TrendingUp',
    status: 'active',
    plans: [
      {
        id: 'p-101',
        service_id: 'srv-1',
        plan_name: 'Starter',
        price: 14999,
        billing_period: 'monthly',
        features: [
          '15 High-Intent Commercial Keywords',
          'On-Page & Core Web Vitals Optimization',
          'Google Search Console & GA4 Setup',
          'Monthly Ranking & Traffic Audit',
          'Google Business Profile (GMB) Sync'
        ]
      },
      {
        id: 'p-102',
        service_id: 'srv-1',
        plan_name: 'Growth',
        price: 29999,
        billing_period: 'monthly',
        features: [
          '35 Targeted Commercial Keywords',
          '3 High DA (50+) Contextual Editorial Backlinks',
          'Technical Schema Graph Markup & Fixes',
          'Competitor Keyword Conquesting & Gap Analysis',
          'Conversion Rate Optimization (CRO) Audit',
          'Bi-weekly Strategy & Performance Review'
        ]
      },
      {
        id: 'p-103',
        service_id: 'srv-1',
        plan_name: 'Enterprise',
        price: 59999,
        billing_period: 'monthly',
        features: [
          'Top 75+ High-Volume Search Keywords',
          '8 High-DA Contextual Editorial Backlinks / Month',
          'AI Overview (SGE) & Semantic Topical Authority',
          'E-Commerce Multi-Category Silo Architecture',
          '24/7 Dedicated Senior SEO Account Director',
          'Weekly Live Keyword Position Tracking'
        ]
      }
    ]
  },
  {
    id: 'srv-2',
    category: 'SEO',
    title: 'Local SEO & Google Maps (3-Pack) Ranking',
    slug: 'local-seo-gmb-ranking',
    short_desc: 'Capture nearby customers and dominate the Google Local 3-Pack with hyper-local citations, review automation, and geo-targeted landing pages.',
    description: 'Transform your physical store, clinic, or regional agency into the #1 searched service in your city. We optimize your Google Business Profile (GBP), deploy geo-tagged photo citations, manage reputation, and build hyper-local authority.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    icon: 'TrendingUp',
    status: 'active',
    plans: [
      {
        id: 'p-201',
        service_id: 'srv-2',
        plan_name: 'Starter',
        price: 8999,
        billing_period: 'monthly',
        features: [
          'Single Location Google Profile (GMB) Optimization',
          '50 High-Authority Local Indian Citations',
          'Review Generation QR Code & SMS Kit',
          'Weekly Geo-Tagged Media Updates',
          'Monthly Google Maps Proximity Report'
        ]
      },
      {
        id: 'p-202',
        service_id: 'srv-2',
        plan_name: 'Growth',
        price: 17999,
        billing_period: 'monthly',
        features: [
          'Up to 3 Business Locations Optimized',
          '120 Premium Geo-Tagged Local Citations',
          'Google Maps 3-Pack Proximity Ranking Engine',
          'Competitor Review Interception & Response Management',
          'Local Press Release Distribution & Backlinks',
          'Bi-Weekly Local Traffic Analytics'
        ]
      },
      {
        id: 'p-203',
        service_id: 'srv-2',
        plan_name: 'Enterprise',
        price: 34999,
        billing_period: 'monthly',
        features: [
          'Multi-City Franchise Network (Up to 10 Locations)',
          'Dedicated Hyper-Local City Landing Pages',
          'Automated WhatsApp 5-Star Review Booster',
          'Local Geo-Fence Ad Integration',
          'Dedicated Local Reputation Strategist'
        ]
      }
    ]
  },
  {
    id: 'srv-3',
    category: 'Web Development',
    title: 'Custom Web Development & E-Commerce',
    slug: 'custom-web-development-ecommerce',
    short_desc: 'Lightning-fast, mobile-first websites, web portals, and Shopify/WooCommerce stores engineered for 95+ PageSpeed and high conversions.',
    description: 'We craft bespoke web platforms with clean architecture, sub-second TTFB, seamless mobile responsiveness, and bank-grade payment security. From enterprise portals to multi-vendor e-commerce stores, we build for conversion and scale.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    icon: 'Code',
    status: 'active',
    plans: [
      {
        id: 'p-301',
        service_id: 'srv-3',
        plan_name: 'Starter',
        price: 24999,
        billing_period: 'one-time',
        features: [
          '5-Page Responsive Modern Business Website',
          'WhatsApp Instant Chat + Inquiry Lead Forms',
          '1 Year High-Speed NVMe Hosting & SSL Certificate',
          'Full On-Page Technical SEO & Schema Included',
          'Delivered Within 5 Business Days'
        ]
      },
      {
        id: 'p-302',
        service_id: 'srv-3',
        plan_name: 'Growth',
        price: 49999,
        billing_period: 'one-time',
        features: [
          'Up to 15 Custom Pages or E-Commerce Store (100 Products)',
          'Razorpay / Stripe / PayU Payment Gateway Integration',
          'Custom Client Portal & Admin CMS Dashboard',
          '95+ Google PageSpeed Optimization Guarantee',
          'GA4 Enhanced E-commerce & Tag Manager Tracking',
          '30 Days Post-Launch Maintenance & Training'
        ]
      },
      {
        id: 'p-303',
        service_id: 'srv-3',
        plan_name: 'Enterprise',
        price: 99999,
        billing_period: 'one-time',
        features: [
          'Bespoke Web Application / SaaS / Multi-Vendor Marketplace',
          'Custom Scalable Database Architecture & REST APIs',
          'Dedicated Cloud VPS Deployment (cPanel / AWS / DigitalOcean)',
          'Enterprise DDoS & WAF Firewall Security Hardening',
          '1 Year Priority SLA Support & Maintenance Contract'
        ]
      }
    ]
  },
  {
    id: 'srv-4',
    category: 'PPC / Ads',
    title: 'Google Ads & High-ROAS Performance Marketing',
    slug: 'google-ads-ppc-marketing',
    short_desc: 'Stop wasting ad spend. Maximize Return on Ad Spend (ROAS) with hyper-targeted Google Search, Shopping, YouTube, and Performance Max campaigns.',
    description: 'We design high-converting PPC campaigns with rigorous A/B ad creative testing, high-intent negative keyword moats, advanced conversion pixel tracking, and dedicated landing page optimization to deliver maximum lead quality.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    icon: 'Target',
    status: 'active',
    plans: [
      {
        id: 'p-401',
        service_id: 'srv-4',
        plan_name: 'Starter',
        price: 12999,
        billing_period: 'monthly',
        features: [
          'Google Search Ads Setup & Optimization',
          'Negative Keyword List Creation & Bid Tuning',
          'Up to ₹50,000 Monthly Ad Budget Management',
          'Conversion Tracking & Lead Form Integration',
          'Monthly Transparent ROI Dashboard'
        ]
      },
      {
        id: 'p-402',
        service_id: 'srv-4',
        plan_name: 'Growth',
        price: 27999,
        billing_period: 'monthly',
        features: [
          'Google Search + Shopping + YouTube Ads',
          'Custom High-Converting Landing Page Design Included',
          'Up to ₹2.5 Lakh Ad Budget Management',
          'A/B Creative & Headline Copy Split Testing',
          'Dynamic Remarketing Funnel Setup',
          'Bi-Weekly ROAS Optimization & Strategy Calls'
        ]
      },
      {
        id: 'p-403',
        service_id: 'srv-4',
        plan_name: 'Enterprise',
        price: 54999,
        billing_period: 'monthly',
        features: [
          'Omnichannel Performance Max (PMax) Architecture',
          'Unlimited Monthly Ad Spend Management',
          'Advanced CRM Offline Conversion Import (Sales Sync)',
          'Dedicated Certified Google Ads Performance Lead',
          'Weekly Live Scaling & Attribution Calls'
        ]
      }
    ]
  },
  {
    id: 'srv-5',
    category: 'Social Media',
    title: 'Social Media Growth, Meta Ads & Viral Reels',
    slug: 'social-media-marketing-reels',
    short_desc: 'Build an authoritative brand presence on Instagram, Facebook, and LinkedIn with trending 4K Reels, lead-generation ad funnels, and community engagement.',
    description: 'Transform social media from vanity metrics into revenue. We produce eye-catching carousel designs, viral video Reels/Shorts editing, founder brand building on LinkedIn, and high-converting Meta lead generation ads.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    icon: 'Share2',
    status: 'active',
    plans: [
      {
        id: 'p-501',
        service_id: 'srv-5',
        plan_name: 'Starter',
        price: 14999,
        billing_period: 'monthly',
        features: [
          '12 Custom High-Engagement Brand Graphics',
          '4 High-Converting Edited 4K Reels / Shorts',
          'Instagram & Facebook Complete Management',
          'Hashtag & Caption SEO Strategy',
          'Monthly Growth & Impressions Report'
        ]
      },
      {
        id: 'p-502',
        service_id: 'srv-5',
        plan_name: 'Growth',
        price: 29999,
        billing_period: 'monthly',
        features: [
          '20 Custom Brand Posts + 8 Engaging Reels',
          'Meta Lead Generation Ads Campaign Management',
          'Community Direct Message (DM) & Comment Response',
          'LinkedIn Thought-Leadership Branding for Founders',
          'Monthly Competitor Content Benchmark Analysis'
        ]
      },
      {
        id: 'p-503',
        service_id: 'srv-5',
        plan_name: 'Enterprise',
        price: 59999,
        billing_period: 'monthly',
        features: [
          'Daily Active Content (30 Posts + 15 Viral Reels / Shorts)',
          'Full Influencer Outreach & Collaboration Management',
          'Advanced Omnichannel Retargeting Meta Funnels',
          'Dedicated Graphic Designer, Video Editor & Copywriter Team',
          'Brand Reputation & Crisis Management'
        ]
      }
    ]
  },
  {
    id: 'srv-6',
    category: 'Hosting & Deployment',
    title: 'Cloud Infrastructure, cPanel & VPS Hardening',
    slug: 'cloud-hosting-vps-deployment',
    short_desc: 'Ultra-secure, lightning-fast web deployment on LiteSpeed cPanel, AWS, or DigitalOcean with zero downtime, SSL, and automated off-site backups.',
    description: 'We take complete care of your digital infrastructure so your website never crashes. Complete domain DNS configuration, business SMTP email server setup, LiteSpeed cache acceleration, automated off-site daily backups, and malware protection.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    icon: 'Server',
    status: 'active',
    plans: [
      {
        id: 'p-601',
        service_id: 'srv-6',
        plan_name: 'Starter',
        price: 4999,
        billing_period: 'yearly',
        features: [
          '1 Website on LiteSpeed Enterprise cPanel Hosting',
          'Free AutoSSL & Unlimited Corporate Email Accounts',
          '15GB High-Speed NVMe SSD Storage',
          'Automated Weekly Off-Site Cloud Backups',
          '99.9% Uptime SLA Guarantee'
        ]
      },
      {
        id: 'p-602',
        service_id: 'srv-6',
        plan_name: 'Growth',
        price: 11999,
        billing_period: 'yearly',
        features: [
          'Host Unlimited Websites with Unlimited Bandwidth',
          '75GB NVMe SSD High-Speed Storage',
          'Custom Socket SMTP Setup for 100% Inbox Delivery',
          'Daily Automated Off-Site Backups & 1-Click Restore',
          'Free White-Glove Migration from Previous Host'
        ]
      },
      {
        id: 'p-603',
        service_id: 'srv-6',
        plan_name: 'Enterprise',
        price: 24999,
        billing_period: 'yearly',
        features: [
          'Dedicated Managed AWS / DigitalOcean Cloud VPS',
          'Full Root Access & cPanel / WHM License Included',
          'Cloudflare Enterprise Edge CDN & DDoS Defense',
          '24/7 DevOps Server Health Monitoring',
          'Proactive Kernel Hardening & Real-Time Malware Shield'
        ]
      }
    ]
  }
];

export const initialJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior SEO Strategist',
    department: 'Digital Marketing',
    location: 'New Delhi / Remote',
    type: 'Full-time',
    description: 'We are seeking an experienced Senior SEO Strategist to lead organic search campaigns for key ecommerce and SaaS clients. You will conduct deep technical audits, design link-building campaigns, and manage a team of junior SEO analysts.',
    requirements: [
      '3+ years experience in technical and content SEO',
      'Proficiency in Ahrefs, SEMrush, Screaming Frog, Google Search Console',
      'Proven track record of ranking high-competition keywords',
      'Strong analytical mindset and client reporting skills'
    ],
    status: 'open',
    created_at: '2026-08-01'
  },
  {
    id: 'job-2',
    title: 'Full-Stack Web Developer',
    department: 'Engineering',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    description: 'Join our web development team to build high-performance custom websites, e-commerce portals, and enterprise web applications for growing brands.',
    requirements: [
      '2+ years experience in Full-Stack Web Engineering (Frontend & Node/APIs)',
      'Experience with REST APIs, Payment Gateway integrations (Razorpay)',
      'Understanding of modern web security, cloud hosting, and database design',
      'Strong eye for UI/UX responsiveness and speed optimization'
    ],
    status: 'open',
    created_at: '2026-08-05'
  },
  {
    id: 'job-3',
    title: 'PPC & Performance Marketer',
    department: 'Performance',
    location: 'Remote',
    type: 'Full-time',
    description: 'Manage high-budget Google Ads and Meta Ads campaigns. Analyze ROAS, build retargeting funnels, and optimize conversion pathways for client brands.',
    requirements: [
      'Hands-on experience managing Google Search, Shopping, and Facebook Ads',
      'Google Ads & Analytics Certified preferred',
      'Strong copywriting and landing page optimization skills',
      'Ability to deliver measurable ROI'
    ],
    status: 'open',
    created_at: '2026-08-08'
  },
  {
    id: 'job-4',
    title: 'Social Media & Content Intern',
    department: 'Content & Media',
    location: 'New Delhi',
    type: 'Internship',
    description: 'Exciting internship for creative minds! Create social media posts, edit short reels, write blog captions, and engage with online communities.',
    requirements: [
      'Passion for social media trends and content creation',
      'Basic knowledge of Canva, CapCut, or Adobe Premiere',
      'Good written English and Hindi communication',
      'Duration: 3 to 6 months with stipend + pre-placement offer'
    ],
    status: 'open',
    created_at: '2026-08-10'
  }
];

export const initialBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Top 10 SEO Strategies for Indian Businesses in 2026',
    slug: 'top-seo-strategies-indian-businesses-2026',
    category: 'SEO',
    excerpt: 'Learn how localized keyword intent, AI search optimization (SGE), and Core Web Vitals can quadruple your organic traffic.',
    content: `SEO in 2026 is no longer just about stuffing keywords. With Search Generative Experience (SGE) and voice search in Indian regional languages expanding rapidly, brands must adopt a holistic organic strategy.

1. Local Schema & Business Profile Optimization
Ensure your Google Business Profile is 100% complete with local citations in your target city.

2. Intent-Based Content Clusters
Create topical authority by covering every sub-topic related to your service.

3. Mobile-First Page Speed
Indian mobile users expect websites to load in under 2 seconds even on 4G/5G connections. Optimize images, leverage LiteSpeed caching, and clean up bloated code.

4. High Quality Editorial Backlinks
Focus on earning contextual backlinks from reputable Indian news, tech, and industry blogs.`,
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80',
    author: 'Aarav Sharma',
    status: 'published',
    created_at: '2026-08-02',
    read_time: '5 min read'
  },
  {
    id: 'blog-2',
    title: 'Why Fast Website Loading Speed Drives Higher Google Rankings & Sales',
    slug: 'fast-website-speed-drives-google-rankings',
    category: 'Web Development',
    excerpt: 'Discover how 90+ Google PageSpeed scores reduce bounce rates, boost organic keyword rankings, and increase conversion rates for businesses.',
    content: `In modern digital marketing, site speed is a direct ranking factor on Google. A website that loads in under 2 seconds retains 70% more visitors than a sluggish site.

Key Best Practices:
- Sub-Second Response Times: Clean frontend code and optimized server APIs.
- Mobile First Design: Responsive layout tailored for 5G & 4G smartphone users.
- Automated Image Compression: Modern WebP formats and lazy loading assets.
- Secure API Integrations: Enterprise SSL, encrypted forms, and isolated server gateways.`,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    author: 'Priya Patel',
    status: 'published',
    created_at: '2026-08-06',
    read_time: '4 min read'
  },
  {
    id: 'blog-3',
    title: 'How to Achieve a 5x ROAS with Meta Lead Ads & WhatsApp Automation',
    slug: 'achieve-5x-roas-meta-ads-whatsapp',
    category: 'PPC / Ads',
    excerpt: 'Step-by-step guide to connecting Instant Forms with immediate WhatsApp auto-responders to double lead conversion rates.',
    content: `Speed to lead is everything in modern digital marketing. When a customer fills out a lead form on Facebook or Instagram, calling or messaging them within 2 minutes increases conversion rates by over 300%.

In this article, we break down how Bharat SEO builds high-performing lead generation funnels that trigger instant automated WhatsApp greetings and custom follow-up sequences.`,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    author: 'Rohan Mehta',
    status: 'published',
    created_at: '2026-08-09',
    read_time: '6 min read'
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Aarav Sharma',
    designation: 'Founder & CEO / Chief SEO Strategist',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    order_no: 1
  },
  {
    id: 'team-2',
    name: 'Priya Patel',
    designation: 'Head of Web Engineering',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
    order_no: 2
  },
  {
    id: 'team-3',
    name: 'Rohan Mehta',
    designation: 'PPC & Performance Lead',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    order_no: 3
  },
  {
    id: 'team-4',
    name: 'Ananya Verma',
    designation: 'Creative & Social Media Director',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: 'https://linkedin.com' },
    order_no: 4
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    client_name: 'Rajesh K. Agarwal',
    company: 'Agarwal Healthcare Ltd., Delhi',
    message: 'Bharat SEO transformed our online presence. Within 4 months, our organic search traffic grew by 350% and local patient inquiries doubled! Extremely professional team.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    client_name: 'Sunita Reddy',
    company: 'SouthBites Cloud Kitchen, Bengaluru',
    message: 'Their web development team built our custom online ordering portal and integrated Razorpay smoothly. The order tracking dashboard keeps our kitchen organized!',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    client_name: 'Vikram Singh',
    company: 'Jaipur Crafts & Jewels',
    message: 'Our Meta ads campaign executed by Bharat SEO delivered an incredible 6.4x ROAS on our handcrafted jewelry store. Highly recommended for any Indian business.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export const initialUsers: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Bharat Admin',
    email: 'ceo@bharatseo.site',
    phone: '+91 95208 68276',
    role: 'admin',
    status: 'active',
    created_at: '2026-01-01'
  },
  {
    id: 'usr-demo-1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 99887 76655',
    role: 'user',
    status: 'active',
    created_at: '2026-08-01'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    order_number: 'BS-2026-1001',
    user_id: 'usr-demo-1',
    user_name: 'Rajesh Kumar',
    user_email: 'rajesh@example.com',
    service_id: 'srv-1',
    service_title: 'Search Engine Optimization (SEO)',
    plan_id: 'p-102',
    plan_name: 'Growth',
    amount: 29999,
    payment_status: 'paid',
    order_status: 'In Progress',
    created_at: '2026-08-05 10:30:00',
    updates: [
      {
        id: 'upd-1',
        order_id: 'ord-1001',
        status: 'Order Placed',
        note: 'Payment received via Razorpay (Txn ID: pay_P1001XYZ). Order initialized.',
        created_at: '2026-08-05 10:30:00'
      },
      {
        id: 'upd-2',
        order_id: 'ord-1001',
        status: 'Under Review',
        note: 'SEO Specialist assigned. Site audit and keyword target research initiated.',
        created_at: '2026-08-06 11:15:00'
      },
      {
        id: 'upd-3',
        order_id: 'ord-1001',
        status: 'In Progress',
        note: 'On-page technical fixes completed. 25 primary keywords indexed for tracking.',
        created_at: '2026-08-08 14:20:00'
      }
    ]
  }
];
