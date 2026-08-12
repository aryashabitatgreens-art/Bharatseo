import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Service, 
  Order, 
  Job, 
  JobApplication, 
  Blog, 
  TeamMember, 
  Testimonial, 
  Enquiry, 
  Payment, 
  User, 
  SiteSettings 
} from '../types';
import { 
  ShieldCheck, 
  BarChart3, 
  Package, 
  Briefcase, 
  Users, 
  FileText, 
  Settings as SettingsIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Code2, 
  RefreshCw,
  Search,
  ChevronRight,
  Eye,
  DollarSign
} from 'lucide-react';

interface AdminPanelProps {}

export const AdminPanel: React.FC<AdminPanelProps> = () => {
  const { user, siteSettings, updateSettings } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'services' | 'careers' | 'users' | 'blogs' | 'team' | 'leads' | 'settings'>('overview');

  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Status update modal for order
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newOrderStatus, setNewOrderStatus] = useState<Order['order_status']>('In Progress');
  const [newOrderNote, setNewOrderNote] = useState('');

  // Settings form
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...siteSettings });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [ordRes, srvRes, jobRes, appRes, blogRes, teamRes, enqRes, payRes, usrRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/services'),
        fetch('/api/jobs'),
        fetch('/api/applications'),
        fetch('/api/blogs'),
        fetch('/api/team'),
        fetch('/api/enquiries'),
        fetch('/api/payments'),
        fetch('/api/users')
      ]);

      if (ordRes.ok) setOrders(await ordRes.json());
      if (srvRes.ok) setServices(await srvRes.json());
      if (jobRes.ok) setJobs(await jobRes.json());
      if (appRes.ok) setApplications(await appRes.json());
      if (blogRes.ok) setBlogs(await blogRes.json());
      if (teamRes.ok) setTeam(await teamRes.json());
      if (enqRes.ok) setEnquiries(await enqRes.json());
      if (payRes.ok) setPayments(await payRes.json());
      if (usrRes.ok) setUsers(await usrRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    if (siteSettings) {
      setSettingsForm({ ...siteSettings });
    }
  }, [siteSettings]);

  const handleUpdateOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newOrderStatus,
          note: newOrderNote
        })
      });

      if (res.ok) {
        setSelectedOrder(null);
        setNewOrderNote('');
        fetchAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateApplicationStatus = async (appId: string, status: JobApplication['status']) => {
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    alert('Site settings updated successfully!');
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="bg-[#F8FAFC] text-slate-800 min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-2xl font-black text-[#1A237E]">Access Denied</h2>
          <p className="text-xs text-slate-600">Admin privileges required to view this panel.</p>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1A237E] text-white font-black text-xl flex items-center justify-center shadow-sm shrink-0">
            <ShieldCheck className="w-7 h-7 text-[#FF9933]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#1A237E]">Bharat SEO Admin Control Panel</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF9933]/15 text-[#FF9933] uppercase">
                Full Control
              </span>
            </div>
            <p className="text-xs text-slate-500">Logged in as {user.name} ({user.email})</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 border border-slate-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF9933]' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'orders', label: `Orders (${orders.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'services', label: `Services (${services.length})`, icon: <DollarSign className="w-4 h-4" /> },
          { id: 'careers', label: `Jobs & Applications (${applications.length})`, icon: <Briefcase className="w-4 h-4" /> },
          { id: 'users', label: `Registered Users (${users.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'blogs', label: `Blog Articles (${blogs.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'leads', label: `Enquiry Leads (${enquiries.length})`, icon: <Search className="w-4 h-4" /> },
          { id: 'settings', label: 'Site & SMTP Settings', icon: <SettingsIcon className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#1A237E] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* MAIN ADMIN AREA */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Total Revenue</span>
                <div className="text-3xl font-black text-[#FF9933]">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Total Client Orders</span>
                <div className="text-3xl font-black text-[#1A237E]">
                  {orders.length}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Career Applicants</span>
                <div className="text-3xl font-black text-emerald-600">
                  {applications.length}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Enquiry Leads</span>
                <div className="text-3xl font-black text-orange-500">
                  {enquiries.length}
                </div>
              </div>
            </div>

            {/* Recent Purchases Table */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-[#1A237E]">Recent Purchases</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Order #</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Service & Plan</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-[#FF9933]">{ord.order_number}</td>
                        <td className="p-3 font-semibold text-[#1A237E]">{ord.user_name}</td>
                        <td className="p-3 text-slate-600">{ord.service_title} ({ord.plan_name})</td>
                        <td className="p-3 font-bold text-[#1A237E]">₹{ord.amount.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-200">
                            {ord.order_status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1A237E] font-bold text-[11px] border border-slate-200"
                          >
                            Update Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#1A237E]">All Client Purchases & Status Updates</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Order #</th>
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#FF9933]">{ord.order_number}</td>
                      <td className="p-3 font-semibold text-[#1A237E]">{ord.user_name}<br/><span className="text-[10px] text-slate-500">{ord.user_email}</span></td>
                      <td className="p-3">{ord.service_title} ({ord.plan_name})</td>
                      <td className="p-3 font-bold text-[#1A237E]">₹{ord.amount.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          ord.order_status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          ord.order_status === 'In Progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {ord.order_status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{ord.created_at}</td>
                      <td className="p-3">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-[11px]"
                        >
                          Update Status & Add Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CAREER APPLICATIONS TAB */}
        {activeTab === 'careers' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#1A237E]">Job Applications & Resumes ({applications.length})</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Applicant</th>
                    <th className="p-3">Applied Position</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Resume PDF</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-[#1A237E]">{app.name}</td>
                      <td className="p-3 text-[#FF9933] font-semibold">{app.job_title}</td>
                      <td className="p-3">{app.email}<br/><span className="text-[10px] text-slate-500">{app.phone}</span></td>
                      <td className="p-3">
                        <span className="font-mono text-emerald-600 text-[11px] underline cursor-pointer">
                          📄 {app.resume_filename || 'resume.pdf'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          app.status === 'Hired' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          app.status === 'Shortlisted' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                          'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 space-x-1">
                        <button
                          onClick={() => handleUpdateApplicationStatus(app.id, 'Shortlisted')}
                          className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus(app.id, 'Hired')}
                          className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]"
                        >
                          Hire
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus(app.id, 'Rejected')}
                          className="px-2 py-1 rounded-full bg-red-100 text-red-800 font-bold text-[10px]"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ENQUIRY LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#1A237E]">Contact & Consultation Enquiries ({enquiries.length})</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Service Interest</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-[#1A237E]">{enq.name}</td>
                      <td className="p-3">{enq.email}<br/><span className="text-[10px] text-slate-500">{enq.phone}</span></td>
                      <td className="p-3 text-[#FF9933] font-semibold">{enq.service_interest}</td>
                      <td className="p-3 text-slate-600 max-w-xs">{enq.message}</td>
                      <td className="p-3 text-slate-500">{enq.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SITE SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="p-6 sm:p-10 rounded-2xl bg-white border border-slate-200/80 max-w-3xl mx-auto space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-black text-[#1A237E]">Branding, Contact & Headquarters Settings</h2>
              <p className="text-xs text-slate-500 mt-1">
                Customize your agency name, tagline, office addresses, hotline, WhatsApp number, and API integrations. All changes update across the website instantly.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              {/* Branding Section */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-[#1A237E] text-sm uppercase tracking-wider">1. Brand Identity</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Agency / Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.site_name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, site_name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Tagline / Mission *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.agency_tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, agency_tagline: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-[#1A237E] text-sm uppercase tracking-wider">2. Direct Contact Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Phone Hotline *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.contact_phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contact_phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">WhatsApp Number (with Country Code) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 919876543210"
                      value={settingsForm.whatsapp_number}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Contact & Support Email *</label>
                    <input
                      type="email"
                      required
                      value={settingsForm.contact_email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contact_email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>
                </div>
              </div>

              {/* Address / Headquarters */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-[#1A237E] text-sm uppercase tracking-wider">3. Headquarters & Office Address</h3>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Full Office Address / Headquarters *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Building 12, Cyber City, Phase 2, Gurugram, Haryana - 122002"
                    value={settingsForm.office_address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, office_address: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                  ></textarea>
                </div>
              </div>

              {/* Payment & Integration Keys */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-[#1A237E] text-sm uppercase tracking-wider">4. Payment & OAuth Keys</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Razorpay Key ID</label>
                    <input
                      type="text"
                      value={settingsForm.razorpay_key_id}
                      onChange={(e) => setSettingsForm({ ...settingsForm, razorpay_key_id: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 font-mono focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Google OAuth Client ID</label>
                    <input
                      type="text"
                      value={settingsForm.google_client_id}
                      onChange={(e) => setSettingsForm({ ...settingsForm, google_client_id: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 font-mono focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs shadow-md transition"
              >
                Save All Agency Settings
              </button>
            </form>
          </div>
        )}
      </div>

      {/* UPDATE ORDER STATUS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-xl">
            <h2 className="text-xl font-black text-[#1A237E]">Update Status for Order #{selectedOrder.order_number}</h2>
            <form onSubmit={handleUpdateOrderStatus} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">New Order Status *</label>
                <select
                  value={newOrderStatus}
                  onChange={(e) => setNewOrderStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Under Review">Under Review</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delivered">Delivered</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Timeline Log Note (Visible to Client) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Technical SEO audit completed. On-page keyword tags updated."
                  value={newOrderNote}
                  onChange={(e) => setNewOrderNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FF9933] text-white font-bold"
                >
                  Update Timeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
