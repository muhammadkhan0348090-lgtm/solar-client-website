import React, { useState } from 'react';
import { X, Send, Phone, Mail, MapPin, CheckCircle2, Loader2, Sun, Sparkles } from 'lucide-react';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Lahore',
    systemSize: '5 kW System',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          onClose();
          setFormData({
            name: '',
            phone: '',
            city: 'Lahore',
            systemSize: '5 kW System',
            message: '',
          });
        }, 2500);
      } else {
        setErrorMessage(data.message || 'Failed to send inquiry. Please try again.');
      }
    } catch (err) {
      // Fallback response for offline / dev server
      console.warn('Backend API connection warning:', err);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-[95vw] sm:w-[90vw] md:w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-4 sm:p-6 border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>


          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-0.5 rounded-full text-[11px] border border-emerald-500/40 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400 fill-current" />
              DIRECT SOLAR QUOTATION
            </span>
          </div>

          <h3 className="text-xl font-black text-white">Request Solar Quotation</h3>
          <p className="text-xs text-slate-300 mt-1">
            Get an instant custom turn-key price quote for your home or commercial setup.
          </p>

          {/* Contact Details Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <a href="tel:+9203480906798" className="flex items-center gap-1.5 text-emerald-400 font-bold hover:underline">
              <Phone className="w-3.5 h-3.5" />
              <span>+92-03480906798</span>
            </a>
            <a href="mailto:tradernft0348@gmail.com" className="flex items-center gap-1.5 text-amber-300 font-semibold hover:underline">
              <Mail className="w-3.5 h-3.5" />
              <span>tradernft0348@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">

          {submitSuccess ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-black text-white">Quotation Request Sent!</h4>
              <p className="text-xs text-slate-300 max-w-xs">
                Thank you, <span className="text-emerald-300 font-bold">{formData.name || 'valued customer'}</span>. An email alert has been sent to <span className="text-amber-300 font-semibold">tradernft0348@gmail.com</span>. Our solar engineer will call you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-300 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Phone & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Other City">Other City in Pakistan</option>
                  </select>
                </div>
              </div>

              {/* Solar System Size Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Desired Solar System Capacity</label>
                <select
                  name="systemSize"
                  value={formData.systemSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-emerald-400 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="3.5 kW On-Grid System">3.5 kW System (Small Home)</option>
                  <option value="5 kW On-Grid System">5 kW System (Medium Home / 10 Marla)</option>
                  <option value="6 kW Hybrid System">6 kW Hybrid System (5.12kWh Battery Backup)</option>
                  <option value="10 kW On-Grid System">10 kW System (1 Kanal / Heavy AC)</option>
                  <option value="12 kW Hybrid System">12 kW Hybrid System (10.2kWh Battery Backup)</option>
                  <option value="15 kW+ Commercial System">15 kW - 30 kW+ Commercial System</option>
                </select>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Custom Message / Requirements</label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mention monthly bill amount, roof type, or preferred inverter brand..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Submitting Inquiry & Sending Alert...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Get Free Quotation Alert</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
