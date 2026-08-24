import React, { useState } from 'react';
import { ShieldCheck, Award, CheckCircle2, FileText, Sun, Cpu, Clock, RefreshCw } from 'lucide-react';

export const WarrantyChecker: React.FC = () => {
  const [selectedPanel, setSelectedPanel] = useState('Longi Hi-MO 6 / 7');
  const [selectedInverter, setSelectedInverter] = useState('Nitrox / Knox Hybrid');

  const panelData: Record<string, { brand: string; powerWarranty: string; productWarranty: string; efficiency: string; cert: string }> = {
    'Longi Hi-MO 6 / 7': {
      brand: 'Longi Solar (Tier-1)',
      powerWarranty: '25-Year Linear Power Output (88.9%)',
      productWarranty: '12-Year Workmanship Warranty',
      efficiency: '22.8% Module Efficiency',
      cert: 'IEC 61215 / TUV Certified',
    },
    'Jinko Tiger Neo': {
      brand: 'Jinko Solar N-Type',
      powerWarranty: '30-Year Performance Output',
      productWarranty: '12-Year Full Hardware Warranty',
      efficiency: '23.2% Module Efficiency',
      cert: 'ISO9001 / NEPRA Approved',
    },
    'Canadian Solar': {
      brand: 'Canadian Solar HiKu7',
      powerWarranty: '25-Year Linear Power Output',
      productWarranty: '12-Year Manufacturers Warranty',
      efficiency: '22.5% Module Efficiency',
      cert: 'Anti-PID Certified',
    },
  };

  const inverterData: Record<string, { brand: string; warranty: string; monitoring: string; protection: string }> = {
    'Nitrox / Knox Hybrid': {
      brand: 'Nitrox / Knox PV',
      warranty: '10-Year Full Warranty (5 Yrs Replacement + 5 Yrs Repair)',
      monitoring: 'Free Lifetime WiFi App Monitoring',
      protection: 'IP65 Water & Dustproof Outdoor Rating',
    },
    'Inverex Nitrox': {
      brand: 'Inverex Solar Pakistan',
      warranty: '10-Year Official Company Warranty',
      monitoring: 'Dual MPPT Smart Tracking',
      protection: 'Surge Protection Device (SPD) Built-in',
    },
    'Growatt / Huawei': {
      brand: 'Huawei / Growatt Commercial',
      warranty: '10-Year Official Guarantee',
      monitoring: 'AI Arc Fault Protection (AFCI)',
      protection: 'Grid-tied High Surge Capacity',
    },
  };

  const currentPanel = panelData[selectedPanel];
  const currentInverter = inverterData[selectedInverter];

  return (
    <section id="warranty-checker-section" className="my-10 space-y-6">
      <div className="theme-card border rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Tier-1 Equipment Authenticity
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
              Official Equipment Warranty & Certification Verification
            </h2>
            <p className="text-xs sm:text-sm font-medium opacity-85 mt-1 max-w-xl">
              Inspect official guarantees for Tier-1 solar panels and hybrid inverters supplied across Pakistan.
            </p>
          </div>
        </div>

        {/* Brand Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-90 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" /> Select Solar Panel Model
            </label>
            <select
              value={selectedPanel}
              onChange={(e) => setSelectedPanel(e.target.value)}
              className="w-full bg-slate-900 border border-amber-500/40 rounded-2xl px-4 py-3 text-xs font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              <option value="Longi Hi-MO 6 / 7">Longi Hi-MO 6 / 7 (585W N-Type)</option>
              <option value="Jinko Tiger Neo">Jinko Tiger Neo (585W Bifacial)</option>
              <option value="Canadian Solar">Canadian Solar (600W+ HiKu7)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-90 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" /> Select Inverter Model
            </label>
            <select
              value={selectedInverter}
              onChange={(e) => setSelectedInverter(e.target.value)}
              className="w-full bg-slate-900 border border-emerald-500/40 rounded-2xl px-4 py-3 text-xs font-bold text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              <option value="Nitrox / Knox Hybrid">Nitrox / Knox 10kW Hybrid</option>
              <option value="Inverex Nitrox">Inverex Nitrox 5kW - 20kW</option>
              <option value="Growatt / Huawei">Huawei / Growatt Commercial</option>
            </select>
          </div>
        </div>

        {/* Warranty Badges Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Panel Card */}
          <div className="bg-slate-950/80 border border-amber-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">{currentPanel.brand}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                100% Authentic
              </span>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentPanel.powerWarranty}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{currentPanel.productWarranty}</span>
              </div>
              <div className="flex items-center gap-2 opacity-90">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{currentPanel.efficiency} • {currentPanel.cert}</span>
              </div>
            </div>
          </div>

          {/* Inverter Card */}
          <div className="bg-slate-950/80 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">{currentInverter.brand}</span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Official Warranty
              </span>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentInverter.warranty}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{currentInverter.monitoring}</span>
              </div>
              <div className="flex items-center gap-2 opacity-90">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentInverter.protection}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
