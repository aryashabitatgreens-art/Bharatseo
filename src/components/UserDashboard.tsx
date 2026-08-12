import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order, SupportTicket, Payment } from '../types';
import { 
  LayoutDashboard, 
  Package, 
  Clock, 
  CheckCircle2, 
  FileText, 
  LifeBuoy, 
  User as UserIcon, 
  Plus, 
  Send, 
  Download, 
  Sparkles,
  AlertCircle,
  Eye,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

interface UserDashboardProps {
  onOpenInvoice: (order: Order) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onOpenInvoice }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'orders' | 'invoices' | 'tickets' | 'profile'>('overview');

  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // New ticket state
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketOrderId, setNewTicketOrderId] = useState('');
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const fetchUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [ordRes, tktRes, payRes] = await Promise.all([
        fetch(`/api/orders?user_id=${user.id}`),
        fetch(`/api/tickets?user_id=${user.id}`),
        fetch('/api/payments')
      ]);

      if (ordRes.ok) setOrders(await ordRes.json());
      if (tktRes.ok) setTickets(await tktRes.json());
      if (payRes.ok) {
        const allPays: Payment[] = await payRes.json();
        setPayments(allPays.filter(p => p.user_id === user.id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          user_name: user.name,
          order_id: newTicketOrderId,
          subject: newTicketSubject,
          message: newTicketMessage
        })
      });

      if (res.ok) {
        setTicketModalOpen(false);
        setNewTicketSubject('');
        setNewTicketMessage('');
        fetchUserData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendTicketReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMessage || !user) return;

    try {
      const res = await fetch(`/api/tickets/${selectedTicket.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'user',
          sender_name: user.name,
          message: replyMessage
        })
      });

      if (res.ok) {
        setReplyMessage('');
        const updated = await res.json();
        setSelectedTicket(updated.ticket);
        fetchUserData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) {
    return (
      <div className="bg-[#F8FAFC] text-slate-800 min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-[#FF9933] mx-auto" />
          <h2 className="text-2xl font-black text-[#1A237E]">Please Sign In</h2>
          <p className="text-xs text-slate-600">Log in to view your orders, live tracking, invoices, and support tickets.</p>
        </div>
      </div>
    );
  }

  // Order timeline helper stages
  const timelineStages = ['Order Placed', 'Under Review', 'In Progress', 'Delivered'];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'Under Review': return 1;
      case 'In Progress': return 2;
      case 'Delivered': return 3;
      case 'On Hold': return 1;
      default: return 0;
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1A237E] text-white font-black text-xl flex items-center justify-center shadow-sm overflow-hidden shrink-0">
            {user.profile_photo ? (
              <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#1A237E]">Welcome, {user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF9933]/15 text-[#FF9933] uppercase">
                Client Dashboard
              </span>
            </div>
            <p className="text-xs text-slate-500">{user.email} • {user.phone || 'No phone added'}</p>
          </div>
        </div>

        <button
          onClick={fetchUserData}
          className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 border border-slate-200"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF9933]' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'orders', label: `My Orders & Timeline (${orders.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'invoices', label: 'Invoices & Receipts', icon: <FileText className="w-4 h-4" /> },
          { id: 'tickets', label: `Support Tickets (${tickets.length})`, icon: <LifeBuoy className="w-4 h-4" /> },
          { id: 'profile', label: 'Profile Settings', icon: <UserIcon className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 ${
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

      {/* TAB CONTENT AREA */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Active Orders</span>
                <div className="text-3xl font-black text-[#FF9933]">
                  {orders.filter(o => o.order_status !== 'Delivered').length}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Completed Projects</span>
                <div className="text-3xl font-black text-emerald-600">
                  {orders.filter(o => o.order_status === 'Delivered').length}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Total Payments Paid</span>
                <div className="text-3xl font-black text-[#1A237E]">
                  ₹{orders.reduce((acc, o) => acc + o.amount, 0).toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold">Open Support Tickets</span>
                <div className="text-3xl font-black text-orange-500">
                  {tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length}
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#1A237E]">Recent Active Services</h2>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#FF9933] font-bold hover:underline flex items-center gap-1"
                >
                  <span>View All Orders</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8 text-slate-500 space-y-2">
                  <Package className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="text-sm">You haven't purchased any service packages yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 2).map((ord) => (
                    <div key={ord.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#FF9933] bg-[#FF9933]/10 px-2 py-0.5 rounded border border-[#FF9933]/20 font-bold">
                            {ord.order_number}
                          </span>
                          <h3 className="text-lg font-bold text-[#1A237E] mt-1">{ord.service_title} ({ord.plan_name} Plan)</h3>
                          <p className="text-xs text-slate-500">Ordered on {ord.created_at}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-center self-start sm:self-auto ${
                          ord.order_status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                          ord.order_status === 'In Progress' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                          'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                          {ord.order_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ORDERS & TRACKING TIMELINE TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-[#1A237E]">Purchased Services & Order Tracking</h2>
                <p className="text-xs text-slate-500">Real-time status updates and delivery timeline provided by Bharat SEO engineers.</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-white border border-slate-200/80 text-slate-500 space-y-3 shadow-sm">
                <Package className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-base font-bold text-slate-700">No active or past orders found.</p>
                <p className="text-xs">Browse our Services page to purchase an SEO or Web Development package.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map((ord) => {
                  const currentStageIdx = getStageIndex(ord.order_status);
                  return (
                    <div key={ord.id} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#FF9933] bg-[#FF9933]/10 px-2.5 py-0.5 rounded border border-[#FF9933]/30">
                              {ord.order_number}
                            </span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Payment Verified (₹{ord.amount.toLocaleString('en-IN')})
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-[#1A237E] mt-1">{ord.service_title}</h3>
                          <p className="text-xs text-slate-500">Plan: {ord.plan_name} • Date: {ord.created_at}</p>
                        </div>

                        <button
                          onClick={() => onOpenInvoice(ord)}
                          className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 border border-slate-200"
                        >
                          <FileText className="w-4 h-4 text-[#FF9933]" />
                          <span>View Invoice PDF</span>
                        </button>
                      </div>

                      {/* Interactive Progress Bar Timeline */}
                      <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#FF9933] flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          Order Milestone Progress Timeline
                        </h4>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative pt-2">
                          {timelineStages.map((stage, idx) => {
                            const isCompleted = idx <= currentStageIdx;
                            const isCurrent = idx === currentStageIdx;
                            return (
                              <div key={stage} className="space-y-2 text-center">
                                <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs border ${
                                  isCompleted
                                    ? 'bg-[#FF9933] text-white border-orange-400 shadow-sm'
                                    : 'bg-white text-slate-400 border-slate-200'
                                }`}>
                                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                                </div>
                                <div>
                                  <p className={`text-xs font-bold ${isCurrent ? 'text-[#FF9933]' : isCompleted ? 'text-[#1A237E]' : 'text-slate-400'}`}>
                                    {stage}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Timeline Notes History */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Status Logs & Notes:</h4>
                        <div className="space-y-2">
                          {ord.updates.map((upd) => (
                            <div key={upd.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                              <div className="flex justify-between items-center text-slate-500 text-[10px]">
                                <span className="font-bold text-[#FF9933]">{upd.status}</span>
                                <span>{upd.created_at}</span>
                              </div>
                              <p className="text-slate-700">{upd.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* INVOICES TAB */}
        {activeTab === 'invoices' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#1A237E]">Invoices & Payment Receipts</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 uppercase text-[10px] text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Order #</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Txn ID</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#FF9933]">{ord.order_number}</td>
                      <td className="p-3 font-semibold text-[#1A237E]">{ord.service_title}</td>
                      <td className="p-3 font-mono text-slate-500">pay_{ord.id.substring(4)}</td>
                      <td className="p-3 font-bold text-[#1A237E]">₹{ord.amount.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                          PAID
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => onOpenInvoice(ord)}
                          className="px-3 py-1 rounded-full bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUPPORT TICKETS TAB */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-[#1A237E]">Support Tickets</h2>
                <p className="text-xs text-slate-500">Raise a query regarding your active campaign or billing.</p>
              </div>
              <button
                onClick={() => setTicketModalOpen(true)}
                className="px-4 py-2 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Raise New Ticket</span>
              </button>
            </div>

            {tickets.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-white border border-slate-200/80 text-slate-500 shadow-sm">
                <LifeBuoy className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No support tickets found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tickets.map((tkt) => (
                  <div key={tkt.id} className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-4 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-[#FF9933] bg-[#FF9933]/10 px-2 py-0.5 rounded border border-[#FF9933]/20 font-bold">
                          {tkt.ticket_number}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {tkt.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#1A237E]">{tkt.subject}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{tkt.message}</p>
                    </div>

                    <button
                      onClick={() => setSelectedTicket(tkt)}
                      className="w-full py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#1A237E] transition"
                    >
                      View Reply Thread ({tkt.replies.length})
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE SETTINGS TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#1A237E]">Profile Information</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={user.name}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={user.email}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Phone Number</label>
                <input
                  type="text"
                  readOnly
                  value={user.phone || '+91 98765 43210'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-semibold"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE TICKET MODAL */}
      {ticketModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-xl">
            <h2 className="text-xl font-black text-[#1A237E]">Raise Support Ticket</h2>
            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Request for keyword ranking report"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your query..."
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#FF9933]"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTicketModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FF9933] text-white font-bold"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW TICKET REPLIES MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-xl max-h-[85vh] flex flex-col justify-between">
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono text-[#FF9933] font-bold">{selectedTicket.ticket_number}</span>
              <h2 className="text-lg font-bold text-[#1A237E]">{selectedTicket.subject}</h2>
              <p className="text-xs text-slate-600">{selectedTicket.message}</p>
            </div>

            {/* Thread messages */}
            <div className="space-y-3 overflow-y-auto max-h-60 p-2">
              {selectedTicket.replies.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center">No replies yet. Admin will respond shortly.</p>
              ) : (
                selectedTicket.replies.map((rep) => (
                  <div
                    key={rep.id}
                    className={`p-3 rounded-2xl text-xs space-y-1 ${
                      rep.sender === 'admin'
                        ? 'bg-blue-50 border border-blue-100 text-slate-800 ml-4'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 mr-4'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span className="font-bold text-[#1A237E]">{rep.sender_name}</span>
                      <span>{rep.created_at}</span>
                    </div>
                    <p>{rep.message}</p>
                  </div>
                ))
              )}
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendTicketReply} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#FF9933]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[#FF9933] text-white font-bold text-xs"
              >
                Reply
              </button>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="px-3 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
