import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Career } from './components/Career';
import { BlogComponent } from './components/Blog';
import { Contact } from './components/Contact';
import { AuthModal } from './components/AuthModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { RazorpayModal } from './components/RazorpayModal';
import { InvoiceModal } from './components/InvoiceModal';

import { Service, ServicePlan, Order, Blog, Job, TeamMember, Testimonial } from './types';
import { initialServices, initialBlogs, initialJobs, initialTeam, initialTestimonials } from './data/initialData';

function MainApp() {
  const { user, setAuthModalOpen, setAuthMode } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Dynamic Data State
  const [services, setServices] = useState<Service[]>(initialServices);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  // Modals state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedServiceForBuy, setSelectedServiceForBuy] = useState<Service | null>(null);
  const [selectedPlanForBuy, setSelectedPlanForBuy] = useState<ServicePlan | null>(null);

  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Fetch live services, blogs, etc. from server
  const fetchAllData = async () => {
    try {
      const [sRes, bRes, jRes, tRes, testRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/blogs'),
        fetch('/api/jobs'),
        fetch('/api/team'),
        fetch('/api/testimonials')
      ]);

      if (sRes.ok) setServices(await sRes.json());
      if (bRes.ok) setBlogs(await bRes.json());
      if (jRes.ok) setJobs(await jRes.json());
      if (tRes.ok) setTeam(await tRes.json());
      if (testRes.ok) setTestimonials(await testRes.json());
    } catch (e) {
      console.error('API Fetch error:', e);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleBuyPlan = (service: Service, plan: ServicePlan) => {
    if (!user) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setSelectedServiceForBuy(service);
    setSelectedPlanForBuy(plan);
    setCheckoutModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentGateway: string) => {
    if (!user || !selectedServiceForBuy || !selectedPlanForBuy) return;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          user_name: user.name,
          user_email: user.email,
          service_id: selectedServiceForBuy.id,
          service_title: selectedServiceForBuy.title,
          plan_id: selectedPlanForBuy.id,
          plan_name: selectedPlanForBuy.plan_name,
          amount: selectedPlanForBuy.price,
          payment_gateway: paymentGateway
        })
      });

      if (res.ok) {
        setCheckoutModalOpen(false);
        setActiveTab('dashboard');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenInvoice = (order: Order) => {
    setSelectedInvoiceOrder(order);
    setInvoiceModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans antialiased text-slate-900 selection:bg-[#FF9933] selection:text-white">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            services={services}
            blogs={blogs}
            testimonials={testimonials}
            setActiveTab={setActiveTab}
            onSelectService={(svc) => {
              setSelectedServiceForBuy(svc);
              setSelectedPlanForBuy(svc.plans[0]);
              if (!user) { setAuthMode('login'); setAuthModalOpen(true); } else { setCheckoutModalOpen(true); }
            }}
            onOpenConsultation={() => setActiveTab('contact')}
          />
        )}

        {activeTab === 'services' && (
          <Services
            services={services}
            onBuyPlan={handleBuyPlan}
          />
        )}

        {activeTab === 'portfolio' && (
          <Portfolio />
        )}

        {activeTab === 'about' && (
          <About team={team} />
        )}

        {activeTab === 'career' && (
          <Career
            jobs={jobs}
            onApplySuccess={() => fetchAllData()}
          />
        )}

        {activeTab === 'blog' && (
          <BlogComponent blogs={blogs} />
        )}

        {activeTab === 'contact' && (
          <Contact />
        )}

        {activeTab === 'dashboard' && (
          <UserDashboard onOpenInvoice={handleOpenInvoice} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
      />

      {/* Modals */}
      <AuthModal />

      {checkoutModalOpen && selectedServiceForBuy && selectedPlanForBuy && user && (
        <RazorpayModal
          service={selectedServiceForBuy}
          plan={selectedPlanForBuy}
          userName={user.name}
          userEmail={user.email}
          onClose={() => setCheckoutModalOpen(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {invoiceModalOpen && selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setInvoiceModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
