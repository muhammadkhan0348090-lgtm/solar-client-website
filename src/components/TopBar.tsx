import React, { useState } from 'react';
import { Search, Camera, Mic, ChevronDown, Check, Sun, Sparkles, X, Tag, Phone, Mail, FileText, User, ShieldCheck, LogOut, Package } from 'lucide-react';
import { generateQuotationPDF } from '../utils/pdfGenerator';

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onVisualSearch: () => void;
  onVoiceSearch: () => void;
  onOpenPakistanRates: () => void;
  onOpenQuotationModal: () => void;
  onOpenAuthModal: () => void;
  onOpenAdminDashboard: () => void;
  onOpenUserOrdersModal: () => void;
  currentUser: any;
  onLogout: () => void;
  isListening?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  setSearchQuery,
  onVisualSearch,
  onVoiceSearch,
  onOpenPakistanRates,
  onOpenQuotationModal,
  onOpenAuthModal,
  onOpenAdminDashboard,
  onOpenUserOrdersModal,
  currentUser,
  onLogout,
  isListening = false,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header
      id="main-topbar"
      className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-2xl px-4 sm:px-6 py-3 border-b border-slate-800/80 flex items-center justify-between gap-3 sm:gap-4 shadow-xl"
    >
      {/* Brand Identity */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2.5 font-semibold text-white tracking-tight">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-bold">
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

      {/* Main Search Input */}
      <div className="flex-1 max-w-xl">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isListening ? 'Listening for solar query...' : 'Search Longi 585W, Jinko, Lahore prices, Nitrox inverters...'}
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-hidden font-medium"
          />

          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white p-0.5 rounded-full"
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
            className="text-slate-400 hover:text-amber-400 p-1 rounded-full hover:bg-slate-800/80 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Voice Search */}
          <button
            id="mic-voice-search-btn"
            onClick={onVoiceSearch}
            title="Voice search"
            className={`p-1 rounded-full transition-all ${
              isListening
                ? 'text-red-400 bg-red-900/60 animate-pulse'
                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/80'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions & Auth Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* PDF Download Button */}
        <button
          onClick={() =>
            generateQuotationPDF({
              systemSizeKw: 10,
              panelBrand: 'Longi 585W Tier-1',
              totalCapexPkr: 1450000,
              monthlySavingsPkr: 58000,
              monthlyBillPkr: 65000,
              paybackTimeline: '2.5 Years',
            })
          }
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all shadow-md"
          title="Download instant PDF solar proposal"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>PDF Quote</span>
        </button>

        {/* Get Free Quote CTA Button */}
        <button
          id="topbar-get-quote-btn"
          onClick={onOpenQuotationModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg transition-all active:scale-95 shrink-0"
          title="Get a free solar system quotation"
        >
          <span>Get Quote</span>
        </button>

        {/* Admin Dashboard Quick Button */}
        <button
          onClick={onOpenAdminDashboard}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/40 transition-colors shadow-lg"
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
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-800/80 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-fuchsia-600 text-white font-bold text-sm flex items-center justify-center shadow-md border border-fuchsia-400/30">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shadow-md"
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
                  className="w-full text-left px-4 py-2 hover:bg-emerald-500/10 text-emerald-300 font-bold flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-emerald-400" />
                  My Orders & Payment Status
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenAdminDashboard();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-emerald-500/10 text-emerald-300 font-bold flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Admin Dashboard (/admin)
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenQuotationModal();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-amber-500/10 text-amber-300 font-bold flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  Request Free Solar Quotation
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-500/10 text-red-400 font-bold flex items-center gap-2 border-t border-slate-800 mt-1"
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
