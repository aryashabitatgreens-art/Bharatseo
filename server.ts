import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  initialSiteSettings,
  initialServices,
  initialJobs,
  initialBlogs,
  initialTeam,
  initialTestimonials,
  initialUsers,
  initialOrders
} from './src/data/initialData.ts';
import {
  User,
  Service,
  Job,
  JobApplication,
  Blog,
  TeamMember,
  Testimonial,
  Enquiry,
  SupportTicket,
  Order,
  Payment,
  SiteSettings
} from './src/types.ts';

// In-memory data store with initial values
let siteSettings: SiteSettings = { ...initialSiteSettings };
let services: Service[] = [...initialServices];
let jobs: Job[] = [...initialJobs];
let blogs: Blog[] = [...initialBlogs];
let teamMembers: TeamMember[] = [...initialTeam];
let testimonials: Testimonial[] = [...initialTestimonials];
let users: User[] = [...initialUsers];
let orders: Order[] = [...initialOrders];

let jobApplications: JobApplication[] = [
  {
    id: 'app-1',
    job_id: 'job-1',
    job_title: 'Senior SEO Strategist',
    name: 'Siddharth Rao',
    email: 'siddharth@example.com',
    phone: '+91 91234 56789',
    resume_filename: 'siddharth_seo_resume.pdf',
    cover_message: '5 years experience ranking e-commerce portals. Managed $10k/mo SEO budgets.',
    status: 'Shortlisted',
    created_at: '2026-08-07 15:45:00'
  }
];

let enquiries: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Amitabh Choudhury',
    email: 'amitabh@textiles.in',
    phone: '+91 98111 22334',
    service_interest: 'Custom Web Development & E-Commerce',
    message: 'Looking to upgrade our traditional textile B2B site to a modern Shopify / custom React portal.',
    source: 'Website Contact Form',
    status: 'new',
    created_at: '2026-08-11 09:12:00'
  }
];

let supportTickets: SupportTicket[] = [
  {
    id: 'tkt-101',
    ticket_number: 'TKT-2026-101',
    user_id: 'usr-demo-1',
    user_name: 'Rajesh Kumar',
    order_id: 'ord-1001',
    subject: 'Request for Google Search Console Access',
    message: 'Hi team, please share the delegation email to invite us to Search Console.',
    status: 'Open',
    created_at: '2026-08-09 16:00:00',
    replies: [
      {
        id: 'rep-1',
        sender: 'admin',
        sender_name: 'Aarav Sharma (Admin)',
        message: 'Hello Rajesh, please grant access to seo-team@bharatseo.in in Search Console settings.',
        created_at: '2026-08-10 10:30:00'
      }
    ]
  }
];

let payments: Payment[] = [
  {
    id: 'pay-1',
    order_id: 'ord-1001',
    order_number: 'BS-2026-1001',
    user_id: 'usr-demo-1',
    user_name: 'Rajesh Kumar',
    txn_id: 'pay_P1001XYZ',
    amount: 29999,
    gateway: 'Razorpay',
    status: 'success',
    created_at: '2026-08-05 10:30:00'
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // --- API ROUTES --- //

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', agency: 'Bharat SEO', timestamp: new Date().toISOString() });
  });

  // Settings
  app.get('/api/settings', (req, res) => {
    res.json(siteSettings);
  });

  app.post('/api/settings', (req, res) => {
    siteSettings = { ...siteSettings, ...req.body };
    res.json({ success: true, settings: siteSettings });
  });

  // Auth
  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone: phone || '',
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    res.json({ success: true, user: newUser });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (user.status === 'blocked') {
      return res.status(403).json({ error: 'Account is suspended. Please contact support.' });
    }

    res.json({ success: true, user });
  });

  app.post('/api/auth/google-login', (req, res) => {
    const { email, name, google_id, profile_photo } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Google login requires email and name' });
    }

    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: 'usr-g-' + Date.now(),
        name,
        email,
        phone: '',
        google_id: google_id || 'google-' + Math.random().toString(36).substring(2, 9),
        profile_photo: profile_photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: 'user',
        status: 'active',
        created_at: new Date().toISOString().split('T')[0]
      };
      users.push(user);
    }

    res.json({ success: true, user });
  });

  // Services & Plans
  app.get('/api/services', (req, res) => {
    res.json(services);
  });

  app.post('/api/services', (req, res) => {
    const newService: Service = {
      id: 'srv-' + Date.now(),
      category: req.body.category || 'SEO',
      title: req.body.title || 'New Agency Service',
      slug: (req.body.title || 'service').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      short_desc: req.body.short_desc || '',
      description: req.body.description || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      icon: req.body.icon || 'Star',
      status: req.body.status || 'active',
      plans: req.body.plans || []
    };
    services.push(newService);
    res.json({ success: true, service: newService });
  });

  app.put('/api/services/:id', (req, res) => {
    const idx = services.findIndex(s => s.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Service not found' });
    services[idx] = { ...services[idx], ...req.body };
    res.json({ success: true, service: services[idx] });
  });

  app.delete('/api/services/:id', (req, res) => {
    services = services.filter(s => s.id !== req.params.id);
    res.json({ success: true });
  });

  // Orders
  app.get('/api/orders', (req, res) => {
    const userId = req.query.user_id as string;
    if (userId) {
      const userOrders = orders.filter(o => o.user_id === userId);
      return res.json(userOrders);
    }
    res.json(orders);
  });

  app.post('/api/orders', (req, res) => {
    const { user_id, user_name, user_email, service_id, service_title, plan_id, plan_name, amount, payment_gateway } = req.body;
    
    const orderNum = 'BS-2026-' + Math.floor(1000 + Math.random() * 9000);
    const txnId = 'pay_' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const orderId = 'ord-' + Date.now();

    const newOrder: Order = {
      id: orderId,
      order_number: orderNum,
      user_id,
      user_name,
      user_email,
      service_id,
      service_title,
      plan_id,
      plan_name,
      amount,
      payment_status: 'paid',
      order_status: 'Order Placed',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updates: [
        {
          id: 'upd-' + Date.now(),
          order_id: orderId,
          status: 'Order Placed',
          note: `Payment confirmed via ${payment_gateway || 'Razorpay'} (Txn: ${txnId}). Order queued for review.`,
          created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
      ]
    };

    orders.unshift(newOrder);

    // Record transaction
    const newPayment: Payment = {
      id: 'pay-' + Date.now(),
      order_id: orderId,
      order_number: orderNum,
      user_id,
      user_name,
      txn_id: txnId,
      amount,
      gateway: payment_gateway || 'Razorpay',
      status: 'success',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    payments.unshift(newPayment);

    res.json({ success: true, order: newOrder, payment: newPayment });
  });

  app.put('/api/orders/:id/status', (req, res) => {
    const { status, note } = req.body;
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.order_status = status;
    const newUpdate = {
      id: 'upd-' + Date.now(),
      order_id: order.id,
      status,
      note: note || `Status updated to ${status} by Bharat SEO Team.`,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    order.updates.push(newUpdate);

    res.json({ success: true, order });
  });

  // Payments
  app.get('/api/payments', (req, res) => {
    res.json(payments);
  });

  // Jobs & Careers
  app.get('/api/jobs', (req, res) => {
    res.json(jobs);
  });

  app.post('/api/jobs', (req, res) => {
    const newJob: Job = {
      id: 'job-' + Date.now(),
      title: req.body.title,
      department: req.body.department,
      location: req.body.location,
      type: req.body.type || 'Full-time',
      description: req.body.description,
      requirements: req.body.requirements || [],
      status: 'open',
      created_at: new Date().toISOString().split('T')[0]
    };
    jobs.unshift(newJob);
    res.json({ success: true, job: newJob });
  });

  app.put('/api/jobs/:id', (req, res) => {
    const idx = jobs.findIndex(j => j.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Job not found' });
    jobs[idx] = { ...jobs[idx], ...req.body };
    res.json({ success: true, job: jobs[idx] });
  });

  app.delete('/api/jobs/:id', (req, res) => {
    jobs = jobs.filter(j => j.id !== req.params.id);
    res.json({ success: true });
  });

  // Job Applications
  app.get('/api/applications', (req, res) => {
    res.json(jobApplications);
  });

  app.post('/api/applications', (req, res) => {
    const { job_id, job_title, name, email, phone, resume_filename, cover_message } = req.body;
    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      job_id,
      job_title: job_title || 'General Position',
      name,
      email,
      phone,
      resume_filename: resume_filename || 'applicant_resume.pdf',
      cover_message: cover_message || '',
      status: 'New',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    jobApplications.unshift(newApp);
    res.json({ success: true, application: newApp });
  });

  app.put('/api/applications/:id/status', (req, res) => {
    const { status } = req.body;
    const appItem = jobApplications.find(a => a.id === req.params.id);
    if (!appItem) return res.status(404).json({ error: 'Application not found' });
    appItem.status = status;
    res.json({ success: true, application: appItem });
  });

  // Blogs
  app.get('/api/blogs', (req, res) => {
    res.json(blogs);
  });

  app.post('/api/blogs', (req, res) => {
    const newBlog: Blog = {
      id: 'blog-' + Date.now(),
      title: req.body.title,
      slug: (req.body.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: req.body.category || 'Digital Marketing',
      excerpt: req.body.excerpt,
      content: req.body.content,
      image: req.body.image || 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80',
      author: req.body.author || 'Bharat SEO Editorial',
      status: req.body.status || 'published',
      created_at: new Date().toISOString().split('T')[0],
      read_time: '4 min read'
    };
    blogs.unshift(newBlog);
    res.json({ success: true, blog: newBlog });
  });

  app.put('/api/blogs/:id', (req, res) => {
    const idx = blogs.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Blog not found' });
    blogs[idx] = { ...blogs[idx], ...req.body };
    res.json({ success: true, blog: blogs[idx] });
  });

  app.delete('/api/blogs/:id', (req, res) => {
    blogs = blogs.filter(b => b.id !== req.params.id);
    res.json({ success: true });
  });

  // Team
  app.get('/api/team', (req, res) => {
    res.json(teamMembers);
  });

  app.post('/api/team', (req, res) => {
    const newMember: TeamMember = {
      id: 'team-' + Date.now(),
      name: req.body.name,
      designation: req.body.designation,
      photo: req.body.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      socials: req.body.socials || {},
      order_no: teamMembers.length + 1
    };
    teamMembers.push(newMember);
    res.json({ success: true, member: newMember });
  });

  // Testimonials
  app.get('/api/testimonials', (req, res) => {
    res.json(testimonials);
  });

  app.post('/api/testimonials', (req, res) => {
    const newTestimonial: Testimonial = {
      id: 'test-' + Date.now(),
      client_name: req.body.client_name,
      company: req.body.company,
      message: req.body.message,
      photo: req.body.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: req.body.rating || 5
    };
    testimonials.push(newTestimonial);
    res.json({ success: true, testimonial: newTestimonial });
  });

  // Enquiries & Leads
  app.get('/api/enquiries', (req, res) => {
    res.json(enquiries);
  });

  app.post('/api/enquiries', (req, res) => {
    const newEnquiry: Enquiry = {
      id: 'enq-' + Date.now(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service_interest: req.body.service_interest || 'General Consultation',
      message: req.body.message,
      source: req.body.source || 'Website',
      status: 'new',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    enquiries.unshift(newEnquiry);
    res.json({ success: true, enquiry: newEnquiry });
  });

  // Support Tickets
  app.get('/api/tickets', (req, res) => {
    const userId = req.query.user_id as string;
    if (userId) {
      return res.json(supportTickets.filter(t => t.user_id === userId));
    }
    res.json(supportTickets);
  });

  app.post('/api/tickets', (req, res) => {
    const { user_id, user_name, order_id, subject, message } = req.body;
    const tktNum = 'TKT-2026-' + Math.floor(100 + Math.random() * 900);
    const newTicket: SupportTicket = {
      id: 'tkt-' + Date.now(),
      ticket_number: tktNum,
      user_id,
      user_name,
      order_id: order_id || '',
      subject,
      message,
      status: 'Open',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      replies: []
    };
    supportTickets.unshift(newTicket);
    res.json({ success: true, ticket: newTicket });
  });

  app.post('/api/tickets/:id/reply', (req, res) => {
    const { sender, sender_name, message } = req.body;
    const ticket = supportTickets.find(t => t.id === req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    const reply = {
      id: 'rep-' + Date.now(),
      sender: sender || 'user',
      sender_name: sender_name || 'User',
      message,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    ticket.replies.push(reply);
    if (sender === 'admin') {
      ticket.status = 'In Progress';
    }
    res.json({ success: true, ticket });
  });

  // Users management
  app.get('/api/users', (req, res) => {
    res.json(users);
  });

  app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (req.body.status) user.status = req.body.status;
    if (req.body.role) user.role = req.body.role;
    res.json({ success: true, user });
  });

  // --- VITE / STATIC SERVING --- //
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Bharat SEO Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
