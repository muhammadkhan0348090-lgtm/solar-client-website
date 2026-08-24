import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sun, Moon, Sparkles, Waves } from 'lucide-react';
import { useTheme, SolarTheme } from '../ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions: { id: SolarTheme; name: string; badge: string; colorClass: string; borderClass: string; icon: React.ElementType }[] = [
    {
      id: 'solar-gold',
      name: 'Solar Gold (Default)',
      badge: 'Dark Gold',
      colorClass: 'bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400',
      borderClass: 'border-amber-400',
      icon: Sun,
    },
    {
      id: 'cyber-emerald',
      name: 'Cyber Emerald',
      badge: 'Obsidian Cyan',
      colorClass: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',
      borderClass: 'border-emerald-400',
      icon: Sparkles,
    },
    {
      id: 'deep-ocean',
      name: 'Deep Ocean Navy',
      badge: 'Sapphire Blue',
      colorClass: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500',
      borderClass: 'border-sky-400',
      icon: Waves,
    },
    {
      id: 'modern-light',
      name: 'Clean Light Slate',
      badge: 'Bright Slate',
      colorClass: 'bg-gradient-to-r from-slate-200 via-amber-400 to-slate-400 text-slate-950',
      borderClass: 'border-slate-300',
      icon: Moon,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Theme Switcher Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full theme-card border hover:border-amber-400 text-xs font-bold transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer min-h-[44px]"
        title="Switch Solar Web App Theme Palette"
      >
        <Palette className="w-4 h-4 text-amber-400 animate-pulse" />
        <span className="hidden xl:inline">Theme</span>
      </button>

      {/* Theme Options Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 theme-card backdrop-blur-2xl border-2 rounded-2xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 px-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span>Select Color Palette</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">4 Themes</span>
          </div>

          <div className="space-y-1.5">
            {themeOptions.map((option) => {
              const IconComp = option.icon;
              const isSelected = theme === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setTheme(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left border text-xs font-bold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? `theme-card ${option.borderClass} ring-2 ring-amber-400/50 shadow-md`
                      : 'theme-card border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full ${option.colorClass} flex items-center justify-center shrink-0 shadow-sm`}>
                      <IconComp className="w-3 h-3 text-slate-950" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{option.name}</p>
                      <span className="text-[9px] font-semibold opacity-75">{option.badge}</span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
