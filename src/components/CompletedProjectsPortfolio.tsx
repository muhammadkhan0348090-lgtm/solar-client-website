import React, { useState } from 'react';
import { MapPin, Zap, TrendingDown, CheckCircle2 } from 'lucide-react';

export const CompletedProjectsPortfolio: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const projects = [
    {
      id: 'proj-1',
      title: '15kW Rooftop Solar Installation - DHA Phase 6',
      city: 'Lahore',
      capacityKw: '15 kW',
      beforeBill: 'Rs. 95,000 / mo',
      afterBill: 'Rs. 4,500 / mo',
      savings: '95% Savings',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      panels: 'Longi 585W N-Type',
    },
    {
      id: 'proj-2',
      title: '10kW Hybrid Battery System - F-7/2 Sector',
      city: 'Islamabad',
      capacityKw: '10 kW Hybrid',
      beforeBill: 'Rs. 62,000 / mo',
      afterBill: 'Rs. 2,100 / mo',
      savings: '96% Savings',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
      panels: 'Jinko 585W Tiger Neo',
    },
    {
      id: 'proj-3',
      title: '25kW Commercial Factory Setup - SITE Area',
      city: 'Karachi',
      capacityKw: '25 kW Three-Phase',
      beforeBill: 'Rs. 185,000 / mo',
      afterBill: 'Rs. 12,000 / mo',
      savings: '93% Savings',
      image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=800&q=80',
      panels: 'Canadian 600W HiKu7',
    },
    {
      id: 'proj-4',
      title: '12kW Hybrid Backup Solar - University Town',
      city: 'Peshawar',
      capacityKw: '12 kW Hybrid',
      beforeBill: 'Rs. 78,000 / mo',
      afterBill: 'Rs. 3,200 / mo',
      savings: '95% Savings',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      panels: 'JA Solar 580W',
    },
  ];

  const filtered = selectedCity === 'all' ? projects : projects.filter((p) => p.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <section id="completed-projects-portfolio" className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Proven Track Record</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Completed Solar Projects Portfolio Across Pakistan
          </h2>
        </div>

        {/* City Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {['all', 'Lahore', 'Islamabad', 'Karachi', 'Peshawar'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCity === city
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {city === 'all' ? 'All Cities' : city}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{proj.city}</span>
              </div>
              <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-[10px] font-black shadow-md">
                {proj.capacityKw}
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{proj.title}</h3>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Bill Before Solar:</span>
                  <span className="line-through text-red-400 font-semibold">{proj.beforeBill}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Bill After Solar:</span>
                  <span className="text-emerald-300 font-black">{proj.afterBill}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Panels: {proj.panels}</span>
                <span className="text-amber-400 font-bold">{proj.savings}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
