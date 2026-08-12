export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  google_id?: string;
  profile_photo?: string;
  status: 'active' | 'blocked';
  created_at: string;
}

export interface ServicePlan {
  id: string;
  service_id: string;
  plan_name: 'Starter' | 'Growth' | 'Enterprise';
  price: number; // in INR
  billing_period: 'monthly' | 'one-time' | 'yearly';
  features: string[];
}

export interface Service {
  id: string;
  category: 'SEO' | 'Web Development' | 'App Development' | 'Social Media' | 'PPC / Ads' | 'Content Marketing' | 'Hosting & Deployment';
  title: string;
  slug: string;
  short_desc: string;
  description: string;
  image: string;
  icon: string;
  status: 'active' | 'inactive';
  plans: ServicePlan[];
}

export interface OrderUpdate {
  id: string;
  order_id: string;
  status: 'Order Placed' | 'Under Review' | 'In Progress' | 'Delivered' | 'On Hold';
  note: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  user_name: string;
  user_email: string;
  service_id: string;
  service_title: string;
  plan_id: string;
  plan_name: string;
  amount: number;
  payment_status: 'paid' | 'pending' | 'failed';
  order_status: 'Order Placed' | 'Under Review' | 'In Progress' | 'Delivered' | 'On Hold';
  created_at: string;
  updates: OrderUpdate[];
}

export interface Payment {
  id: string;
  order_id: string;
  order_number: string;
  user_id: string;
  user_name: string;
  txn_id: string;
  amount: number;
  gateway: 'Razorpay' | 'PayU' | 'Bank Transfer';
  status: 'success' | 'pending' | 'failed';
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Internship' | 'Contract';
  description: string;
  requirements: string[];
  status: 'open' | 'closed';
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  resume_filename?: string;
  cover_message: string;
  status: 'New' | 'Shortlisted' | 'Rejected' | 'Hired';
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  status: 'published' | 'draft';
  created_at: string;
  read_time: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order_no: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  message: string;
  photo: string;
  rating: number;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_interest?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export interface SupportTicket {
  id: string;
  ticket_number: string;
  user_id: string;
  user_name: string;
  order_id?: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created_at: string;
  replies: {
    id: string;
    sender: 'user' | 'admin';
    sender_name: string;
    message: string;
    created_at: string;
  }[];
}

export interface SiteSettings {
  site_name: string;
  agency_tagline: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  office_address: string;
  razorpay_key_id: string;
  google_client_id: string;
  smtp_host: string;
  smtp_user: string;
}
