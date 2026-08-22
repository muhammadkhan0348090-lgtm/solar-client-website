import React, { useState } from 'react';
import {
  X,
  TrendingDown,
  Sun,
  Calculator,
  CheckCircle2,
  Shield,
  Zap,
  Sparkles,
  Building2,
  Home,
  Sliders,
  Table,
  Package
} from 'lucide-react';
import { pakistanMarketRates } from '../data';
import { PakistanRoiCalculator } from './PakistanRoiCalculator';

interface PakistanRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PakistanRatesModal: React.FC<PakistanRatesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'roi-calculator' | 'live-rates' | 'packages'>('roi-calculator');
  const [selectedKw, setSelectedKw] = useState<number>(10);
  const [panelBrandRate, setPanelBrandRate] = useState<number>(29.5); // PKR per watt

  if (!isOpen) return null;

  return (
    <div
      id="pakistan-rates-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 scrollbar-thin scrollbar-thumb-gray-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs text-lg font-black">
              🇵🇰
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  Pakistan Solar Market Hub & Real-Time ROI
                </h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {pakistanMarketRates.lastUpdated}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Live PKR pricing for Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad & Multan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-2xl my-3.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('roi-calculator')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'roi-calculator'
                ? 'bg-white text-emerald-900 shadow-xs border border-gray-200/60'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Real-Time ROI & Payback Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('live-rates')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'live-rates'
                ? 'bg-white text-emerald-900 shadow-xs border border-gray-200/60'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Table className="w-4 h-4 text-amber-500" />
            <span>Tier-1 Panel Rates Index</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('packages')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'packages'
                ? 'bg-white text-emerald-900 shadow-xs border border-gray-200/60'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4 text-blue-600" />
            <span>Turn-Key Packages</span>
          </button>
        </div>

        {/* Tab 1: Real-Time ROI Calculator (Primary Feature) */}
        {activeTab === 'roi-calculator' && (
          <div className="space-y-4">
            <PakistanRoiCalculator
              initialMonthlyKwh={750}
              initialBrandRate={panelBrandRate}
            />
          </div>
        )}

        {/* Tab 2: Tier-1 Live Rates Index */}
        {activeTab === 'live-rates' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                Tier-1 Solar Plate Wholesale Rates (580W - 600W N-Type Bifacial)
              </h4>
              <span className="text-xs text-gray-500">Prices per Watt & per Plate in PKR</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-3.5">Brand & Model</th>
                    <th className="py-3 px-3.5">Rate / Watt (PKR)</th>
                    <th className="py-3 px-3.5">Single Plate Price</th>
                    <th className="py-3 px-3.5">Pallet Rate (36 Plates)</th>
                    <th className="py-3 px-3.5">Trend</th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pakistanMarketRates.tier1Brands.map((brand) => (
                    <tr
                      key={brand.name}
                      className="hover:bg-emerald-50/50 transition-colors"
                    >
                      <td className="py-3 px-3.5 font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p>{brand.name}</p>
                          <p className="text-[10px] text-gray-500 font-normal">N-Type TOPCon Dual-Glass</p>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 font-black text-emerald-700 text-sm">
                        Rs. {brand.perWatt} / W
                      </td>
                      <td className="py-3 px-3.5 font-bold text-gray-800">
                        Rs. {brand.perPlate.toLocaleString()}
                      </td>
                      <td className="py-3 px-3.5 font-semibold text-gray-600">
                        Rs. {(brand.perPlate * 36 - 15000).toLocaleString()}
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            brand.change.startsWith('-')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {brand.change}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setPanelBrandRate(brand.perWatt);
                            setActiveTab('roi-calculator');
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-transform active:scale-95"
                        >
                          Calculate ROI
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 flex items-center justify-between">
              <span>Verified with Lahore Hall Road, Karachi Saddar & Rawalpindi College Road wholesale associations.</span>
              <span className="font-bold text-emerald-800">Updated Daily</span>
            </div>
          </div>
        )}

        {/* Tab 3: Turn-Key Packages */}
        {activeTab === 'packages' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Pakistan Complete Turn-Key System Price Packages (EPC Installed)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pakistanMarketRates.systemPackages.map((pkg) => (
                <div
                  key={pkg.size}
                  className="p-4 rounded-3xl bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                      {pkg.size} Complete
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      Rs. {pkg.costPkr} PKR
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mb-3">
                    {pkg.plates} • Yields ~{pkg.unitsPerMonth} Units/month • Net Metering Ready
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs">
                    <span className="text-emerald-700 font-bold">
                      Saves {pkg.monthlySavings}/mo
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('roi-calculator');
                      }}
                      className="text-xs text-emerald-800 font-bold hover:underline"
                    >
                      Estimate Payback →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-gray-500">
            Official 2026 Pakistan Renewable Energy Index & NEPRA Tariff Calculation
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-transform active:scale-95"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

