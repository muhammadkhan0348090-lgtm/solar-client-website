import React from 'react';
import { Home, Compass, Plus, Bell, MessageSquare, Settings, Sun, X, FileText, ShieldCheck, Phone, Mail, Package, Calculator, Zap } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSettings: () => void;
  onOpenCreateModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenCreateModal,
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'create', icon: Plus, label: 'Create', isSpecial: true },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: 2 },
    { id: 'messages', icon: MessageSquare, label: 'Messages', hasDot: true },
  ];

  return (
    <aside
      id="main-sidebar"
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-16 md:w-18 bg-slate-950/85 backdrop-blur-2xl border-r border-slate-800/80 flex-col items-center justify-between py-5 z-40 shadow-2xl select-none"
    >
      {/* Top Logo / Brand */}
      <div className="flex flex-col items-center gap-6 w-full">
        <button
          id="brand-logo-btn"
          onClick={() => setActiveTab('home')}
          title="Solar Company"
          className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 flex items-center justify-center transition-all duration-200 shadow-lg shadow-amber-500/30 hover:scale-105 cursor-pointer"
        >
          <Sun className="w-6 h-6 fill-current stroke-[2.2]" />
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center gap-3 w-full px-2" aria-label="Main Navigation">
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
                  className="relative w-11 h-11 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </button>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
                {item.badge && !isActive && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                {item.hasDot && !isActive && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings */}
      <div className="flex flex-col items-center gap-2">
        <button
          id="nav-settings-btn"
          onClick={onOpenSettings}
          title="Settings"
          className="w-11 h-11 rounded-xl text-slate-400 hover:bg-slate-800/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
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
  onOpenPakistanRates,
  onOpenQuotationModal,
  onOpenAdminDashboard,
  onOpenUserOrdersModal,
  currentUser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Drawer Body */}
      <div className="relative w-[82vw] max-w-sm bg-slate-900 border-r border-slate-800 text-white flex flex-col justify-between p-5 z-10 shadow-2xl h-full overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Sun className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white leading-none">SOLAR COMPANY</h3>
                <span className="text-[10px] font-bold text-emerald-400">Pakistan Hub</span>
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
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-fuchsia-600 text-white font-bold text-sm flex items-center justify-center">
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
            {[
              { id: 'home', icon: Home, label: 'Home Feed' },
              { id: 'explore', icon: Compass, label: 'Explore Solar Specs' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                onClose();
                onOpenCreateModal();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/40 hover:bg-emerald-500/30 transition-all min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Solar Pin</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenPakistanRates();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950 text-amber-300 font-bold text-xs border border-slate-800 hover:border-amber-400/50 transition-all min-h-[44px]"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>PKR Rates & Calculator</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuotationModal();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              <span>Get Free Quotation</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAdminDashboard();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950 text-emerald-400 font-bold text-xs border border-emerald-500/40 hover:bg-slate-800 transition-all min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4" />
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
                <Package className="w-4 h-4 text-emerald-400" />
                <span>My Orders & Status</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/80 hover:text-white font-medium text-xs transition-all min-h-[44px]"
            >
              <Settings className="w-4 h-4" />
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

