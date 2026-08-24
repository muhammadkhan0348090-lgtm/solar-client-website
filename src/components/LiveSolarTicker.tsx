import React from 'react';
import { Zap, DollarSign, Sun, Award, ShieldCheck } from 'lucide-react';

export const LiveSolarTicker: React.FC = () => {
  const metrics = [
    { icon: Zap, value: '5.8+ MW', label: 'Clean Solar Installed', color: 'text-amber-400' },
    { icon: DollarSign, value: 'PKR 140M+', label: 'Saved for Clients', color: 'text-emerald-400' },
    { icon: Sun, value: '1,250+', label: 'Pakistani Rooftops', color: 'text-cyan-400' },
    { icon: Award, value: 'Tier-1 Rated', label: 'NEPRA & AEDB Certified', color: 'text-amber-300' },
  ];

  return (
    <div className="w-full bg-slate-950/90 border-y border-amber-500/20 backdrop-blur-xl py-3 px-4 overflow-hidden shadow-lg select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-bold">
        {metrics.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${m.color} shadow-sm shrink-0`}>
                <IconComp className="w-4 h-4" />
              </div>
              <div>
                <p className={`font-black text-sm leading-none ${m.color}`}>{m.value}</p>
                <span className="text-[10px] opacity-75 font-semibold leading-tight">{m.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
