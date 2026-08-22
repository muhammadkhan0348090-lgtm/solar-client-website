import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Zap, ShieldCheck, CheckCircle2, ArrowRight, Award, FileText, CreditCard } from 'lucide-react';
import { generateQuotationPDF } from '../utils/pdfGenerator';

interface PackageItem {
  id: string;
  title: string;
  subtitle: string;
  capacityKw: number;
  pricePkr: number;
  monthlySavingsPkr: number;
  panelBrand: string;
  inverter: string;
  netMetering: string;
  features: string[];
  popular: boolean;
}

interface SolarPackagesSectionProps {
  onOpenQuotationModal: () => void;
  onOpenCheckoutModal: (pkg: PackageItem) => void;
}

export const SolarPackagesSection: React.FC<SolarPackagesSectionProps> = ({
  onOpenQuotationModal,
  onOpenCheckoutModal,
}) => {
  const packages: PackageItem[] = [
    {
      id: '5kw',
      title: '5kW Residential Starter',
      subtitle: 'Ideal for 5-10 Marla Homes',
      capacityKw: 5,
      pricePkr: 720000,
      monthlySavingsPkr: 28000,
      panelBrand: 'Longi / Jinko 585W N-Type',
      inverter: '5kW On-Grid String Inverter (10-Yr Warranty)',
      netMetering: 'Included (LESCO/IESCO/K-Electric)',
      features: [
        '9x 585W N-Type Bifacial Solar Plates',
        '14-Gauge GI Elevated Mounting Structure',
        'Pure Copper DC & AC Cabling with SPD',
        'NEPRA DISCO Green Metering License',
        '25-Year Linear Output Panel Guarantee',
      ],
      popular: false,
    },
    {
      id: '10kw',
      title: '10kW Hybrid Family',
      subtitle: 'Most Popular for 1 Kanal Homes',
      capacityKw: 10,
      pricePkr: 1450000,
      monthlySavingsPkr: 58000,
      panelBrand: 'Longi 585W / Canadian 600W',
      inverter: '10kW Hybrid Inverter + 5.12kWh LiFePO4 Battery',
      netMetering: 'Included (Turn-Key DISCO License)',
      features: [
        '17x 585W N-Type Solar Plates',
        '10.2kWh LiFePO4 Lithium Battery Storage',
        'Zero Load-Shedding Seamless Switchover',
        'Dual MPPT High-Efficiency Hybrid Inverter',
        '25-Year Panel Output Warranty',
      ],
      popular: true,
    },
    {
      id: '20kw',
      title: '20kW+ Commercial Pro',
      subtitle: 'Plazas, Factories & Commercial Units',
      capacityKw: 20,
      pricePkr: 2650000,
      monthlySavingsPkr: 120000,
      panelBrand: 'Canadian 600W / Trina 600W',
      inverter: '20kW Three-Phase Commercial String Inverter',
      netMetering: 'Three-Phase Green Meter Approval',
      features: [
        '34x 600W High-Efficiency Solar Plates',
        'Heavy-Duty Galvanized Commercial Racking',
        'Web & Mobile App Generation Monitoring',
        '2-Year Free O&M Maintenance Contract',
        '25-Year Linear Output Guarantee',
      ],
      popular: false,
    },
  ];

  return (
    <motion.section
      id="solar-packages-section"
      className="space-y-6 text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Turn-Key Bundles</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Turn-Key Solar Packages & Tier-1 Panel Systems
          </h2>
        </div>

        <span className="text-xs text-slate-300 font-medium">
          All packages include turn-key installation, DISCO green meter, and 25-year panel warranties.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
            whileHover={{ scale: pkg.popular ? 1.03 : 1.02, transition: { duration: 0.2 } }}
            className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
              pkg.popular
                ? 'bg-slate-900 border-2 border-emerald-400 shadow-2xl shadow-emerald-500/10'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black tracking-wider uppercase shadow-md">
                MOST POPULAR IN PAKISTAN
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400">{pkg.subtitle}</span>
                <h3 className="text-xl font-black text-white">{pkg.title}</h3>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Turn-Key Installed CAPEX</p>
                <p className="text-2xl font-black text-emerald-400">
                  Rs. {pkg.pricePkr.toLocaleString()} <span className="text-xs text-slate-400 font-bold">PKR</span>
                </p>
                <p className="text-xs font-bold text-amber-300">
                  Est. Savings: ~Rs. {pkg.monthlySavingsPkr.toLocaleString()} / mo
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-200">Package Highlights:</p>
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 space-y-2.5">
              <button
                onClick={() => onOpenCheckoutModal(pkg)}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer min-h-[44px]"
              >
                <CreditCard className="w-4 h-4" />
                <span>Book System (Easypaisa/Bank)</span>
              </button>

              <button
                onClick={() =>
                  generateQuotationPDF({
                    systemSizeKw: pkg.capacityKw,
                    panelBrand: pkg.panelBrand,
                    totalCapexPkr: pkg.pricePkr,
                    monthlySavingsPkr: pkg.monthlySavingsPkr,
                    monthlyBillPkr: pkg.monthlySavingsPkr * 1.2,
                    paybackTimeline: '2.5 Years',
                  })
                }
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition-colors cursor-pointer min-h-[44px]"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Spec PDF</span>
              </button>
            </div>

          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

