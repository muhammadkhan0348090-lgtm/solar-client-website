import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote, Award } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Chaudhry Tariq Mehmood',
      location: 'DHA Phase 5, Lahore',
      rating: 5,
      systemSize: '15kW On-Grid System',
      comment: 'Solar Company converted my Rs. 85,000 monthly WAPDA bill down to Rs. 2,400! Net metering green meter DISCO approval was completed in just 22 days.',
    },
    {
      id: 2,
      name: 'Dr. Shahbaz Ahmed',
      location: 'F-8/3, Islamabad',
      rating: 5,
      systemSize: '10kW Hybrid System',
      comment: 'Zero load-shedding during peak summer! The 10.2kWh LiFePO4 battery setup seamlessly handles our 2 inverter ACs. Highly recommended EPC engineers.',
    },
    {
      id: 3,
      name: 'Farhan Zaidi',
      location: 'Gulshan-e-Iqbal, Karachi',
      rating: 5,
      systemSize: '20kW Commercial Setup',
      comment: 'Longi 585W Tier-1 plates delivered fantastic power output even on cloudy days. Very transparent per-watt PKR rate calculation.',
    },
  ];

  return (
    <section
      id="client-testimonials-section"
      className="space-y-6 text-white opacity-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Verified Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Client Testimonials & Google Review Ratings
          </h2>
        </div>

        {/* Google 5-Star Rating Badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full shadow-lg">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-black text-white">4.9 / 5.0 Rating (240+ Reviews)</span>
        </div>
      </div>

      <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x scrollbar-none pb-3 md:pb-0">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl relative overflow-hidden w-[84vw] md:w-auto shrink-0 snap-center"
          >
            <Quote className="w-8 h-8 text-emerald-500/20 absolute top-4 right-4" />

            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">"{rev.comment}"</p>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{rev.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-[11px] text-slate-400">{rev.location}</p>
              </div>

              <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                {rev.systemSize}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );

};

