import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, Zap, Sun, Award, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '923480906798',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickInquiries = [
    {
      label: '⚡ 10kW Hybrid Family Package',
      text: 'Hello! I am interested in the 10kW Hybrid Solar Package with Lithium Battery. Please share the turn-key quote.',
    },
    {
      label: '🌿 DISCO Net Metering Inquiry',
      text: 'Hello! I want to get a Green Metering License installed for my existing / new solar system.',
    },
    {
      label: '📐 Roof Load & Capacity Sizing',
      text: 'Hello! I need an expert solar engineer to evaluate my home roof area and calculate my daily unit requirement.',
    },
    {
      label: '💬 Speak with Live Solar Consultant',
      text: 'Hello! I would like to consult with a solar engineer about rates and financing options in Pakistan.',
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      
      {/* Floating Interactive Popup Drawer */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 sm:w-96 bg-slate-900/95 border-2 border-emerald-500/40 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl text-white space-y-4 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>WhatsApp Direct Quote</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">Online • Response under 5 mins</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Inquiry Options */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Select Quick Inquiry Topic:
            </span>

            {quickInquiries.map((inq, idx) => (
              <a
                key={idx}
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(inq.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full p-3 rounded-2xl bg-slate-950/80 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/50 text-xs font-semibold text-slate-200 hover:text-emerald-300 flex items-center justify-between group transition-all cursor-pointer"
              >
                <span>{inq.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>

          {/* Direct Custom Message Link */}
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello, I would like to get a customized solar quotation for my home/business.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer min-h-[44px]"
          >
            <Send className="w-4 h-4" />
            <span>Open Blank WhatsApp Chat</span>
          </a>

          {/* Glowing Badges footer */}
          <div className="flex items-center justify-around text-[10px] font-bold text-slate-400 border-t border-slate-800/80 pt-2.5">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Tier-1 Rated
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <Award className="w-3.5 h-3.5" /> NEPRA Certified
            </span>
          </div>

        </div>
      )}

      {/* Floating Button Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="floating-whatsapp-btn"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-emerald-300 cursor-pointer"
        title="Chat on WhatsApp (+92-03480906798)"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none"></span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-current stroke-[1.5]" />

        {/* Floating Tooltip Label when closed */}
        {!isOpen && (
          <div className="absolute left-16 bg-slate-950/95 backdrop-blur-xl text-white px-3.5 py-1.5 rounded-2xl shadow-2xl border border-slate-700/80 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>WhatsApp Quote (+92-03480906798)</span>
          </div>
        )}
      </button>

    </div>
  );
};
