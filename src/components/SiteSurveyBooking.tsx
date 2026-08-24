import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, User, Phone, X, ShieldCheck, Send } from 'lucide-react';
import { apiPost, showToast } from '../utils/api';

interface SiteSurveyBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SiteSurveyBooking: React.FC<SiteSurveyBookingProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedRef, setBookedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please enter your name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);
    const refCode = `SRV-${Math.floor(100000 + Math.random() * 900000)}`;

    const res = await apiPost('/api/contact', {
      name: name.trim(),
      phone: phone.trim(),
      city,
      systemSize: 'Free Rooftops Survey Booking',
      message: `Survey Date: ${preferredDate || 'Tomorrow'}, Slot: ${preferredSlot}, Address: ${address || city}`,
    });

    if (res.success) {
      setBookedRef(refCode);
      setStep(3);
      showToast(`Free Rooftop Drone Survey booked! Ref #${refCode}`, 'success');
    } else {
      showToast(res.message || 'Survey booking failed', 'error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-[95vw] sm:w-[90vw] md:w-full max-w-lg theme-card border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base leading-none">Free Rooftop Site Survey</h3>
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">Step {step} of 3 • Drone Assessment</span>
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

        {/* Step 1: Contact Details */}
        {step === 1 && (
          <div className="p-5 sm:p-6 space-y-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="text-slate-300">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Engr. Hamza Khan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300">WhatsApp / Mobile Phone</label>
              <input
                type="tel"
                required
                placeholder="0300-1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300">City / Location</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad / RWP</option>
                <option value="Karachi">Karachi</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
              </select>
            </div>

            <button
              onClick={() => {
                if (name && phone) setStep(2);
                else showToast('Please enter your Name and Phone Number', 'error');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
            >
              <span>Next: Select Date & Slot</span>
            </button>
          </div>
        )}

        {/* Step 2: Schedule & Address */}
        {step === 2 && (
          <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="text-slate-300">Full Installation Address / Society</label>
              <input
                type="text"
                placeholder="e.g. DHA Phase 6, Sector CCA, Lahore"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300">Preferred Survey Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300">Preferred Time Slot</label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold hover:bg-slate-800 min-h-[48px]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Confirming Survey...' : 'Confirm Free Site Survey'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-emerald-400">Rooftop Drone Survey Booked!</h3>
            <p className="text-xs opacity-85 max-w-sm mx-auto">
              Our Senior Technical Engineer will visit your rooftop for 3D shadow analysis & load sizing on your chosen slot.
            </p>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs font-mono text-amber-300 w-fit mx-auto">
              Reference #: {bookedRef}
            </div>

            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider min-h-[44px]"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
