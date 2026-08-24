import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, TrendingDown, CheckCircle2 } from 'lucide-react';

interface CompletedProjectsPortfolioProps {
  onSelectProjectImage?: (image: string, title: string) => void;
}

export const CompletedProjectsPortfolio: React.FC<CompletedProjectsPortfolioProps> = ({
  onSelectProjectImage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const projects = [
    {
      id: 'proj-1',
      title: '15kW Rooftop Solar Installation - DHA Phase 6',
      city: 'Lahore',
      category: 'Residential',
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
      category: 'Residential',
      capacityKw: '10 kW Hybrid',
      beforeBill: 'Rs. 62,000 / mo',
      afterBill: 'Rs. 2,100 / mo',
      savings: '96% Savings',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
      panels: 'Jinko 585W Tiger Neo',
    },
    {
      id: 'proj-3',
      title: '25kW Commercial Plaza Setup - SITE Area',
      city: 'Karachi',
      category: 'Commercial',
      capacityKw: '25 kW Three-Phase',
      beforeBill: 'Rs. 185,000 / mo',
      afterBill: 'Rs. 12,000 / mo',
      savings: '93% Savings',
      image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=800&q=80',
      panels: 'Canadian 600W HiKu7',
    },
    {
      id: 'proj-4',
      title: '50kW Industrial Factory Plant - Industrial Estate',
      city: 'Peshawar',
      category: 'Industrial',
      capacityKw: '50 kW Heavy Duty',
      beforeBill: 'Rs. 340,000 / mo',
      afterBill: 'Rs. 18,000 / mo',
      savings: '95% Savings',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      panels: 'JA Solar 580W',
    },
  ];

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Residential' | 'Commercial' | 'Industrial'>('all');
  const [cityFilter, setCityFilter] = useState<'all' | 'Lahore' | 'Islamabad' | 'Karachi' | 'Peshawar'>('all');

  const filtered = projects.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesCity = cityFilter === 'all' || p.city === cityFilter;
    return matchesCat && matchesCity;
  });

  return (
    <section id="completed-projects-portfolio" className="space-y-6 text-white my-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Verified Field Installations</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
            Completed Projects & Client Success Portfolio
          </h2>
        </div>

        {/* Dual Category & City Filter Bars */}
        <div className="flex flex-col gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {(['all', 'Residential', 'Commercial', 'Industrial'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                  categoryFilter === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Sectors' : cat}
              </button>
            ))}
          </div>

          {/* City Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {(['all', 'Lahore', 'Islamabad', 'Karachi', 'Peshawar'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                  cityFilter === city
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {city === 'all' ? 'All Cities' : city}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto snap-x scrollbar-none pb-3 sm:pb-0">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onSelectProjectImage && onSelectProjectImage(proj.image, `${proj.title} - ${proj.city}`)}
            className="theme-card rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 shadow-xl transition-all duration-300 w-[84vw] sm:w-auto shrink-0 snap-center cursor-pointer group"
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
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {proj.category}
                </span>
                <span className="text-amber-400 text-xs font-bold">{proj.savings}</span>
              </div>

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

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Panels: {proj.panels}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Operational
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

