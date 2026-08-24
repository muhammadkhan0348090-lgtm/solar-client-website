import React, { useState, useRef, useEffect } from 'react';
import { Search, Camera, Mic, ChevronDown, Check, Sun, Sparkles, X, Tag, Phone, Mail, FileText, User, ShieldCheck, LogOut, Package, Menu, ArrowRight, Zap, Calculator, Layers, Award, Palette } from 'lucide-react';
import { generateQuotationPDF } from '../utils/pdfGenerator';
import { ThemeToggle } from './ThemeToggle';

export interface SearchSuggestionItem {
  id: string;
  title: string;
  category: 'Packages & Inverters' | 'Tools & Quick Links' | 'Solar Equipment' | 'Projects & Portfolio';
  badge: 'Package' | 'Inverter' | 'Panel' | 'Tool' | 'PDF' | 'License' | 'Portfolio';
  actionType: 'scroll' | 'modal' | 'pdf';
  target: string;
}

const predefinedSuggestions: SearchSuggestionItem[] = [
  // Packages & Inverters
  { id: 'ps-1', title: '5kW Residential Starter Package', category: 'Packages & Inverters', badge: 'Package', actionType: 'scroll', target: 'turnkey-packages-container' },
  { id: 'ps-2', title: '10kW Hybrid Family System', category: 'Packages & Inverters', badge: 'Package', actionType: 'scroll', target: 'turnkey-packages-container' },
  { id: 'ps-3', title: '20kW Commercial Pro System', category: 'Packages & Inverters', badge: 'Package', actionType: 'scroll', target: 'turnkey-packages-container' },
  { id: 'ps-4', title: 'Nitrox / Inverex 10kW Inverter', category: 'Packages & Inverters', badge: 'Inverter', actionType: 'scroll', target: 'turnkey-packages-container' },
  { id: 'ps-5', title: 'Knox & Growatt Hybrid Inverters', category: 'Packages & Inverters', badge: 'Inverter', actionType: 'modal', target: 'pakistan-rates' },

  // Solar Equipment
  { id: 'eq-1', title: 'Longi 585W N-Type Bifacial Panels', category: 'Solar Equipment', badge: 'Panel', actionType: 'scroll', target: 'spec-showcase-section' },
  { id: 'eq-2', title: 'Jinko 585W Tiger Neo Panels', category: 'Solar Equipment', badge: 'Panel', actionType: 'scroll', target: 'spec-showcase-section' },
  { id: 'eq-3', title: 'Canadian Solar 600W HiKu7', category: 'Solar Equipment', badge: 'Panel', actionType: 'scroll', target: 'projects-gallery-section' },
  { id: 'eq-4', title: '10.2kWh LiFePO4 Lithium Battery', category: 'Solar Equipment', badge: 'Tool', actionType: 'scroll', target: 'turnkey-packages-container' },

  // Tools & Quick Links
  { id: 'ts-1', title: 'Calculate Monthly Bill Savings', category: 'Tools & Quick Links', badge: 'Tool', actionType: 'scroll', target: 'net-metering-simulator-container' },
  { id: 'ts-2', title: 'Net Metering License Approval', category: 'Tools & Quick Links', badge: 'License', actionType: 'scroll', target: 'net-metering-simulator-container' },
  { id: 'ts-3', title: 'AI Roof Solar & Load Sizer', category: 'Tools & Quick Links', badge: 'Tool', actionType: 'scroll', target: 'ai-roof-sizer-container' },
  { id: 'ts-4', title: 'Pakistan Live Solar Price Sheet (PKR)', category: 'Tools & Quick Links', badge: 'Tool', actionType: 'modal', target: 'pakistan-rates' },
  { id: 'ts-5', title: 'Compare All Packages Side-by-Side', category: 'Tools & Quick Links', badge: 'Package', actionType: 'modal', target: 'package-comparison' },
  { id: 'ts-6', title: 'Download Official System PDF Quote', category: 'Tools & Quick Links', badge: 'PDF', actionType: 'pdf', target: 'pdf' },
  { id: 'ts-7', title: 'Book Free Site Inspection', category: 'Tools & Quick Links', badge: 'Tool', actionType: 'modal', target: 'quotation-modal' },

  // Projects & Portfolio
  { id: 'pj-1', title: 'Completed Projects Portfolio (Lahore/KHI/ISB)', category: 'Projects & Portfolio', badge: 'Portfolio', actionType: 'scroll', target: 'completed-projects-container' },
  { id: 'pj-2', title: 'Frequently Asked Questions & Guide', category: 'Projects & Portfolio', badge: 'Portfolio', actionType: 'scroll', target: 'faq-section-container' },
];

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onVisualSearch: () => void;
  onVoiceSearch: () => void;
  onOpenPakistanRates: () => void;
  onOpenQuotationModal: () => void;
  onOpenPackageComparisonModal?: () => void;
  onOpenAuthModal: () => void;
  onOpenAdminDashboard: () => void;
  onOpenUserOrdersModal: () => void;
  onOpenSiteSurveyModal?: () => void;
  currentUser: any;
  onLogout: () => void;
  isListening?: boolean;
  onToggleMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  setSearchQuery,
  onVisualSearch,
  onVoiceSearch,
  onOpenPakistanRates,
  onOpenQuotationModal,
  onOpenPackageComparisonModal,
  onOpenAuthModal,
  onOpenAdminDashboard,
  onOpenUserOrdersModal,
  onOpenSiteSurveyModal,
  currentUser,
  onLogout,
  isListening = false,
  onToggleMobileMenu,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time filtered suggestions based on user input
  const filteredSuggestions = predefinedSuggestions.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.badge.toLowerCase().includes(q);
  });

  const handleSelectSuggestion = (item: SearchSuggestionItem) => {
    setSearchQuery(item.title);
    setIsSearchFocused(false);

    if (item.actionType === 'scroll') {
      const el = document.getElementById(item.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (item.actionType === 'modal') {
      if (item.target === 'pakistan-rates') onOpenPakistanRates();
      if (item.target === 'quotation-modal') onOpenQuotationModal();
      if (item.target === 'package-comparison' && onOpenPackageComparisonModal) onOpenPackageComparisonModal();
    } else if (item.actionType === 'pdf') {
      generateQuotationPDF({
        systemSizeKw: 10,
        panelBrand: 'Longi 585W Tier-1',
        totalCapexPkr: 1450000,
        monthlySavingsPkr: 58000,
        monthlyBillPkr: 65000,
        paybackTimeline: '2.4 Years',
      });
    }
  };

  return (
    <header
      id="main-topbar"
      className="sticky top-0 z-30 theme-card backdrop-blur-2xl px-3 sm:px-6 py-2.5 sm:py-3 border-b flex items-center justify-between gap-2 sm:gap-4 shadow-xl"
    >
      {/* Mobile Drawer Hamburger & Brand Identity */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-amber-400 hover:text-white hover:bg-slate-800/80 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-semibold text-white tracking-tight">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-bold shrink-0">
            <Sun className="w-5 h-5 fill-current" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-base font-black text-white leading-none">
              SOLAR COMPANY
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">
              Pakistan Market Hub
            </span>
          </div>
        </div>
      </div>

      {/* Intelligent Autocomplete Search Bar Container */}
      <div className="flex-1 max-w-xl relative" ref={searchContainerRef}>
        <div
          id="search-input-container"
          className={`flex items-center gap-2.5 px-4 py-2 bg-slate-900/90 hover:bg-slate-900 focus-within:bg-slate-950 focus-within:ring-2 focus-within:ring-amber-400/50 focus-within:border-amber-400 border border-slate-700/70 rounded-full transition-all duration-200 shadow-inner ${
            isListening ? 'ring-2 ring-red-400 bg-red-950/40 border-red-500' : ''
          }`}
        >
          <Search className="w-4.5 h-4.5 text-amber-400 shrink-0" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchFocused(true);
            }}
            placeholder={isListening ? 'Listening for solar query...' : 'Search Longi 585W, 10kW Hybrid, Net Metering...'}
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none font-medium"
          />

          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white p-0.5 rounded-full cursor-pointer"
              title="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Camera / Visual Search */}
          <button
            id="camera-visual-search-btn"
            onClick={onVisualSearch}
            title="Search by solar blueprint image"
            className="text-slate-400 hover:text-amber-400 p-1 rounded-full hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Voice Search */}
          <button
            id="mic-voice-search-btn"
            onClick={onVoiceSearch}
            title="Voice search"
            className={`p-1 rounded-full transition-all cursor-pointer ${
              isListening
                ? 'text-red-400 bg-red-900/60 animate-pulse'
                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/80'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Smart Glassmorphic Autocomplete Suggestions Dropdown */}
        {isSearchFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-2xl border-2 border-slate-700/80 rounded-2xl shadow-2xl p-3 z-50 text-white space-y-3 max-h-96 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 px-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Intelligent Suggestions</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {filteredSuggestions.length} Results
              </span>
            </div>

            {filteredSuggestions.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching solar packages or tools found. Try searching for "5kW", "Longi", or "Net Metering".
              </div>
            ) : (
              <div className="space-y-1.5">
                {filteredSuggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-emerald-500/15 border border-slate-800 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 hover:text-emerald-300 flex items-center justify-between group transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                          item.category === 'Packages & Inverters'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                      <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </span>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions & Auth Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Dynamic Multi-Theme Switcher */}
        <ThemeToggle />

        {/* PDF Download Button */}
        <button
          onClick={() =>
            generateQuotationPDF({
              systemSizeKw: 10,
              panelBrand: 'Longi 585W Tier-1',
              totalCapexPkr: 1450000,
              monthlySavingsPkr: 58000,
              monthlyBillPkr: 65000,
              paybackTimeline: '2.4 Years',
            })
          }
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all shadow-md min-h-[44px] cursor-pointer"
          title="Download instant PDF solar proposal"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>PDF Quote</span>
        </button>

        {/* Free Site Survey CTA Button */}
        {onOpenSiteSurveyModal && (
          <button
            onClick={onOpenSiteSurveyModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg transition-all active:scale-95 shrink-0 min-h-[44px] cursor-pointer"
            title="Book free rooftop drone survey"
          >
            <Sun className="w-3.5 h-3.5 fill-current" />
            <span>Free Survey</span>
          </button>
        )}

        {/* Get Free Quote CTA Button */}
        <button
          id="topbar-get-quote-btn"
          onClick={onOpenQuotationModal}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-xs font-black shadow-lg transition-all active:scale-95 shrink-0 min-h-[44px] cursor-pointer"
          title="Get a free solar system quotation"
        >
          <span>Get Quote</span>
        </button>

        {/* Admin Dashboard Quick Button */}
        <button
          onClick={onOpenAdminDashboard}
          className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/40 transition-colors shadow-lg min-h-[44px] cursor-pointer"
          title="Open Protected Admin Leads & Orders Dashboard (/admin)"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>/admin</span>
        </button>

        {/* User Auth Profile Dropdown */}
        <div className="relative">
          {currentUser ? (
            <button
              id="profile-dropdown-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-800/80 transition-colors min-h-[44px] min-w-[44px] justify-center cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-fuchsia-600 text-white font-bold text-sm flex items-center justify-center shadow-md border border-fuchsia-400/30">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shadow-md min-h-[44px] cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Profile Dropdown */}
          {showProfileMenu && currentUser && (
            <div
              id="profile-popover-menu"
              className="absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/80 py-3 z-50 text-sm text-slate-200 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <div className="w-9 h-9 rounded-full bg-fuchsia-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{currentUser.name}</h4>
                    <p className="text-xs text-emerald-400 font-semibold">{currentUser.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 m-2 rounded-xl border border-slate-800 text-xs space-y-2">
                <a href="https://wa.me/923480906798" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-400 font-bold hover:underline">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+92-03480906798</span>
                </a>
                <a href="mailto:tradernft0348@gmail.com" className="flex items-center gap-2 text-amber-300 font-medium hover:underline truncate">
                  <Mail className="w-4 h-4 shrink-0 text-amber-400" />
                  <span className="truncate">tradernft0348@gmail.com</span>
                </a>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenUserOrdersModal();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-emerald-500/10 text-emerald-300 font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-emerald-400" />
                  My Orders & Payment Status
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenAdminDashboard();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-emerald-500/10 text-emerald-300 font-bold flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Admin Dashboard (/admin)
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenQuotationModal();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-amber-500/10 text-amber-300 font-bold flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  Request Free Solar Quotation
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-500/10 text-red-400 font-bold flex items-center gap-2 border-t border-slate-800 mt-1 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
