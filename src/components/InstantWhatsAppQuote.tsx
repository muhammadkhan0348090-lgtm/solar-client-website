import React, { useState } from 'react';
import { MessageSquare, Send, X, ShieldCheck, Sun, CheckCircle2, PhoneCall } from 'lucide-react';

interface InstantWhatsAppQuoteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstantWhatsAppQuote: React.FC<InstantWhatsAppQuoteProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [systemSize, setSystemSize] = useState('10kW Hybrid');
  const [billRange, setBillRange] = useState('PKR 40,000 - 60,000');

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = encodeURIComponent(
      `☀️ *INSTANT SOLAR QUOTATION REQUEST*\n\n` +
      `👤 *Customer Name:* ${name.trim() || 'Valued Client'}\n` +
      `📍 *City / Region:* ${city}\n` +
      `⚡ *System Capacity Required:* ${systemSize}\n` +
      `💰 *Monthly WAPDA Bill:* ${billRange}\n\n` +
      `Please reply with today's discounted PKR price sheet, inverter specs, and free rooftop survey slot.`
    );
    window.open(`https://wa.me/923480906798?text=${formattedMessage}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-[95vw] sm:w-[90vw] md:w-full max-w-md theme-card border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-5 border-b border-slate-800 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-black text-base leading-none">Instant WhatsApp Quote</h3>
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">Direct Engineer Connect</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="p-5 sm:p-6 space-y-4 text-xs font-semibold">
          <div className="space-y-1.5">
            <label className="text-slate-300">Your Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Usman"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-300">City / Location</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad / RWP</option>
                <option value="Karachi">Karachi</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Quetta">Quetta</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300">Required System</label>
              <select
                value={systemSize}
                onChange={(e) => setSystemSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="5kW On-Grid">5 kW On-Grid</option>
                <option value="10kW Hybrid">10 kW Hybrid</option>
                <option value="15kW Commercial">15 kW Commercial</option>
                <option value="20kW Pro">20 kW Pro</option>
                <option value="30kW+ Industrial">30kW+ Industrial</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300">Current Monthly Bill Range</label>
            <select
              value={billRange}
              onChange={(e) => setBillRange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="PKR 25,000 - 40,000">PKR 25,000 - 40,000</option>
              <option value="PKR 40,000 - 60,000">PKR 40,000 - 60,000</option>
              <option value="PKR 60,000 - 100,000">PKR 60,000 - 100,000</option>
              <option value="PKR 100,000+">PKR 100,000+</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>Get Instant Quote on WhatsApp</span>
            </button>
          </div>

          <p className="text-[10px] text-center opacity-70">
            🔒 Official WhatsApp line: +92-03480906798 • Direct Engineer Response
          </p>
        </form>
      </div>
    </div>
  );
};
