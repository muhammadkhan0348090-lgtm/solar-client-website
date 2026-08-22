import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does DISCO Net Metering work in Pakistan (LESCO, IESCO, K-Electric)?',
      a: 'Net metering allows you to export excess solar electricity generated during daytime back into WAPDA / DISCO grid. Your DISCO green meter measures units consumed vs units exported. Off-peak export units are credited against your monthly bill at NEPRA approved rates.',
    },
    {
      q: 'What is the current 2026 per-watt price for Tier-1 solar panels in PKR?',
      a: 'Today per-watt market rates for Tier-1 N-Type 585W-600W panels (Longi, Jinko, Canadian, JA Solar, Trina) range between Rs. 29.0/W to Rs. 31.5/W depending on container volume and brand specs.',
    },
    {
      q: 'What is the difference between On-Grid and Hybrid Solar Systems?',
      a: 'On-Grid systems connect directly to grid with net metering (no batteries). Hybrid systems include lithium LiFePO4 battery storage, providing 24/7 backup power during load-shedding plus net metering exports.',
    },
    {
      q: 'How long is the payback timeline for a 10kW residential solar system?',
      a: 'With current electricity tariffs (~Rs. 58/unit average), a 10kW system typically achieves full payback in 2.2 to 2.8 years, providing 22+ years of 100% free electricity thereafter.',
    },
    {
      q: 'What warranty is provided on solar panels and inverters?',
      a: 'Tier-1 panels come with a 25-Year Linear Power Output Warranty (minimum 85% generation at year 25). String inverters come with 5-10 Year Replacement Warranties.',
    },
  ];

  return (
    <section id="faq-net-metering-section" className="space-y-6 text-white max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Everything You Need to Know</span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Frequently Asked Questions & Net Metering Guide
        </h2>
        <p className="text-xs text-slate-400">
          Step-by-step process explanation for DISCO approvals (LESCO, IESCO, K-Electric, FESCO, MEPCO).
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-emerald-300 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{faq.q}</span>
                </span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
