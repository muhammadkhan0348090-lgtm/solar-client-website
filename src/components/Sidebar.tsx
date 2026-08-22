import React from 'react';
import { Home, Compass, Plus, Bell, MessageSquare, Settings, Sun } from 'lucide-react';

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
      className="fixed left-0 top-0 bottom-0 w-16 md:w-18 bg-slate-950/85 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col items-center justify-between py-5 z-40 shadow-2xl select-none"
    >
      {/* Top Logo / Brand */}
      <div className="flex flex-col items-center gap-6 w-full">
        <button
          id="brand-logo-btn"
          onClick={() => setActiveTab('home')}
          title="Solar Company"
          className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 flex items-center justify-center transition-all duration-200 shadow-lg shadow-amber-500/30 hover:scale-105"
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
                  className="relative w-11 h-11 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
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
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ${
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
          className="w-11 h-11 rounded-xl text-slate-400 hover:bg-slate-800/80 hover:text-white flex items-center justify-center transition-colors"
        >
          <Settings className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>
    </aside>
  );
};
