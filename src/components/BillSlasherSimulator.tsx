import React, { useState } from 'react';
import { Zap, TrendingDown, ArrowRight, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export const BillSlasherSimulator: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState(45000);
  const [disco, setDisco] = useState('LESCO');

  // Tariff rate per unit in PKR based on DISCO
  const ratePerUnit = disco === 'K-Electric' ? 58 : disco === 'IESCO' ? 52 : disco === 'LESCO' ? 54 : 50;

  // Monthly kWh consumed
  const monthlyUnits = Math.round(monthlyBill / ratePerUnit);

  // Solar system size needed
  const systemKwNeeded = Math.max(3, Math.ceil((monthlyUnits / 120) * 2) / 2);

  // Solar bill post net-metering
  const solarBill = Math.min(1800, Math.round(monthlyBill * 0.04));
  const monthlySavings = monthlyBill - solarBill;
  const annualSavings = monthlySavings * 12;
  const annualUnitsExported = Math.round(systemKwNeeded * 1450);

  const handleWhatsAppCTA = () => {
    const text = encodeURIComponent(
      `Hello Solar Company Pakistan! I used your Bill Slasher tool.\n\n` +
      `📌 Current Monthly Bill: PKR ${monthlyBill.toLocaleString()}\n` +
      `⚡ DISCO Provider: ${disco}\n` +
      `☀️ Recommended Solar System: ${systemKwNeeded} kW\n` +
      `💰 Expected Monthly Savings: PKR ${monthlySavings.toLocaleString()}\n\n` +
      `Please provide a official turn-key proposal for zeroing my bill.`
    );
    window.open(`https://wa.me/923480906798?text=${text}`, '_blank');
  };

  return (
    <section id="bill-slasher-section" className="my-10 space-y-6">
      <div className="theme-card border rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-current text-amber-400" /> Live Bill Slasher Simulator
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                2026 DISCO Tariffs
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Slash Your Electricity Bill to <span className="text-emerald-400">PKR 0</span>
            </h2>
            <p className="text-xs sm:text-sm font-medium opacity-85 mt-1 max-w-xl">
              Adjust your average monthly WAPDA / K-Electric bill below to simulate net metering savings.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold opacity-80">DISCO:</span>
            <select
              value={disco}
              onChange={(e) => setDisco(e.target.value)}
              className="bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="LESCO">LESCO (Lahore)</option>
              <option value="IESCO">IESCO (Islamabad / RWP)</option>
              <option value="K-Electric">K-Electric (Karachi)</option>
              <option value="PESCO">PESCO (Peshawar)</option>
              <option value="MEPCO">MEPCO (Multan)</option>
              <option value="FESCO">FESCO (Faisalabad)</option>
            </select>
          </div>
        </div>

        {/* Interactive Controls & Live Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Slider Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider opacity-90">
                  Current Monthly Electricity Bill
                </label>
                <span className="text-2xl font-black text-amber-400">
                  PKR {monthlyBill.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min={15000}
                max={300000}
                step={5000}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] font-semibold opacity-60">
                <span>PKR 15,000</span>
                <span>PKR 150,000</span>
                <span>PKR 300,000+</span>
              </div>
            </div>

            {/* Simulated Comparison Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-2xl">
                <span className="text-[10px] font-extrabold uppercase text-red-400 tracking-wider">Before Solar (WAPDA)</span>
                <p className="text-xl sm:text-2xl font-black text-red-300 mt-1">PKR {monthlyBill.toLocaleString()}</p>
                <span className="text-[10px] text-slate-400 font-medium">~{monthlyUnits} Units @ PKR {ratePerUnit}/unit</span>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl">
                <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">After Solar (Net Metered)</span>
                <p className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">PKR {solarBill.toLocaleString()}</p>
                <span className="text-[10px] text-emerald-400 font-semibold">100% Offset + Fixed Charges</span>
              </div>
            </div>
          </div>

          {/* Savings Summary Column & WhatsApp CTA */}
          <div className="lg:col-span-5 bg-slate-950/70 border border-amber-500/30 p-6 rounded-3xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Recommended Solar Setup
              </span>

              <div className="space-y-2 border-b border-slate-800 pb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-80">Recommended System:</span>
                  <span className="font-black text-amber-300 text-sm">{systemKwNeeded} kW Turn-Key</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-80">Monthly Net Savings:</span>
                  <span className="font-black text-emerald-400 text-sm">PKR {monthlySavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-80">Annual Direct Savings:</span>
                  <span className="font-black text-emerald-300 text-sm">PKR {annualSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-80">Annual Net Metered Export:</span>
                  <span className="font-black text-cyan-300 text-sm">~{annualUnitsExported.toLocaleString()} Units</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsAppCTA}
              className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-transform active:scale-95 cursor-pointer min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>Zero My Bill Now - WhatsApp Expert</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
