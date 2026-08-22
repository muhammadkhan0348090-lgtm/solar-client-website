import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '923480906798',
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello,%20I%20want%20a%20quotation%20for%20a%20solar%20system`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-emerald-300"
        title="Chat on WhatsApp: +92-03480906798"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none"></span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-current stroke-[1.5]" />

        {/* Tooltip Label on Hover */}
        <div className="absolute left-16 bg-slate-950/90 backdrop-blur-xl text-white px-3.5 py-1.5 rounded-2xl shadow-2xl border border-slate-700/80 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>WhatsApp Us (+92-03480906798)</span>
        </div>
      </a>
    </div>
  );
};
