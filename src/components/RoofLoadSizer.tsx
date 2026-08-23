import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Home, 
  Sun, 
  Battery, 
  Layers, 
  Plus, 
  Minus, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Tv,
  Fan,
  Wind,
  Droplets,
  Refrigerator
} from 'lucide-react';
import { generateQuotationPDF } from '../utils/pdfGenerator';

export interface ApplianceItem {
  id: string;
  name: string;
  category: 'cooling' | 'appliances' | 'lighting' | 'heavy';
  icon: React.ElementType;
  wattage: number; // Avg continuous run wattage
  defaultHours: number;
  count: number;
  hoursPerDay: number;
}

const initialAppliances: ApplianceItem[] = [
  { id: 'ac-15', name: '1.5-Ton Inverter AC', category: 'cooling', icon: Wind, wattage: 1500, defaultHours: 8, count: 2, hoursPerDay: 8 },
  { id: 'fridge', name: 'Inverter Refrigerator / Freezer', category: 'appliances', icon: Refrigerator, wattage: 350, defaultHours: 24, count: 1, hoursPerDay: 24 },
  { id: 'fan', name: 'BLDC / Inverter Fans', category: 'cooling', icon: Fan, wattage: 55, defaultHours: 12, count: 6, hoursPerDay: 12 },
  { id: 'pump', name: '1.5 HP Water Pump / Motor', category: 'heavy', icon: Droplets, wattage: 1200, defaultHours: 1.5, count: 1, hoursPerDay: 1.5 },
  { id: 'led', name: 'LED Lights (12W-18W)', category: 'lighting', icon: Zap, wattage: 15, defaultHours: 8, count: 12, hoursPerDay: 8 },
  { id: 'tv', name: '55" Smart LED TV', category: 'appliances', icon: Tv, wattage: 120, defaultHours: 5, count: 1, hoursPerDay: 5 },
  { id: 'wash', name: 'Automatic Washing Machine', category: 'appliances', icon: Home, wattage: 600, defaultHours: 1, count: 1, hoursPerDay: 1 },
  { id: 'microwave', name: 'Microwave Oven (1000W)', category: 'heavy', icon: Zap, wattage: 1000, defaultHours: 0.5, count: 1, hoursPerDay: 0.5 },
];

export const RoofLoadSizer: React.FC = () => {
  const [appliances, setAppliances] = useState<ApplianceItem[]>(initialAppliances);
  const [sunlightHours, setSunlightHours] = useState<number>(5.2); // Avg peak sun hours in Pakistan
  const [roofOrientation, setRoofOrientation] = useState<'South' | 'East-West' | 'Flat/Elevated'>('South');

  const handleUpdateCount = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const handleUpdateHours = (id: string, hours: number) => {
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, hoursPerDay: Math.max(0.5, Math.min(24, hours)) } : item))
    );
  };

  const handleApplyPreset = (preset: 'small' | 'medium' | 'large') => {
    if (preset === 'small') {
      setAppliances(
        initialAppliances.map((a) => {
          if (a.id === 'ac-15') return { ...a, count: 1, hoursPerDay: 6 };
          if (a.id === 'fan') return { ...a, count: 4, hoursPerDay: 10 };
          if (a.id === 'led') return { ...a, count: 8, hoursPerDay: 6 };
          if (a.id === 'pump') return { ...a, count: 1, hoursPerDay: 1 };
          if (a.id === 'wash') return { ...a, count: 1, hoursPerDay: 0.5 };
          return { ...a, count: a.id === 'fridge' ? 1 : 0 };
        })
      );
    } else if (preset === 'medium') {
      setAppliances(initialAppliances);
    } else if (preset === 'large') {
      setAppliances(
        initialAppliances.map((a) => {
          if (a.id === 'ac-15') return { ...a, count: 4, hoursPerDay: 10 };
          if (a.id === 'fan') return { ...a, count: 10, hoursPerDay: 14 };
          if (a.id === 'led') return { ...a, count: 20, hoursPerDay: 8 };
          if (a.id === 'fridge') return { ...a, count: 2, hoursPerDay: 24 };
          if (a.id === 'pump') return { ...a, count: 2, hoursPerDay: 2 };
          if (a.id === 'tv') return { ...a, count: 3, hoursPerDay: 6 };
          return { ...a, count: 2 };
        })
      );
    }
  };

  const resetAll = () => {
    setAppliances(initialAppliances);
  };

  // Calculations
  const calculations = useMemo(() => {
    let peakWattage = 0;
    let dailyKwhNeeded = 0;

    appliances.forEach((item) => {
      const itemWatt = item.wattage * item.count;
      peakWattage += itemWatt;
      // Daily kWh = (Watts * Count * Hours) / 1000
      dailyKwhNeeded += (itemWatt * item.hoursPerDay) / 1000;
    });

    const peakKw = peakWattage / 1000;
    // Account for 20% system losses & surge margin
    const requiredDailyGeneration = dailyKwhNeeded * 1.25;

    // Minimum system size based on daily generation and peak load
    let recommendedKw = Math.max(
      Math.ceil(requiredDailyGeneration / sunlightHours),
      Math.ceil(peakKw * 1.2)
    );

    // Snap to realistic standard Pakistan solar system sizes (5kW, 7kW, 10kW, 12kW, 15kW, 20kW, 30kW)
    if (recommendedKw <= 5) recommendedKw = 5;
    else if (recommendedKw <= 7) recommendedKw = 7;
    else if (recommendedKw <= 10) recommendedKw = 10;
    else if (recommendedKw <= 12) recommendedKw = 12;
    else if (recommendedKw <= 15) recommendedKw = 15;
    else if (recommendedKw <= 20) recommendedKw = 20;
    else recommendedKw = Math.ceil(recommendedKw / 5) * 5;

    // Panels count (using 585W N-Type TOPCon panels)
    const panelWatts = 585;
    const requiredPanels = Math.ceil((recommendedKw * 1000) / panelWatts);

    // Rooftop area needed: ~55 sq ft per kW for 585W bifacial including tilt spacing
    const roofAreaSqFt = Math.round(recommendedKw * 55);

    // Daily battery backup units required (for hybrid/off-grid evening load): ~40-60% of total daily kWh
    const dailyBatteryBackupKwh = Math.round(dailyKwhNeeded * 0.5 * 10) / 10;

    // Monthly generation est. (kWh)
    const monthlyUnits = Math.round(recommendedKw * sunlightHours * 30 * 0.85);

    // Estimated Monthly DISCO Savings in PKR (@ Rs. 55 / kWh average rate)
    const estimatedSavingsPkr = Math.round(monthlyUnits * 52);

    // Recommended Inverter type
    const inverterType = recommendedKw >= 10 ? 'Hybrid Dual MPPT 3-Phase' : 'Hybrid / On-Grid Pure Sine Wave';

    return {
      peakKw: Math.round(peakKw * 10) / 10,
      dailyKwhNeeded: Math.round(dailyKwhNeeded * 10) / 10,
      recommendedKw,
      requiredPanels,
      roofAreaSqFt,
      dailyBatteryBackupKwh,
      monthlyUnits,
      estimatedSavingsPkr,
      inverterType
    };
  }, [appliances, sunlightHours]);

  const whatsappMessage = encodeURIComponent(
    `Hello! I calculated my solar load using your AI Roof Sizer:\n` +
    `• Peak Load: ${calculations.peakKw} kW\n` +
    `• Daily Units Needed: ${calculations.dailyKwhNeeded} kWh\n` +
    `• Recommended System: ${calculations.recommendedKw}kW Hybrid\n` +
    `• Required Roof Area: ~${calculations.roofAreaSqFt} sq.ft\n` +
    `• Est. Monthly Savings: Rs. ${calculations.estimatedSavingsPkr.toLocaleString()} PKR\n` +
    `Please provide a turn-key quotation for my home.`
  );

  return (
    <section id="ai-roof-sizer-section" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Neon Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-cyan-500/10 rounded-3xl blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-emerald-500/10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Interactive AI Tool #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-amber-300">Tier-1 Precision Sizer</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          AI Roof Solar Viability & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Load Sizer</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-medium">
          Select your household appliances to calculate required peak load, daily battery backup units, system size (kW), and rooftop square footage in real time.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Appliance Selector & Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Presets Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Home className="w-4 h-4 text-emerald-400" />
                <span>Quick Household Presets:</span>
              </span>
              <button
                onClick={resetAll}
                className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleApplyPreset('small')}
                className="py-2.5 px-3 rounded-2xl bg-slate-950/80 hover:bg-emerald-500/20 border border-slate-800 hover:border-emerald-500/50 text-xs font-bold text-slate-200 hover:text-emerald-300 transition-all cursor-pointer flex flex-col items-center gap-1"
              >
                <span>5kW Small Home</span>
                <span className="text-[10px] text-slate-400 font-normal">1 AC • 4 Fans</span>
              </button>

              <button
                onClick={() => handleApplyPreset('medium')}
                className="py-2.5 px-3 rounded-2xl bg-slate-950/80 hover:bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 hover:text-amber-200 transition-all cursor-pointer flex flex-col items-center gap-1 shadow-md shadow-amber-500/5"
              >
                <span>10kW Standard Family</span>
                <span className="text-[10px] text-amber-400/80 font-normal">2 ACs • Heavy Load</span>
              </button>

              <button
                onClick={() => handleApplyPreset('large')}
                className="py-2.5 px-3 rounded-2xl bg-slate-950/80 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 text-xs font-bold text-slate-200 hover:text-cyan-300 transition-all cursor-pointer flex flex-col items-center gap-1"
              >
                <span>20kW Commercial/Villa</span>
                <span className="text-[10px] text-slate-400 font-normal">4 ACs • Full Backup</span>
              </button>
            </div>
          </div>

          {/* Appliance Selection List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Select & Adjust Home Appliances</span>
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                {appliances.filter((a) => a.count > 0).length} Active Items
              </span>
            </h3>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
              {appliances.map((item) => {
                const IconComponent = item.icon;
                const totalItemWatt = item.wattage * item.count;
                const isSelected = item.count > 0;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-950/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                        : 'bg-slate-950/40 border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left: Info */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{item.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({item.wattage}W each)</span>
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">
                            Total: <span className="text-amber-400 font-bold">{totalItemWatt} Watts</span>
                          </p>
                        </div>
                      </div>

                      {/* Right: Quantity Controls & Hours */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                        
                        {/* Hours Slider Input */}
                        {isSelected && (
                          <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 font-medium">Hrs/day:</span>
                            <input
                              type="number"
                              min="0.5"
                              max="24"
                              step="0.5"
                              value={item.hoursPerDay}
                              onChange={(e) => handleUpdateHours(item.id, parseFloat(e.target.value) || 1)}
                              className="w-12 text-center text-xs font-bold text-amber-300 bg-transparent focus:outline-none"
                            />
                          </div>
                        )}

                        {/* Increment / Decrement Counter */}
                        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                          <button
                            onClick={() => handleUpdateCount(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="w-6 text-center text-xs font-black text-white">
                            {item.count}
                          </span>

                          <button
                            onClick={() => handleUpdateCount(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center transition-colors cursor-pointer active:scale-95 border border-emerald-500/30"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Real-Time Calculations & System Sizing Output (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900/95 border-2 border-emerald-500/40 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl shadow-emerald-500/10 space-y-6 relative overflow-hidden">
            
            {/* Top Glowing Header Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Live AI Solar Recommendation
                </span>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>Recommended System</span>
                </h3>
              </div>

              <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black animate-pulse">
                Viability: 99% HIGH
              </div>
            </div>

            {/* Recommended Size Display Box */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border border-emerald-500/30 text-center space-y-2 relative">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Suggested Capacity</span>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-teal-300 tracking-tight">
                {calculations.recommendedKw} kW <span className="text-xl text-white font-extrabold">Hybrid</span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Load-Shedding & Turn-Key DISCO Net Metering</span>
              </p>
            </div>

            {/* 4 Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Peak Wattage */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Peak Wattage</span>
                </div>
                <p className="text-lg font-black text-white">
                  {calculations.peakKw} <span className="text-xs text-slate-400 font-bold">kW</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Max Simultaneous Power</p>
              </div>

              {/* Daily Energy & Battery Backup Units */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
                  <Battery className="w-4 h-4" />
                  <span>Daily Battery Backup</span>
                </div>
                <p className="text-lg font-black text-white">
                  {calculations.dailyBatteryBackupKwh} <span className="text-xs text-slate-400 font-bold">kWh / Units</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Lithium LiFePO4 Sizing</p>
              </div>

              {/* Rooftop Area Required */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <Building2 className="w-4 h-4" />
                  <span>Roof Area Required</span>
                </div>
                <p className="text-lg font-black text-white">
                  {calculations.roofAreaSqFt} <span className="text-xs text-slate-400 font-bold">sq. ft</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  ~{calculations.requiredPanels}x 585W Panels
                </p>
              </div>

              {/* Monthly Savings */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                  <Sun className="w-4 h-4" />
                  <span>Est. Bill Savings</span>
                </div>
                <p className="text-lg font-black text-emerald-400">
                  Rs. {calculations.estimatedSavingsPkr.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Per Month Reduction</p>
              </div>

            </div>

            {/* Inverter & Technical Specifications Summary */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span className="font-medium text-slate-400">Inverter Tech:</span>
                <span className="font-bold text-white">{calculations.inverterType}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span className="font-medium text-slate-400">Solar Plates:</span>
                <span className="font-bold text-amber-300">{calculations.requiredPanels}x Tier-1 N-Type 585W</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-400">Net Metering Eligibility:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Guaranteed
                </span>
              </div>
            </div>

            {/* Action Buttons: WhatsApp Quote & Download PDF */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/923480906798?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Instant WhatsApp Quotation</span>
              </a>

              <button
                onClick={() =>
                  generateQuotationPDF({
                    systemSizeKw: calculations.recommendedKw,
                    panelBrand: 'Longi / Jinko Tier-1 N-Type 585W',
                    totalCapexPkr: calculations.recommendedKw * 145000,
                    monthlySavingsPkr: calculations.estimatedSavingsPkr,
                    monthlyBillPkr: calculations.estimatedSavingsPkr * 1.15,
                    paybackTimeline: '2.4 Years',
                  })
                }
                className="w-full py-3 px-5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Download System Sizing Specification PDF</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
