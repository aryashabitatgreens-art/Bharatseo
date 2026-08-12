import React, { useState } from 'react';
import { Service, ServicePlan } from '../types';
import { X, ShieldCheck, CheckCircle2, Lock, CreditCard, Smartphone, Building2 } from 'lucide-react';

interface RazorpayModalProps {
  service: Service;
  plan: ServicePlan;
  userName: string;
  userEmail: string;
  onClose: () => void;
  onSuccess: (paymentGateway: string) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  service,
  plan,
  userName,
  userEmail,
  onClose,
  onSuccess
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState('user@okicici');

  const handlePayNow = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess(method === 'upi' ? 'Razorpay UPI' : method === 'card' ? 'Razorpay Card' : 'PayU NetBanking');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Razorpay Branded Header */}
        <div className="border-b border-slate-200 pb-4 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1A237E] text-white font-bold text-xs flex items-center justify-center">
                RZP
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1A237E]">Razorpay Secure Checkout</h2>
                <p className="text-[10px] text-slate-500">Bharat SEO Merchant ID: rzp_test_2026</p>
              </div>
            </div>
            <Lock className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">Order Details</span>
          <h3 className="text-sm font-bold text-[#1A237E]">{service.title}</h3>
          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
            <span className="text-slate-600">{plan.plan_name} Plan ({plan.billing_period})</span>
            <span className="text-base font-black text-[#FF9933]">₹{plan.price.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Select Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setMethod('upi')}
              className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition ${
                method === 'upi' ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>UPI / GPay</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition ${
                method === 'card' ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Debit / Credit</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('netbanking')}
              className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition ${
                method === 'netbanking' ? 'bg-[#1A237E] text-white border-[#1A237E]' : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>NetBanking</span>
            </button>
          </div>

          {method === 'upi' && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <label className="block text-slate-600">Virtual Payment Address (VPA / UPI ID)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-mono"
              />
              <div className="flex gap-2 text-[10px] text-slate-500">
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Google Pay</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">PhonePe</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Paytm</span>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handlePayNow}
          disabled={processing}
          className="w-full py-3.5 rounded-full bg-[#FF9933] hover:bg-orange-600 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
        >
          {processing ? (
            <span>Processing Gateway Payment...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Pay ₹{plan.price.toLocaleString('en-IN')} & Start Campaign</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
