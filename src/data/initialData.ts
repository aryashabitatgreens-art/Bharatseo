import { Service, Job, Blog, TeamMember, Testimonial, SiteSettings, User, Order } from '../types';

export const initialSiteSettings: SiteSettings = {
  site_name: 'Bharat SEO',
  agency_tagline: 'Empowering Indian & Global Businesses with Data-Driven Digital Growth',
  contact_email: 'contact@bharatseo.in',
  contact_phone: '+91 98765 43210',
  whatsapp_number: '919876543210',
  office_address: 'Bharat Tower, 4th Floor, Connaught Place, New Delhi, 110001 / Tech Park, Indiranagar, Bengaluru',
  razorpay_key_id: 'rzp_test_BHARATSEO2026',
  google_client_id: '102938475612-bharatseo.apps.googleusercontent.com',
  smtp_host: 'smtp.bharatseo.in',
  smtp_user: 'noreply@bharatseo.in',
};

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    category: 'SEO',
    title: 'Search Engine Optimization (SEO)',
    slug: 'search-engine-optimization',
    short_desc: 'Dominate Google rankings with high-intent keywords, technical audits, and organic backlink strategies.',
    description: 'Our comprehensive SEO services help your business achieve top positions on Google search results. We combine deep keyword research, technical site fixes, high-authority link building, and local SEO optimizations tailored for the Indian and international markets.',
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
        features: ['10 Keywords Optimization', 'On-Page & Technical SEO Fixes', 'Google Search Console Setup', 'Monthly Progress Report', 'Local Google Business Profile SEO']
      },
      {
        id: 'p-102',
        service_id: 'srv-1',
        plan_name: 'Growth',
        price: 29999,
        billing_period: 'monthly',
        features: ['25 Keywords Target', 'Comprehensive Content Audit', '2 High-DA Backlinks / Month', 'Competitor Keyword Conquesting', 'Bi-weekly Strategy Calls', 'Schema Markup Integration']
      },
      {
        id: 'p-103',
        service_id: 'srv-1',
        plan_name: 'Enterprise',
        price: 59999,
        billing_period: 'monthly',
        features: ['Unlimited / Top 50 Keywords', 'Dedicated Senior SEO Manager', '5 High-DA Contextual Backlinks', 'E-commerce / Multi-location SEO', 'Weekly Keyword Tracking', '24/7 Priority Support']
      }
    ]
  },
  {
    id: 'srv-2',
    category: 'Web Development',
    title: 'Custom Web Development & E-Commerce',
    slug: 'custom-web-development',
    short_desc: 'High-speed, SEO-ready websites, web apps, and Shopify/WooCommerce stores engineered for conversions.',
    description: 'We craft high-performance websites built with clean architecture, mobile-first design, fast loading speeds (Core Web Vitals optimized), and secure payment integration. From custom portals to e-commerce storefronts, we build for scale.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    icon: 'Code',
    status: 'active',
    plans: [
      {
        id: 'p-201',
        service_id: 'srv-2',
        plan_name: 'Starter',
        price: 19999,
        billing_period: 'one-time',
        features: ['5 Page Business Website', 'Mobile & Tablet Responsive', 'Contact Form + WhatsApp Chat', '1 Year Free Hosting & SSL', 'Basic On-Page SEO Included']
      },
      {
        id: 'p-202',
        service_id: 'srv-2',
        plan_name: 'Growth',
        price: 44999,
        billing_period: 'one-time',
        features: ['Up to 15 Pages / E-Commerce (50 Products)', 'Payment Gateway Integration (Razorpay/PayU)', 'Custom Admin Panel Dashboard', 'Speed Optimization (90+ PageSpeed)', 'Google Analytics & Tag Manager']
      },
      {
        id: 'p-203',
        service_id: 'srv-2',
        plan_name: 'Enterprise',
        price: 89999,
        billing_period: 'one-time',
        features: ['Full Custom Web Application / Marketplace', 'Scalable Database & API Integration', 'Dedicated Server Setup (cPanel/VPS)', 'Advanced Security & DDoS Protection', '1 Year Maintenance & SLA Support']
      }
    ]
  },
  {
    id: 'srv-3',
    category: 'PPC / Ads',
    title: 'Google Ads & Performance Marketing',
    slug: 'google-ads-ppc',
    short_desc: 'Maximize ROI with hyper-targeted Google Search, Shopping, Display, and Remarketing ad campaigns.',
    description: 'Stop burning money on ineffective ads. Bharat SEO specializes in high-converting PPC campaigns with rigorous A/B testing, negative keyword lists, conversion tracking, and Landing Page Optimization.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    icon: 'Target',
    status: 'active',
    plans: [
      {
        id: 'p-301',
        service_id: 'srv-3',
        plan_name: 'Starter',
        price: 11999,
        billing_period: 'monthly',
        features: ['Google Search Ads Setup', 'Keyword & Negative List Creation', 'Up to ₹50k Ad Budget Management', 'Monthly Performance Dashboard']
      },
      {
        id: 'p-302',
        service_id: 'srv-3',
        plan_name: 'Growth',
        price: 24999,
        billing_period: 'monthly',
        features: ['Google Search + Shopping + Display Ads', 'Conversion Tracking & Pixel Setup', 'Up to ₹2 Lakh Ad Budget Management', 'Custom High-Converting Landing Page', 'A/B Ad Creative Testing']
      },
      {
        id: 'p-303',
        service_id: 'srv-3',
        plan_name: 'Enterprise',
        price: 49999,
        billing_period: 'monthly',
        features: ['Omnichannel PPC Strategy', 'YouTube Ads + Remarketing Funnels', 'Unlimited Ad Spend Management', 'Dedicated Performance Marketer', 'Weekly ROAS Optimization Calls']
      }
    ]
  },
  {
    id: 'srv-4',
    category: 'Social Media',
    title: 'Social Media Growth & Meta Ads',
    slug: 'social-media-marketing',
    short_desc: 'Build an engaging brand presence on Instagram, Facebook, LinkedIn with viral reels, graphics & ads.',
    description: 'Engage your audience where they hang out. We create eye-catching social media graphics, trending Reels, community management, and targeted Instagram & Meta lead generation ads.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    icon: 'Share2',
    status: 'active',
    plans: [
      {
        id: 'p-401',
        service_id: 'srv-4',
        plan_name: 'Starter',
        price: 12999,
        billing_period: 'monthly',
        features: ['12 Custom Graphics / Month', '4 Engaging Reels Video Editing', 'Instagram & Facebook Management', 'Hashtag & Caption Strategy']
      },
      {
        id: 'p-402',
        service_id: 'srv-4',
        plan_name: 'Growth',
        price: 26999,
        billing_period: 'monthly',
        features: ['20 Custom Posts + 8 Reels', 'Meta Lead Ads Campaign Setup', 'Community & DM Response Management', 'LinkedIn Brand Building for Founders', 'Monthly Competitor Analysis']
      },
      {
        id: 'p-403',
        service_id: 'srv-4',
        plan_name: 'Enterprise',
        price: 54999,
        billing_period: 'monthly',
        features: ['Daily Content (30 Posts + 15 Reels)', 'Full Influencer Marketing Strategy', 'Advanced Retargeting Meta Ads', 'Dedicated Graphic Designer & Copywriter', 'Brand Reputation Management']
      }
    ]
  },
  {
    id: 'srv-5',
    category: 'Hosting & Deployment',
    title: 'Cloud Hosting, cPanel & VPS Deployment',
    slug: 'cloud-hosting-deployment',
    short_desc: 'Secure, lightning-fast web deployment on cPanel, LiteSpeed, AWS, or DigitalOcean with zero downtime.',
    description: 'We manage your infrastructure so you can focus on growing. Complete domain setup, SSL certificates, SMTP mail server configuration, automated daily backups, and cPanel/VPS server hardening.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    icon: 'Server',
    status: 'active',
    plans: [
      {
        id: 'p-501',
        service_id: 'srv-5',
        plan_name: 'Starter',
        price: 4999,
        billing_period: 'yearly',
        features: ['1 Website Hosting on LiteSpeed cPanel', 'Free SSL & Business Email Accounts', '10GB NVMe SSD Storage', 'Automated Weekly Backups', '99.9% Uptime SLA']
      },
      {
        id: 'p-502',
        service_id: 'srv-5',
        plan_name: 'Growth',
        price: 11999,
        billing_period: 'yearly',
        features: ['Host Unlimited Websites', '50GB NVMe SSD Storage', 'Custom Socket SMTP Setup for Mail', 'Daily Offsite Backups', 'Free Migration from Old Host']
      },
      {
        id: 'p-503',
        service_id: 'srv-5',
        plan_name: 'Enterprise',
        price: 24999,
        billing_period: 'yearly',
        features: ['Managed AWS / DigitalOcean Dedicated VPS', 'Root Access & cPanel / WHM License', 'Cloudflare Enterprise CDN Setup', '24/7 DevOps Server Monitoring', 'Proactive Malware Scanning & Cleanup']
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
    email: 'admin@bharatseo.in',
    phone: '+91 98765 00000',
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
