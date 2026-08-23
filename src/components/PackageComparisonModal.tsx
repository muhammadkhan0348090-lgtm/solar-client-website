import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Minus, 
  ShieldCheck, 
  Zap, 
  Sun, 
  CreditCard, 
  MessageCircle, 
  FileText, 
  Award,
  Sparkles,
  Smartphone,
  BatteryCharging,
  Layers
} from 'lucide-react';
import { generateQuotationPDF } from '../utils/pdfGenerator';

interface PackageComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackageForCheckout: (pkg: any) => void;
}

export const PackageComparisonModal: React.FC<PackageComparisonModalProps> = ({
  isOpen,
  onClose,
  onSelectPackageForCheckout,
}) => {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      label: 'Recommended For',
      pkg5kw: '5-10 Marla Homes',
      pkg10kw: '1 Kanal Homes (Most Popular)',
      pkg20kw: 'Plazas, Factories & Commercial',
      isHighlight: false,
    },
    {
      label: 'System Capacity',
      pkg5kw: '5 kW On-Grid',
      pkg10kw: '10 kW Hybrid System',
      pkg20kw: '20 kW Three-Phase Pro',
      isHighlight: false,
    },
    {
      label: 'Turn-Key Installed Price',
      pkg5kw: 'Rs. 720,000 PKR',
      pkg10kw: 'Rs. 1,450,000 PKR',
      pkg20kw: 'Rs. 2,650,000 PKR',
      isHighlight: true,
    },
    {
      label: 'Est. Monthly Bill Savings',
      pkg5kw: '~Rs. 28,000 / mo',
      pkg10kw: '~Rs. 58,000 / mo',
      pkg20kw: '~Rs. 120,000 / mo',
      isHighlight: true,
    },
    {
      label: 'Solar Panel Technology',
      pkg5kw: 'Tier-1 N-Type TOPCon 585W',
      pkg10kw: 'Tier-1 N-Type Bifacial 585W',
      pkg20kw: 'Tier-1 High-Efficiency 600W',
      isHighlight: false,
    },
    {
      label: 'Panel Brand',
      pkg5kw: 'Longi / Jinko Solar',
      pkg10kw: 'Longi / Canadian Solar',
      pkg20kw: 'Trina / Canadian Solar',
      isHighlight: false,
    },
    {
      label: 'Inverter Brand & Spec',
      pkg5kw: '5kW On-Grid String (Dual MPPT)',
      pkg10kw: '10kW Hybrid Pure Sine Wave',
      pkg20kw: '20kW Three-Phase Heavy Duty',
      isHighlight: false,
    },
    {
      label: 'Battery Storage Tech',
      pkg5kw: 'Optional / Grid Export Only',
      pkg10kw: '10.2kWh LiFePO4 Lithium Battery',
      pkg20kw: 'Custom High-Capacity Rack',
      isHighlight: true,
    },
    {
      label: 'Panel Output Warranty',
      pkg5kw: '25 Years Linear',
      pkg10kw: '25 Years Linear',
      pkg20kw: '25 Years Linear',
      isHighlight: false,
    },
    {
      label: 'Inverter Warranty',
      pkg5kw: '10 Years Replacement',
      pkg10kw: '10 Years Replacement',
      pkg20kw: '10 Years Commercial Warranty',
      isHighlight: false,
    },
    {
      label: 'Lithium Battery Warranty',
      pkg5kw: 'N/A',
      pkg10kw: '10 Years Warranty',
      pkg20kw: '10 Years Warranty',
      isHighlight: false,
    },
    {
      label: 'Remote Mobile App Monitoring',
      pkg5kw: true,
      pkg10kw: true,
      pkg20kw: true,
      isHighlight: false,
    },
    {
      label: 'DISCO Green Meter License',
      pkg5kw: true,
      pkg10kw: true,
      pkg20kw: true,
      isHighlight: false,
    },
    {
      label: 'Zero Load-Shedding Backup',
      pkg5kw: false,
      pkg10kw: true,
      pkg20kw: true,
      isHighlight: true,
    },
    {
      label: 'Est. Payback Timeline',
      pkg5kw: '2.5 Years',
      pkg10kw: '2.4 Years',
      pkg20kw: '2.2 Years',
      isHighlight: true,
    },
  ];

  const packagesData = [
    {
      id: '5kw',
      title: '5kW Residential Starter',
      subtitle: '5-10 Marla Homes',
      capacityKw: 5,
      pricePkr: 720000,
      monthlySavingsPkr: 28000,
      panelBrand: 'Longi / Jinko 585W N-Type',
      popular: false,
    },
    {
      id: '10kw',
      title: '10kW Hybrid Family',
      subtitle: '1 Kanal Homes',
      capacityKw: 10,
      pricePkr: 1450000,
      monthlySavingsPkr: 58000,
      panelBrand: 'Longi / Canadian 585W',
      popular: true,
    },
    {
      id: '20kw',
      title: '20kW Commercial Pro',
      subtitle: 'Plazas & Factories',
      capacityKw: 20,
      pricePkr: 2650000,
      monthlySavingsPkr: 120000,
      panelBrand: 'Canadian / Trina 600W',
      popular: false,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        
        {/* Backdrop Click Close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-[95vw] sm:w-[90vw] md:w-full max-w-6xl max-h-[90vh] flex flex-col bg-slate-900 border-2 border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white z-10 my-auto"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>Live Solar Package Comparison Matrix</span>
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    Tier-1 Certified
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Compare technical specifications, panel tech, warranties, and prices side-by-side.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comparison Table Container */}
          <div className="p-4 sm:p-6 overflow-x-auto max-h-[70vh] custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="p-4 bg-slate-950/80 rounded-tl-2xl border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/4">
                    Features & Specifications
                  </th>

                  {packagesData.map((pkg) => (
                    <th
                      key={pkg.id}
                      className={`p-4 border-b border-slate-800 w-1/4 ${
                        pkg.popular
                          ? 'bg-gradient-to-b from-slate-950 to-slate-900 border-x border-emerald-500/40'
                          : 'bg-slate-950/80'
                      }`}
                    >
                      <div className="space-y-1">
                        {pkg.popular && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 inline-block">
                            MOST POPULAR IN PAKISTAN
                          </span>
                        )}
                        <h4 className="text-base font-black text-white">{pkg.title}</h4>
                        <p className="text-xs font-semibold text-amber-400">{pkg.subtitle}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80 text-xs">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.isHighlight ? 'bg-slate-950/60 font-semibold' : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="p-4 text-slate-300 font-bold border-r border-slate-800/80 flex items-center gap-2">
                      <span>{row.label}</span>
                    </td>

                    {/* 5kW Cell */}
                    <td className="p-4 text-slate-200">
                      {typeof row.pkg5kw === 'boolean' ? (
                        row.pkg5kw ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                            <Check className="w-4 h-4 text-emerald-400" /> Yes / Included
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                            <Minus className="w-4 h-4" /> Optional
                          </span>
                        )
                      ) : (
                        <span className={row.label.includes('Price') ? 'text-emerald-400 font-black text-sm' : ''}>
                          {row.pkg5kw}
                        </span>
                      )}
                    </td>

                    {/* 10kW Cell (Popular Column Highlight) */}
                    <td className="p-4 text-slate-100 bg-slate-900/60 border-x border-emerald-500/20">
                      {typeof row.pkg10kw === 'boolean' ? (
                        row.pkg10kw ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                            <Check className="w-4 h-4 text-emerald-400" /> Yes / Included
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                            <Minus className="w-4 h-4" /> Optional
                          </span>
                        )
                      ) : (
                        <span className={row.label.includes('Price') ? 'text-amber-300 font-black text-sm' : ''}>
                          {row.pkg10kw}
                        </span>
                      )}
                    </td>

                    {/* 20kW Cell */}
                    <td className="p-4 text-slate-200">
                      {typeof row.pkg20kw === 'boolean' ? (
                        row.pkg20kw ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                            <Check className="w-4 h-4 text-emerald-400" /> Yes / Included
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                            <Minus className="w-4 h-4" /> Optional
                          </span>
                        )
                      ) : (
                        <span className={row.label.includes('Price') ? 'text-emerald-400 font-black text-sm' : ''}>
                          {row.pkg20kw}
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Footer with Action Buttons */}
          <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {packagesData.map((pkg) => (
              <div key={pkg.id} className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onSelectPackageForCheckout(pkg);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer min-h-[44px] ${
                    pkg.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Book {pkg.capacityKw}kW Package</span>
                </button>

                <button
                  onClick={() =>
                    generateQuotationPDF({
                      systemSizeKw: pkg.capacityKw,
                      panelBrand: pkg.panelBrand,
                      totalCapexPkr: pkg.pricePkr,
                      monthlySavingsPkr: pkg.monthlySavingsPkr,
                      monthlyBillPkr: pkg.monthlySavingsPkr * 1.2,
                      paybackTimeline: '2.4 Years',
                    })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center justify-center gap-1.5 border border-slate-800 transition-colors cursor-pointer"
                >
                  <FileText className="w-3 h-3 text-amber-400" />
                  <span>Spec Sheet PDF</span>
                </button>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
