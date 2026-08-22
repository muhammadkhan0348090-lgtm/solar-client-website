import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Sidebar, MobileDrawer } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MainPinCard } from './components/MainPinCard';
import { PinThumbnailCard } from './components/PinThumbnailCard';
import { LightboxModal } from './components/LightboxModal';
import { VisualSearchModal } from './components/VisualSearchModal';
import { CreatePinModal } from './components/CreatePinModal';
import { SettingsModal } from './components/SettingsModal';
import { PakistanRatesModal } from './components/PakistanRatesModal';
import { PakistanRoiCalculator } from './components/PakistanRoiCalculator';
import { HeroScrollCanvas } from './components/BackgroundScrollCanvas';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuotationModal } from './components/QuotationModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { CheckoutModal } from './components/CheckoutModal';
import { UserOrdersModal } from './components/UserOrdersModal';
import { SolarPackagesSection } from './components/SolarPackagesSection';
import { CompletedProjectsPortfolio } from './components/CompletedProjectsPortfolio';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { initialPins, pakistanMarketRates } from './data';
import { PinItem, Comment } from './types';
import { TrendingDown, Tag, ChevronRight, Zap, Sun, ShieldCheck, ArrowDown, Award, Sparkles, CheckCircle2, Phone, Mail, FileText, MessageCircle, Send } from 'lucide-react';
import { generateQuotationPDF } from './utils/pdfGenerator';

export default function App() {
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  const [pins, setPins] = useState<PinItem[]>(initialPins);
  const [activePin, setActivePin] = useState<PinItem>(initialPins[0]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedPinIds, setSavedPinIds] = useState<Set<string>>(new Set(['pin-main-1']));
  
  // Auth & Admin States
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);

  // Mobile Navigation Drawer State
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  // Orders & Checkout States
  const [showUserOrdersModal, setShowUserOrdersModal] = useState<boolean>(false);
  const [selectedPackageForCheckout, setSelectedPackageForCheckout] = useState<any | null>(null);

  // Modals & States
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [showVisualSearch, setShowVisualSearch] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showPakistanRatesModal, setShowPakistanRatesModal] = useState<boolean>(false);
  const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);

  // Strict session verification on page load via GET /api/auth/me
  useEffect(() => {
    const token = localStorage.getItem('solar_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setCurrentUser(data.user);
          } else {
            localStorage.removeItem('solar_token');
            localStorage.removeItem('solar_user');
            setCurrentUser(null);
          }
        })
        .catch((err) => {
          console.warn('Session verification network check:', err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('solar_token');
    localStorage.removeItem('solar_user');
    setCurrentUser(null);
  };

  // Alternate images for the remix feature on active pin
  const alternateMainImages = [
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1400&q=85',
  ];
  const [remixIndex, setRemixIndex] = useState(0);

  // Filter pins based on search query or category
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');

  const filteredPins = useMemo(() => {
    let result = pins;
    if (selectedBrandFilter !== 'all') {
      const b = selectedBrandFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(b) ||
          p.solarPrice?.brand?.toLowerCase().includes(b) ||
          p.tags?.some((t) => t.toLowerCase().includes(b))
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.solarPrice?.brand?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [pins, searchQuery, selectedBrandFilter]);

  const nonActivePins = useMemo(() => {
    return filteredPins.filter((p) => p.id !== activePin.id);
  }, [filteredPins, activePin.id]);

  const sidePins = useMemo(() => {
    return nonActivePins.slice(0, 4);
  }, [nonActivePins]);

  const bottomPins = useMemo(() => {
    return nonActivePins.slice(4);
  }, [nonActivePins]);

  const handleSavePin = (pinId: string) => {
    setSavedPinIds((prev) => {
      const next = new Set(prev);
      if (next.has(pinId)) {
        next.delete(pinId);
      } else {
        next.add(pinId);
      }
      return next;
    });
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: currentUser ? currentUser.name : 'Maria Segovia',
      authorInitial: currentUser ? currentUser.name.charAt(0).toUpperCase() : 'M',
      authorColor: 'bg-fuchsia-600',
      text,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };

    setPins((prevPins) =>
      prevPins.map((p) =>
        p.id === activePin.id
          ? { ...p, comments: [newComment, ...p.comments] }
          : p
      )
    );

    setActivePin((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));
  };

  const handleToggleCommentLike = (commentId: string) => {
    const updatePinComments = (pin: PinItem) => ({
      ...pin,
      comments: pin.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              isLiked: !c.isLiked,
              likes: c.isLiked ? Math.max(0, c.likes - 1) : c.likes + 1,
            }
          : c
      ),
    });

    setPins((prev) => prev.map((p) => (p.id === activePin.id ? updatePinComments(p) : p)));
    setActivePin((prev) => updatePinComments(prev));
  };

  const handleRemix = () => {
    const nextIndex = (remixIndex + 1) % alternateMainImages.length;
    setRemixIndex(nextIndex);
    const newImg = alternateMainImages[nextIndex];
    setActivePin((prev) => ({ ...prev, imageUrl: newImg }));
    setPins((prev) =>
      prev.map((p) => (p.id === activePin.id ? { ...p, imageUrl: newImg } : p))
    );
  };

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setSearchQuery('Longi 585W PKR');
      setIsVoiceListening(false);
    }, 1800);
  };

  const handlePinCreated = (newPin: PinItem) => {
    setPins((prev) => [newPin, ...prev]);
    setActivePin(newPin);
  };

  return (
    <div id="solar-company-app" className="relative min-h-screen text-white flex font-sans bg-slate-950 max-w-full overflow-x-hidden">
      {/* Floating WhatsApp Action Button (+92-03480906798) */}
      <FloatingWhatsApp phoneNumber="923480906798" />

      {/* Left Navigation Sidebar (Desktop) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenCreateModal={() => setShowCreateModal(true)}
      />

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenCreateModal={() => setShowCreateModal(true)}
        onOpenPakistanRates={() => setShowPakistanRatesModal(true)}
        onOpenQuotationModal={() => setShowQuotationModal(true)}
        onOpenAdminDashboard={() => setShowAdminDashboard(true)}
        onOpenUserOrdersModal={() => setShowUserOrdersModal(true)}
        currentUser={currentUser}
      />

      {/* Main Page Layout Container */}
      <div className="flex-1 ml-0 md:ml-18 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Fixed TopBar Header */}
        <TopBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onVisualSearch={() => setShowVisualSearch(true)}
          onVoiceSearch={handleVoiceSearch}
          onOpenPakistanRates={() => setShowPakistanRatesModal(true)}
          onOpenQuotationModal={() => setShowQuotationModal(true)}
          onOpenAuthModal={() => setShowAuthModal(true)}
          onOpenAdminDashboard={() => setShowAdminDashboard(true)}
          onOpenUserOrdersModal={() => setShowUserOrdersModal(true)}
          currentUser={currentUser}
          onLogout={handleLogout}
          isListening={isVoiceListening}
          onToggleMobileMenu={() => setShowMobileMenu(true)}
        />


        {/* 1. TOP HERO SCROLL ANIMATION SHOWCASE SECTION */}
        <section
          ref={heroContainerRef}
          id="top-hero-animation-container"
          className="relative z-10 w-full min-h-auto"
        >
          <HeroScrollCanvas containerRef={heroContainerRef} />
        </section>


        {/* 2. LIVE PAKISTAN SOLAR MARKET RATES TICKER BAR */}
        <section
          id="pakistan-market-ticker-banner"
          className="bg-emerald-950/95 backdrop-blur-2xl text-emerald-100 px-4 sm:px-6 py-3 flex items-center justify-between text-xs overflow-x-auto border-y border-emerald-800/60 sticky top-16 z-30 shadow-2xl"
        >
          <div className="flex items-center gap-3 shrink-0">
            <span className="bg-emerald-600 text-slate-950 font-black px-3 py-0.5 rounded-full text-[10px] tracking-wide flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              PKR SOLAR INDEX 2026
            </span>
            <div className="flex items-center gap-4 text-[11px] font-bold text-emerald-200">
              {pakistanMarketRates.tier1Brands.slice(0, 4).map((b) => (
                <button
                  key={b.name}
                  onClick={() => setSearchQuery(b.name.split(' ')[0])}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="font-bold text-white">{b.name}:</span>
                  <span className="text-emerald-300 font-black">Rs. {b.perWatt}/W</span>
                  <span className="text-[10px] text-emerald-400">({b.change})</span>
                </button>
              ))}
            </div>
          </div>

          <button
            id="view-full-calculator-link"
            onClick={() => setShowPakistanRatesModal(true)}
            className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 ml-4 underline underline-offset-2"
          >
            <span>Complete Price Sheet & ROI Calc</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* 3. TURN-KEY SOLAR PACKAGES SECTION */}
        <section id="turnkey-packages-container" className="relative z-20 bg-slate-950/95 p-4 sm:p-8 max-w-7xl mx-auto w-full pt-10">
          <SolarPackagesSection
            onOpenQuotationModal={() => setShowQuotationModal(true)}
            onOpenCheckoutModal={(pkg) => setSelectedPackageForCheckout(pkg)}
          />
        </section>

        {/* 4. FEATURED SOLAR SPEC SHOWCASE SECTION */}
        <section id="spec-showcase-section" className="relative z-20 bg-slate-950/95 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6 pt-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Featured Spec</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Solar Panel Specifications & Live Pricing (PKR)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuotationModal(true)}
                className="text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Request Quotation</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Featured Pin (Left/Center - 8 cols) */}
            <div className="lg:col-span-8">
              <MainPinCard
                pin={activePin}
                onBack={() => {
                  setActivePin(pins[0]);
                  setSearchQuery('');
                }}
                onOpenLightbox={(img) => {
                  setLightboxImage(img);
                  setLightboxTitle(activePin.title);
                }}
                onRemixImage={handleRemix}
                onSavePin={handleSavePin}
                isSaved={savedPinIds.has(activePin.id)}
                onAddComment={handleAddComment}
                onToggleCommentLike={handleToggleCommentLike}
                onOpenPakistanRates={() => setShowPakistanRatesModal(true)}
              />
            </div>

            {/* Right Side Column Pins (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {sidePins.map((pin) => (
                <PinThumbnailCard
                  key={pin.id}
                  pin={pin}
                  onSelectPin={(p) => setActivePin(p)}
                  onSavePin={handleSavePin}
                  isSaved={savedPinIds.has(pin.id)}
                  onQuickView={(p) => {
                    setLightboxImage(p.imageUrl);
                    setLightboxTitle(p.title);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE PAKISTAN SOLAR ROI CALCULATOR SECTION */}
        <section id="roi-calculator-section" className="relative z-20 bg-slate-950/95 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6 pt-12">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">ROI Estimator</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Calculate Monthly Electricity Savings & Payback
              </h2>
            </div>

            <button
              onClick={() => setShowQuotationModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get System Quote</span>
            </button>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-2xl p-4 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <PakistanRoiCalculator />
          </div>
        </section>

        {/* 6. COMPLETED PROJECTS PORTFOLIO GALLERY */}
        <section id="completed-projects-container" className="relative z-20 bg-slate-950/95 p-4 sm:p-8 max-w-7xl mx-auto w-full pt-12">
          <CompletedProjectsPortfolio />
        </section>

        {/* 7. CLIENT TESTIMONIALS & GOOGLE RATINGS */}
        <section id="client-testimonials-container" className="relative z-20 bg-slate-950/95 p-4 sm:p-8 max-w-7xl mx-auto w-full pt-12">
          <TestimonialsSection />
        </section>

        {/* 8. RENEWABLE ENERGY PROJECTS GALLERY */}
        <section id="projects-gallery-section" className="relative z-20 bg-slate-950/95 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Projects Feed</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Renewable Solar Energy Projects
              </h2>
            </div>

            {/* Brand Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'longi', label: 'Longi 585W' },
                { id: 'jinko', label: 'Jinko 585W' },
                { id: 'canadian', label: 'Canadian 600W' },
                { id: 'ja solar', label: 'JA Solar 580W' },
                { id: 'trina', label: 'Trina 600W' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedBrandFilter(item.id);
                    const matchedPin = pins.find((p) =>
                      item.id === 'all'
                        ? true
                        : p.solarPrice?.brand?.toLowerCase().includes(item.id) ||
                          p.title.toLowerCase().includes(item.id)
                    );
                    if (matchedPin) setActivePin(matchedPin);
                  }}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedBrandFilter === item.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bottomPins.map((pin) => (
              <PinThumbnailCard
                key={pin.id}
                pin={pin}
                onSelectPin={(p) => setActivePin(p)}
                onSavePin={handleSavePin}
                isSaved={savedPinIds.has(pin.id)}
                onQuickView={(p) => {
                  setLightboxImage(p.imageUrl);
                  setLightboxTitle(p.title);
                }}
              />
            ))}
          </div>
        </section>

        {/* 9. FAQ ACCORDION & NET METERING GUIDE */}
        <section id="faq-section-container" className="relative z-20 bg-slate-950/95 p-4 sm:p-8 max-w-7xl mx-auto w-full pt-12">
          <FaqSection />
        </section>


        {/* Company Footer with Direct Contact Info */}
        <footer className="mt-20 pt-10 border-t border-slate-800 text-center text-xs text-slate-400 space-y-4 pb-16">
          <div className="flex items-center justify-center gap-2 font-black text-white text-lg">
            <Sun className="w-6 h-6 text-amber-400 fill-current" />
            <span>SOLAR COMPANY PAKISTAN</span>
          </div>

          <p className="max-w-md mx-auto text-slate-300 font-medium">
            High-efficiency solar technology, turn-key EPC installation, and real-time per-watt market pricing across Pakistan.
          </p>

          {/* Integrated User Contact Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            <a
              href="https://wa.me/923480906798?text=Hello,%20I%20want%20a%20quotation%20for%20a%20solar%20system"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-400/40 text-xs transition-transform hover:scale-105"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Phone / WhatsApp: +92-03480906798</span>
            </a>

            <a
              href="mailto:tradernft0348@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-400/40 text-xs transition-transform hover:scale-105"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Email: tradernft0348@gmail.com</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-500 font-semibold">
            © 2026 Solar Company. Complete Checkout & Payment Gateway Integration. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Checkout & Payment Gateway Modal */}
      <CheckoutModal
        isOpen={!!selectedPackageForCheckout}
        onClose={() => setSelectedPackageForCheckout(null)}
        selectedPackage={selectedPackageForCheckout}
        currentUser={currentUser}
      />

      {/* User Orders & Status Modal */}
      <UserOrdersModal
        isOpen={showUserOrdersModal}
        onClose={() => setShowUserOrdersModal(false)}
      />

      {/* User Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccessAuth={(user) => setCurrentUser(user)}
      />

      {/* Protected Admin Leads & Orders Dashboard Modal */}
      <AdminDashboardModal
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
      />

      {/* Quotation Inquiry Modal */}
      <QuotationModal
        isOpen={showQuotationModal}
        onClose={() => setShowQuotationModal(false)}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={!!lightboxImage}
        imageUrl={lightboxImage || ''}
        title={lightboxTitle}
        onClose={() => setLightboxImage(null)}
      />

      {/* Visual Search Modal */}
      <VisualSearchModal
        isOpen={showVisualSearch}
        onClose={() => setShowVisualSearch(false)}
        onSelectTagSearch={(tag) => setSearchQuery(tag)}
      />

      {/* Create Pin Modal */}
      <CreatePinModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPinCreated={handlePinCreated}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      {/* Pakistan Solar Market Rates & Calculator Modal */}
      <PakistanRatesModal
        isOpen={showPakistanRatesModal}
        onClose={() => setShowPakistanRatesModal(false)}
      />
    </div>
  );
}
