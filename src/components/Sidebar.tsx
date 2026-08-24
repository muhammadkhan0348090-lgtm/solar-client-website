import React from 'react';
import {
  Home,
  Package,
  Calculator,
  Zap,
  Compass,
  Camera,
  Plus,
  Settings,
  Sun,
  X,
  FileText,
  ShieldCheck,
  Phone,
  Mail,
  Layers,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSettings: () => void;
  onOpenCreateModal: () => void;
  onOpenVisualSearch: () => void;
  onOpenPakistanRates: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenCreateModal,
  onOpenVisualSearch,
  onOpenPakistanRates,
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', targetId: 'top-hero-animation-container' },
    { id: 'packages', icon: Package, label: 'Packages', targetId: 'turnkey-packages-container' },
    { id: 'calculator', icon: Calculator, label: 'ROI Calculator', targetId: 'roi-calculator-section' },
    { id: 'net-metering', icon: Zap, label: 'Net Metering', targetId: 'net-metering-simulator-container' },
    { id: 'portfolio', icon: Compass, label: 'Projects & Portfolio', targetId: 'completed-projects-portfolio' },
    { id: 'visual-search', icon: Camera, label: 'Visual Search', isAction: 'visual-search' },
    { id: 'create', icon: Plus, label: 'Create Pin', isSpecial: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
    if (item.isSpecial) {
      onOpenCreateModal();
      return;
    }
    if (item.isAction === 'visual-search') {
      onOpenVisualSearch();
      return;
    }
    if (item.targetId) {
      if (item.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(item.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <aside
      id="main-sidebar"
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-16 md:w-20 bg-slate-950/90 backdrop-blur-2xl border-r border-amber-500/20 flex-col items-center justify-between py-5 z-40 shadow-2xl shadow-amber-500/5 select-none"
    >
      {/* Top Logo / Brand */}
      <div className="flex flex-col items-center gap-6 w-full">
        <button
          id="brand-logo-btn"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Solar Company Pakistan"
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-300 hover:from-amber-300 hover:to-orange-400 text-slate-950 flex items-center justify-center transition-all duration-200 shadow-xl shadow-amber-500/40 ring-2 ring-amber-400/40 hover:scale-105 cursor-pointer"
        >
          <Sun className="w-7 h-7 fill-current stroke-[2.2] animate-spin-slow" />
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center gap-3.5 w-full px-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.isSpecial) {
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={onOpenCreateModal}
                  title="Create new Solar Pin"
                  className="relative w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/50 text-emerald-300 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </button>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item)}
                title={item.label}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 text-slate-950 font-black shadow-lg shadow-amber-500/40 ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-950 scale-105'
                    : 'text-slate-400 hover:bg-slate-900/90 hover:text-amber-300 hover:border hover:border-amber-500/30'
                }`}
              >
                {/* Glowing Indicator Pill on Active Item */}
                {isActive && (
                  <span className="absolute -left-2 w-1.5 h-6 rounded-r-full bg-gradient-to-b from-amber-300 via-orange-400 to-amber-500 shadow-md shadow-amber-400/80 animate-pulse" />
                )}

                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings Button */}
      <div className="flex flex-col items-center gap-2">
        <button
          id="nav-settings-btn"
          onClick={onOpenSettings}
          title="Settings"
          className="w-11 h-11 rounded-2xl text-slate-400 hover:bg-slate-900/90 hover:text-amber-300 hover:border hover:border-amber-500/30 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Settings className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>
    </aside>
  );
};

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSettings: () => void;
  onOpenCreateModal: () => void;
  onOpenVisualSearch: () => void;
  onOpenPakistanRates: () => void;
  onOpenQuotationModal: () => void;
  onOpenAdminDashboard: () => void;
  onOpenUserOrdersModal: () => void;
  currentUser: any;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenCreateModal,
  onOpenVisualSearch,
  onOpenPakistanRates,
  onOpenQuotationModal,
  onOpenAdminDashboard,
  onOpenUserOrdersModal,
  currentUser,
}) => {
  if (!isOpen) return null;

  const mobileNavItems = [
    { id: 'home', icon: Home, label: 'Home Feed', targetId: 'top-hero-animation-container' },
    { id: 'packages', icon: Package, label: 'Turn-Key Solar Packages', targetId: 'turnkey-packages-container' },
    { id: 'calculator', icon: Calculator, label: 'ROI Savings Calculator', targetId: 'roi-calculator-section' },
    { id: 'net-metering', icon: Zap, label: 'Net Metering Simulator', targetId: 'net-metering-simulator-container' },
    { id: 'portfolio', icon: Compass, label: 'Completed Projects Portfolio', targetId: 'completed-projects-portfolio' },
  ];

  const handleMobileNav = (item: typeof mobileNavItems[0]) => {
    setActiveTab(item.id);
    onClose();
    if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      />

      {/* Drawer Body */}
      <div className="relative w-[85vw] max-w-sm bg-slate-900/95 border-r border-amber-500/30 text-white flex flex-col justify-between p-5 z-10 shadow-2xl backdrop-blur-2xl h-full overflow-y-auto">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30">
                <Sun className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white leading-none">SOLAR COMPANY</h3>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Pakistan Hub</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Status Badge */}
          {currentUser ? (
            <div className="bg-slate-950/90 p-3 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-inner">
              <div className="w-10 h-10 rounded-full bg-fuchsia-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[11px] text-emerald-400 truncate">{currentUser.email}</p>
              </div>
            </div>
          ) : null}

          {/* Nav Items */}
          <div className="space-y-1.5">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMobileNav(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                onClose();
                onOpenVisualSearch();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950 text-amber-300 font-bold text-xs border border-amber-500/30 hover:bg-slate-800 transition-all min-h-[44px]"
            >
              <Camera className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Visual Blueprint Search</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenCreateModal();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/40 hover:bg-emerald-500/30 transition-all min-h-[44px]"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Create New Solar Pin</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenPakistanRates();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950 text-amber-300 font-bold text-xs border border-slate-800 hover:border-amber-400/50 transition-all min-h-[44px]"
            >
              <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
              <span>PKR Rates & Wholesale Index</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuotationModal();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all min-h-[44px]"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Get Free Quotation</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAdminDashboard();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950 text-emerald-400 font-bold text-xs border border-emerald-500/40 hover:bg-slate-800 transition-all min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Admin Dashboard (/admin)</span>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  onClose();
                  onOpenUserOrdersModal();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950 text-slate-200 font-bold text-xs border border-slate-800 hover:bg-slate-800 transition-all min-h-[44px]"
              >
                <Package className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>My Orders & Payment Status</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/80 hover:text-white font-medium text-xs transition-all min-h-[44px]"
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
          <a href="https://wa.me/923480906798" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-400 font-bold">
            <Phone className="w-3.5 h-3.5" />
            <span>+92-03480906798</span>
          </a>
          <a href="mailto:tradernft0348@gmail.com" className="flex items-center gap-2 text-slate-300 font-medium truncate">
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">tradernft0348@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
