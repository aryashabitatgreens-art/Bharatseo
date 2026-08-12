import React from 'react';
import { Order } from '../types';
import { useAuth } from '../context/AuthContext';
import { X, Printer, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const { siteSettings } = useAuth();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative my-8 print:shadow-none print:m-0 print:p-4">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 print:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Invoice Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1A237E] text-white font-black text-lg flex items-center justify-center">
                {siteSettings.site_name.charAt(0) || 'B'}
              </div>
              <span className="text-xl font-black text-[#1A237E] tracking-tight">{siteSettings.site_name}</span>
            </div>
            <p className="text-xs font-semibold text-slate-600">{siteSettings.agency_tagline}</p>
            <p className="text-[11px] text-slate-500 max-w-xs">{siteSettings.office_address}</p>
          </div>

          <div className="text-right space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
              PAID INVOICE
            </span>
            <p className="text-xs font-mono font-bold text-[#1A237E] mt-2">Invoice #: {order.order_number}</p>
            <p className="text-[11px] text-slate-500">Date: {order.created_at}</p>
          </div>
        </div>

        {/* Client & Payment Info */}
        <div className="grid grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Billed To:</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{order.user_name}</p>
            <p className="text-slate-600">{order.user_email}</p>
          </div>

          <div>
            <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Payment Method:</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Razorpay Gateway (Verified)</p>
            <p className="text-slate-600 font-mono">Txn: pay_{order.id.substring(4)}</p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600 border-b border-slate-200">
            <tr>
              <th className="p-3">Service Description</th>
              <th className="p-3">Plan</th>
              <th className="p-3 text-right">Amount (INR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-3 font-semibold">{order.service_title}</td>
              <td className="p-3 text-slate-600">{order.plan_name} Package</td>
              <td className="p-3 text-right font-bold">₹{order.amount.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        {/* Total calculation */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Payment received in full. Thank you for your business!</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold">Total Paid: </span>
            <span className="text-xl font-black text-slate-900">₹{order.amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Print / Download buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4 text-[#FF9933]" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
