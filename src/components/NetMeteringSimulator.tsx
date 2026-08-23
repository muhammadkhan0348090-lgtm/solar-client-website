import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Clock, 
  HelpCircle, 
  MessageCircle,
  FileText,
  Sliders,
  DollarSign,
  Sun,
  Grid,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { generateQuotationPDF } from '../utils/pdfGenerator';

type SystemMode = 'On-Grid' | 'Hybrid' | 'Off-Grid';

export const NetMeteringSimulator: React.FC = () => {
  const [systemMode, setSystemMode] = useState<SystemMode>('On-Grid');
  const [monthlyBillPkr, setMonthlyBillPkr] = useState<number>(65000);
  const [disco, setDisco] = useState<string>('LESCO (Lahore)');

  const discoList = [
    'LESCO (Lahore)',
    'IESCO (Islamabad/Rawalpindi)',
    'K-Electric (Karachi)',
    'FESCO (Faisalabad)',
    'MEPCO (Multan)',
    'GEPCO (Gujranwala)',
    'PESCO (Peshawar)',
  ];

  // Tariff & Net Metering Calculations under NEPRA regulations
  const calculations = useMemo(() => {
    // Average cost per unit (PKR) including DISCO taxes/fuel adjustments
    const tariffPerKwh = 58; // Approx peak/off-peak blended PKR rate
    const exportCreditRatePkr = 31; // NEPRA off-peak export buyback credit per unit

    // Estimated monthly consumed grid units
    const monthlyUnitsConsumed = Math.round(monthlyBillPkr / tariffPerKwh);

    // Recommended system capacity to achieve zero net electricity bill
    let recommendedKw = Math.ceil((monthlyUnitsConsumed / 120) * 10) / 10;
    if (recommendedKw < 5) recommendedKw = 5;

    // Monthly Solar Units Generation (approx 120 - 135 units per kW per month in Pakistan)
    const monthlyUnitsGenerated = Math.round(recommendedKw * 130);

    // Grid export vs self-consumption breakdown (70% self-consumed during daytime, 30% exported to grid during peak hours)
    const selfConsumedUnits = Math.round(monthlyUnitsGenerated * 0.65);
    const exportedUnits = Math.round(monthlyUnitsGenerated * 0.35);

    // Direct savings from self-consumption
    const directSavingsPkr = Math.round(selfConsumedUnits * tariffPerKwh);

    // Grid export credit from DISCO green meter
    const exportCreditPkr = Math.round(exportedUnits * exportCreditRatePkr);

    // Total Monthly Financial Savings (PKR)
    const totalMonthlySavingsPkr = Math.min(monthlyBillPkr, directSavingsPkr + exportCreditPkr);

    // CAPEX Estimation (PKR) depending on mode
    let capexPerKw = 135000; // On-Grid baseline
    if (systemMode === 'Hybrid') capexPerKw = 155000; // Hybrid with Lithium storage
    if (systemMode === 'Off-Grid') capexPerKw = 175000; // Off-Grid with heavy batteries

    const totalCapexPkr = Math.round(recommendedKw * capexPerKw);

    // Payback Period Calculations
    const paybackMonths = Math.round((totalCapexPkr / (totalMonthlySavingsPkr * 12)) * 12);
    const paybackYears = (paybackMonths / 12).toFixed(1);

    // 25-Year Lifetime Savings (accounting for 5% annual grid tariff inflation)
    let lifetimeSavingsPkr = 0;
    let currentAnnualSavings = totalMonthlySavingsPkr * 12;
    for (let yr = 1; yr <= 25; yr++) {
      lifetimeSavingsPkr += currentAnnualSavings;
      currentAnnualSavings *= 1.05; // 5% tariff inflation
    }

    return {
      monthlyUnitsConsumed,
      recommendedKw,
      monthlyUnitsGenerated,
      selfConsumedUnits,
      exportedUnits,
      exportCreditPkr,
      totalMonthlySavingsPkr,
      totalCapexPkr,
      paybackMonths,
      paybackYears,
      lifetimeSavingsPkr: Math.round(lifetimeSavingsPkr),
    };
  }, [monthlyBillPkr, systemMode]);

  const whatsappMessage = encodeURIComponent(
    `Hello! I simulated my Net Metering Green Energy Savings for ${disco}:\n` +
    `• Monthly DISCO Bill: Rs. ${monthlyBillPkr.toLocaleString()} PKR\n` +
    `• System Mode: ${systemMode}\n` +
    `• Recommended Solar Capacity: ${calculations.recommendedKw} kW\n` +
    `• Est. Payback Period: ${calculations.paybackYears} Years (${calculations.paybackMonths} Months)\n` +
    `• 25-Year Lifetime Savings: Rs. ${(calculations.lifetimeSavingsPkr / 1000000).toFixed(2)} Million PKR\n` +
    `Please process my turn-key DISCO Green Metering License.`
  );

  return (
    <section id="net-metering-simulator-section" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-emerald-500/5 to-cyan-500/10 rounded-3xl blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-amber-500/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Interactive AI Tool #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span className="text-emerald-300">DISCO Green Metering</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Net Metering <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-teal-300">Green Energy Savings</span> Simulator
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-medium">
          Toggle system architecture, adjust your monthly DISCO bill slider, and calculate your unit export credits, ROI payback timeline, and 25-year lifetime financial return.
        </p>
      </div>

      {/* Simulator Card Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
        
        {/* Row 1: System Mode Selector + DISCO Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-800 pb-6">
          
          {/* System Architecture Toggles */}
          <div className="md:col-span-8 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Select Solar Architecture Mode:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['On-Grid', 'Hybrid', 'Off-Grid'] as SystemMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSystemMode(mode)}
                  className={`py-3 px-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex flex-col items-center gap-1 ${
                    systemMode === mode
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-102 border-2 border-emerald-300'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span>{mode}</span>
                  <span className="text-[10px] font-normal opacity-85">
                    {mode === 'On-Grid' && 'Net Metering Priority'}
                    {mode === 'Hybrid' && 'Net Meter + Battery'}
                    {mode === 'Off-Grid' && '100% Standalone'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* DISCO Dropdown */}
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Your Electricity DISCO:
            </label>
            <select
              value={disco}
              onChange={(e) => setDisco(e.target.value)}
              className="w-full py-3 px-4 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              {discoList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Row 2: Interactive Bill Slider & Real-time Bill Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Bill Slider (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Monthly Grid Electricity Bill (PKR):</span>
                </span>
                <span className="text-2xl font-black text-amber-300">
                  Rs. {monthlyBillPkr.toLocaleString()} <span className="text-xs text-slate-400">/ mo</span>
                </span>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="15000"
                max="500000"
                step="5000"
                value={monthlyBillPkr}
                onChange={(e) => setMonthlyBillPkr(Number(e.target.value))}
                className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />

              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>Rs. 15,000</span>
                <span>Rs. 150,000</span>
                <span>Rs. 500,000+</span>
              </div>
            </div>

            {/* Quick Bill Preset Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[25000, 45000, 75000, 120000, 200000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setMonthlyBillPkr(preset)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    monthlyBillPkr === preset
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Rs. {(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>

            {/* Unit Generation & Export Credit Breakdown */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Monthly Solar Unit Gen</span>
                <p className="text-2xl font-black text-emerald-400">
                  ~{calculations.monthlyUnitsGenerated.toLocaleString()} <span className="text-xs text-slate-400">kWh</span>
                </p>
                <p className="text-[10px] text-slate-400">Based on {calculations.recommendedKw}kW PV array</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Est. Grid Export Credit</span>
                <p className="text-2xl font-black text-amber-300">
                  Rs. {calculations.exportCreditPkr.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400">NEPRA Green Meter Credit</p>
              </div>

            </div>

          </div>

          {/* Right: Key Financial ROI Summary Box (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/40 p-6 rounded-3xl space-y-6 shadow-2xl shadow-emerald-500/10">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    Simulated ROI Breakdown
                  </span>
                  <h4 className="text-lg font-black text-white">Financial Summary</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Net Zero Bill
                </span>
              </div>

              {/* Payback Period Highlight */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Estimated System Payback</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    {calculations.paybackYears} Years
                  </span>
                  <span className="text-sm font-bold text-amber-300">
                    ({calculations.paybackMonths} Months)
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  After payback, your electricity is 100% FREE for 20+ years.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Recommended Capacity:</span>
                  <span className="text-white font-bold">{calculations.recommendedKw} kW ({systemMode})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Turn-Key Installed CAPEX:</span>
                  <span className="text-amber-300 font-bold">Rs. {calculations.totalCapexPkr.toLocaleString()} PKR</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Monthly Bill Reduction:</span>
                  <span className="text-emerald-400 font-bold">Rs. {calculations.totalMonthlySavingsPkr.toLocaleString()} PKR</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                  <span className="text-slate-300 font-bold">25-Year Cumulative Savings:</span>
                  <span className="text-emerald-300 font-black text-sm">
                    Rs. {(calculations.lifetimeSavingsPkr / 1000000).toFixed(2)} Million PKR
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/923480906798?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Claim Turn-Key Net Metering License</span>
                </a>

                <button
                  onClick={() =>
                    generateQuotationPDF({
                      systemSizeKw: calculations.recommendedKw,
                      panelBrand: 'Longi / Canadian Tier-1 N-Type 585W',
                      totalCapexPkr: calculations.totalCapexPkr,
                      monthlySavingsPkr: calculations.totalMonthlySavingsPkr,
                      monthlyBillPkr: monthlyBillPkr,
                      paybackTimeline: `${calculations.paybackYears} Years`,
                    })
                  }
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition-colors cursor-pointer min-h-[44px]"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Net Metering Feasibility PDF</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
