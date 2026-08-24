import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Zap,
  TrendingDown,
  Sun,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  Gauge,
  Home,
  Building2,
  Layers,
  BatteryCharging
} from 'lucide-react';
import { pakistanMarketRates } from '../data';

interface PakistanRoiCalculatorProps {
  initialMonthlyKwh?: number;
  initialBrandRate?: number;
}

interface DiscoTariff {
  name: string;
  avgRatePerKwh: number; // PKR including FPA, GST, surcharges
  description: string;
}

const discoList: DiscoTariff[] = [
  { name: 'LESCO (Lahore)', avgRatePerKwh: 58, description: 'Lahore Electric Supply' },
  { name: 'IESCO (Islamabad/Rawalpindi)', avgRatePerKwh: 56, description: 'Islamabad Electric Supply' },
  { name: 'K-Electric (Karachi)', avgRatePerKwh: 64, description: 'Karachi Electric' },
  { name: 'FESCO (Faisalabad)', avgRatePerKwh: 55, description: 'Faisalabad Electric' },
  { name: 'MEPCO (Multan/South Punjab)', avgRatePerKwh: 57, description: 'Multan Electric Supply' },
  { name: 'PESCO / GEPCO / Others', avgRatePerKwh: 59, description: 'Regional Distribution Cos' },
];

export const PakistanRoiCalculator: React.FC<PakistanRoiCalculatorProps> = ({
  initialMonthlyKwh = 750,
  initialBrandRate = 29.5,
}) => {
  // User Inputs
  const [monthlyKwh, setMonthlyKwh] = useState<number>(initialMonthlyKwh);
  const [selectedBrandRate, setSelectedBrandRate] = useState<number>(initialBrandRate);
  const [systemType, setSystemType] = useState<'ongrid' | 'hybrid'>('ongrid');
  const [selectedDisco, setSelectedDisco] = useState<string>('LESCO (Lahore)');
  const [customTariff, setCustomTariff] = useState<number>(58);
  const [isCustomTariff, setIsCustomTariff] = useState<boolean>(false);
  const [includeNetMetering, setIncludeNetMetering] = useState<boolean>(true);

  // Active electricity tariff in PKR/kWh
  const activeTariff = useMemo(() => {
    if (isCustomTariff) return customTariff;
    const found = discoList.find((d) => d.name === selectedDisco);
    return found ? found.avgRatePerKwh : 58;
  }, [isCustomTariff, customTariff, selectedDisco]);

  // Real-time calculations tailored to Pakistan solar conditions:
  // 1 kW of Tier-1 solar panels yields ~125-135 units (kWh) per month on average across Pakistan
  const avgUnitsPerKwMonth = 130;

  // Recommended system capacity in kW (rounded to nearest 0.5 kW)
  const recommendedKw = useMemo(() => {
    const rawKw = monthlyKwh / avgUnitsPerKwMonth;
    const rounded = Math.max(1.5, Math.min(50, Math.round(rawKw * 2) / 2));
    return rounded;
  }, [monthlyKwh]);

  // Solar plate specifications (using standard 585W N-Type Tier-1 plate)
  const plateWattage = 585;
  const platesRequired = useMemo(() => {
    return Math.ceil((recommendedKw * 1000) / plateWattage);
  }, [recommendedKw]);

  const actualSolarCapacityWatts = platesRequired * plateWattage;
  const actualSolarCapacityKw = Math.round((actualSolarCapacityWatts / 1000) * 10) / 10;

  // Area requirement (~75 sq ft per kW)
  const rooftopAreaSqFt = Math.round(actualSolarCapacityKw * 75);

  // Costs breakdown in PKR:
  const platesCost = useMemo(() => {
    return Math.round(actualSolarCapacityWatts * selectedBrandRate);
  }, [actualSolarCapacityWatts, selectedBrandRate]);

  const inverterCost = useMemo(() => {
    if (systemType === 'hybrid') {
      if (recommendedKw <= 3.6) return 165000;
      if (recommendedKw <= 6) return 245000;
      if (recommendedKw <= 10) return 375000;
      if (recommendedKw <= 15) return 520000;
      return Math.round(recommendedKw * 34000);
    } else {
      if (recommendedKw <= 3.5) return 95000;
      if (recommendedKw <= 5) return 145000;
      if (recommendedKw <= 10) return 225000;
      if (recommendedKw <= 15) return 315000;
      if (recommendedKw <= 20) return 410000;
      return Math.round(recommendedKw * 20000);
    }
  }, [systemType, recommendedKw]);

  const batteryCost = useMemo(() => {
    if (systemType !== 'hybrid') return 0;
    if (recommendedKw <= 5) return 320000;
    if (recommendedKw <= 10) return 580000;
    return 850000;
  }, [systemType, recommendedKw]);

  const structureAndBalanceOfSystemCost = useMemo(() => {
    return Math.round(actualSolarCapacityKw * 23500);
  }, [actualSolarCapacityKw]);

  const netMeteringCost = useMemo(() => {
    if (!includeNetMetering) return 0;
    return 125000;
  }, [includeNetMetering]);

  const totalSystemCost = useMemo(() => {
    return platesCost + inverterCost + batteryCost + structureAndBalanceOfSystemCost + netMeteringCost;
  }, [platesCost, inverterCost, batteryCost, structureAndBalanceOfSystemCost, netMeteringCost]);

  const monthlySolarGeneratedKwh = useMemo(() => {
    return Math.round(actualSolarCapacityKw * avgUnitsPerKwMonth);
  }, [actualSolarCapacityKw]);

  const annualSolarGeneratedKwh = monthlySolarGeneratedKwh * 12;

  const monthlySavingsPkr = useMemo(() => {
    const effectiveUnits = Math.min(monthlyKwh, monthlySolarGeneratedKwh);
    const surplusUnits = Math.max(0, monthlySolarGeneratedKwh - monthlyKwh);
    const regularSavings = effectiveUnits * activeTariff;
    const exportCredit = surplusUnits * 24;
    return Math.round(regularSavings + exportCredit);
  }, [monthlyKwh, monthlySolarGeneratedKwh, activeTariff]);

  const annualSavingsPkr = monthlySavingsPkr * 12;

  const paybackYearsRaw = useMemo(() => {
    if (annualSavingsPkr <= 0) return 0;
    return totalSystemCost / annualSavingsPkr;
  }, [totalSystemCost, annualSavingsPkr]);

  const paybackYears = Math.floor(paybackYearsRaw);
  const paybackMonths = Math.round((paybackYearsRaw - paybackYears) * 12);

  const lifetimeSavings25Years = useMemo(() => {
    let total = 0;
    let currentAnnualSaving = annualSavingsPkr;
    for (let yr = 1; yr <= 25; yr++) {
      total += currentAnnualSaving;
      currentAnnualSaving = currentAnnualSaving * 1.025;
    }
    return Math.round(total - totalSystemCost);
  }, [annualSavingsPkr, totalSystemCost]);

  const roiPercentage = useMemo(() => {
    if (totalSystemCost <= 0) return 0;
    return Math.round((lifetimeSavings25Years / totalSystemCost) * 100);
  }, [lifetimeSavings25Years, totalSystemCost]);

  const presets = [
    { label: 'Small Home (3-5 Marla)', kwh: 400, bill: 'Rs. 22,000' },
    { label: 'Medium Home (10 Marla)', kwh: 750, bill: 'Rs. 43,000' },
    { label: '1 Kanal / AC Heavy', kwh: 1300, bill: 'Rs. 75,000' },
    { label: '2 Kanal / Commercial', kwh: 2400, bill: 'Rs. 140,000' },
  ];

  return (
    <motion.div
      id="pakistan-roi-calculator-widget"
      className="space-y-5 text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >

      {/* Header & Badges */}
      <div className="theme-card backdrop-blur-2xl p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-2xl border">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-0.5 rounded-full text-[11px] border border-emerald-500/40 flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                NEPRA & WAPDA 2026 Index
              </span>
              <span className="text-[11px] text-emerald-300 font-semibold">Live PKR Rates</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              Pakistan Real-Time Solar ROI & Payback Estimator
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Calculate exact payback timeline, monthly unit offsets, and complete turn-key CAPEX using today's Tier-1 panel rates in PKR.
            </p>
          </div>

          {/* Quick Payback Stat Badge */}
          <div className="bg-slate-900/90 border border-emerald-400/40 rounded-2xl p-3.5 text-center shrink-0 shadow-xl">
            <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Estimated Payback</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">
              {paybackYears}y {paybackMonths}m
            </p>
            <p className="text-[10px] text-slate-300 font-semibold">
              ROI: <span className="font-bold text-emerald-300">{roiPercentage}%</span> (25 Yrs)
            </p>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Input Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Col: Energy & Tariff Controls */}
        <div className="lg:col-span-7 space-y-4 bg-slate-900/85 backdrop-blur-xl p-5 rounded-3xl border border-slate-800 shadow-xl">
          {/* Monthly Energy Consumption Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="monthly-kwh-input" className="text-xs font-bold text-white flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-400" />
                Monthly Electricity Consumption (Units / kWh)
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="monthly-kwh-input"
                  type="number"
                  min={100}
                  max={5000}
                  step={50}
                  value={monthlyKwh}
                  onChange={(e) => setMonthlyKwh(Math.max(50, Number(e.target.value) || 0))}
                  className="w-20 px-2.5 py-1 text-right text-xs font-black text-emerald-400 bg-slate-950 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                />
                <span className="text-xs font-bold text-slate-400">kWh</span>
              </div>
            </div>

            <input
              type="range"
              min={150}
              max={3000}
              step={25}
              value={monthlyKwh}
              onChange={(e) => setMonthlyKwh(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />

            {/* Quick Consumption Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3">
              {presets.map((p) => (
                <button
                  key={p.kwh}
                  type="button"
                  onClick={() => setMonthlyKwh(p.kwh)}
                  className={`p-2 text-left rounded-xl text-[11px] border transition-all ${
                    monthlyKwh === p.kwh
                      ? 'bg-emerald-600 text-white border-emerald-400 font-bold shadow-md'
                      : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <p className="font-semibold truncate">{p.label}</p>
                  <p className={`text-[10px] ${monthlyKwh === p.kwh ? 'text-emerald-200' : 'text-slate-400'}`}>
                    ~{p.kwh} Units ({p.bill})
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* DISCO / Electricity Tariff Selector */}
          <div className="pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                Electricity Provider / DISCO Tariff (PKR/Unit)
              </label>
              <button
                type="button"
                onClick={() => setIsCustomTariff(!isCustomTariff)}
                className="text-[11px] text-emerald-400 font-bold hover:underline"
              >
                {isCustomTariff ? 'Use Preset DISCO' : 'Custom Tariff'}
              </button>
            </div>

            {!isCustomTariff ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {discoList.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setSelectedDisco(d.name)}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      selectedDisco === d.name
                        ? 'bg-emerald-950/90 border-emerald-400 text-white font-bold ring-1 ring-emerald-400'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{d.name.split(' ')[0]}</p>
                    <p className="text-[11px] text-emerald-400 font-black">Rs. {d.avgRatePerKwh} / Unit</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-700">
                <input
                  type="number"
                  min={20}
                  max={120}
                  step={1}
                  value={customTariff}
                  onChange={(e) => setCustomTariff(Number(e.target.value) || 58)}
                  className="w-24 px-3 py-1 text-sm font-bold text-emerald-400 bg-slate-900 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                />
                <span className="text-xs text-slate-400 font-medium">
                  Enter average bill rate per unit (including fuel price adjustment & taxes)
                </span>
              </div>
            )}
          </div>

          {/* Panel Brand Rate Selector */}
          <div className="pt-3 border-t border-slate-800">
            <label className="text-xs font-bold text-white mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                Select Tier-1 Panel Model (Current Market Rate)
              </span>
              <span className="text-emerald-400 font-black">
                Active: Rs. {selectedBrandRate}/Watt
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {pakistanMarketRates.tier1Brands.map((brand) => (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() => setSelectedBrandRate(brand.perWatt)}
                  className={`p-2 rounded-xl text-left border text-xs transition-all ${
                    selectedBrandRate === brand.perWatt
                      ? 'bg-emerald-600 text-white border-emerald-400 font-bold shadow-md'
                      : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <p className="font-bold truncate">{brand.name.split(' ')[0]} 585W</p>
                  <p className={`text-[11px] font-black ${selectedBrandRate === brand.perWatt ? 'text-emerald-200' : 'text-emerald-400'}`}>
                    Rs. {brand.perWatt}/W (Rs. {brand.perPlate.toLocaleString()})
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* System Configuration Options */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">System Mode:</span>
              <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSystemType('ongrid')}
                  className={`px-3.5 py-2 rounded-lg transition-all min-h-[44px] cursor-pointer flex items-center justify-center ${
                    systemType === 'ongrid' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  On-Grid (Net Metering)
                </button>
                <button
                  type="button"
                  onClick={() => setSystemType('hybrid')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer ${
                    systemType === 'hybrid' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BatteryCharging className="w-3.5 h-3.5" />
                  Hybrid + Battery
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNetMetering}
                onChange={(e) => setIncludeNetMetering(e.target.checked)}
                className="w-4 h-4 text-emerald-500 bg-slate-950 border-slate-700 rounded-sm focus:ring-emerald-400"
              />
              <span>Include DISCO Green Meter (Rs. 125k)</span>
            </label>
          </div>
        </div>

        {/* Right Col: Instant Results & Financial Summary */}
        <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
          {/* Key Recommended Sizing Box */}
          <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 sm:p-5 rounded-3xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                  {actualSolarCapacityKw}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Recommended System
                  </h4>
                  <p className="text-sm font-black text-emerald-300">{actualSolarCapacityKw} kW Turn-Key Setup</p>
                </div>
              </div>

              <span className="text-[11px] font-bold bg-slate-900 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40">
                {platesRequired} Plates (585W)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-medium">Monthly Generation</p>
                <p className="text-xs font-bold text-white">~{monthlySolarGeneratedKwh.toLocaleString()} Units/mo</p>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-medium">Roof Space Required</p>
                <p className="text-xs font-bold text-white">~{rooftopAreaSqFt} Sq. Ft.</p>
              </div>
            </div>
          </div>

          {/* Financial Breakdown Card */}
          <div className="bg-slate-900/85 backdrop-blur-xl border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Investment & Savings (PKR)</span>
              <span className="text-[10px] text-slate-400 font-normal">Turn-key EPC</span>
            </h4>

            <div className="space-y-2 text-xs divide-y divide-slate-800">
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Tier-1 Solar Plates ({actualSolarCapacityWatts}W):</span>
                <span className="font-bold text-white">Rs. {platesCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-slate-400">
                  {systemType === 'hybrid' ? 'Hybrid Inverter + Battery:' : 'On-Grid String Inverter:'}
                </span>
                <span className="font-bold text-white">
                  Rs. {(inverterCost + batteryCost).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-slate-400">GI Structure, Cabling & Earthing:</span>
                <span className="font-bold text-white">Rs. {structureAndBalanceOfSystemCost.toLocaleString()}</span>
              </div>
              {includeNetMetering && (
                <div className="flex items-center justify-between pt-1.5">
                  <span className="text-slate-400">DISCO Net Metering & Approval:</span>
                  <span className="font-bold text-white">Rs. {netMeteringCost.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2.5 text-sm bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="font-black text-white">Total Upfront CAPEX:</span>
                <span className="font-black text-amber-400">Rs. {totalSystemCost.toLocaleString()} PKR</span>
              </div>
            </div>
          </div>

          {/* Monthly Savings & ROI Highlights */}
          <div className="bg-linear-to-br from-amber-500 to-amber-600 text-slate-950 p-4 sm:p-5 rounded-3xl shadow-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider opacity-85">
                  Est. Monthly Bill Savings
                </p>
                <p className="text-xl sm:text-2xl font-black">
                  Rs. {monthlySavingsPkr.toLocaleString()} <span className="text-xs font-bold">/ month</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-wider opacity-85">
                  Annual Savings
                </p>
                <p className="text-sm sm:text-base font-black">
                  Rs. {annualSavingsPkr.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-slate-950/20 backdrop-blur-xs p-2 rounded-xl text-xs flex items-center justify-between">
              <span className="font-bold">25-Year Net Cumulative Return:</span>
              <span className="font-black">Rs. {lifetimeSavings25Years.toLocaleString()} PKR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payback Timeline Visual Progress */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Solar Investment Payback Milestone Progress
          </span>
          <span className="font-black text-emerald-400">
            {paybackYears} Years {paybackMonths} Months
          </span>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex border border-slate-800">
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(10, (paybackYearsRaw / 5) * 100))}%` }}
          />
          <div className="bg-emerald-500 h-full flex-1" />
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-semibold">
          <span>Day 1 (System Boot)</span>
          <span className="text-amber-400 font-bold">Payback Point (~{paybackYears}y {paybackMonths}m)</span>
          <span className="text-emerald-400 font-bold">Years 3-25 (100% Free Energy)</span>
        </div>
      </div>
    </motion.div>
  );
};

