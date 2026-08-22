import React, { useState } from 'react';
import { X, Upload, Plus, Sun, Tag, Image as ImageIcon } from 'lucide-react';
import { PinItem } from '../types';

interface CreatePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPinCreated: (pin: PinItem) => void;
}

const sampleSolarImages = [
  { label: 'Longi / Mono Panel', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=900&q=85' },
  { label: 'Bifacial Cell Grid', url: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=85' },
  { label: 'Canadian / Rooftop', url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=85' },
  { label: 'JA Solar Plate', url: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=85' },
];

export const CreatePinModal: React.FC<CreatePinModalProps> = ({
  isOpen,
  onClose,
  onPinCreated,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(sampleSolarImages[0].url);
  const [tagInput, setTagInput] = useState('solar-panel, 585w, price-pkr');
  const [brand, setBrand] = useState('Longi Solar');
  const [wattage, setWattage] = useState('585');
  const [pricePerWatt, setPricePerWatt] = useState('29.5');
  const [pricePerPlate, setPricePerPlate] = useState('17250');

  if (!isOpen) return null;

  const handleWattChange = (w: string) => {
    setWattage(w);
    const numW = parseFloat(w) || 0;
    const numRate = parseFloat(pricePerWatt) || 0;
    if (numW > 0 && numRate > 0) {
      setPricePerPlate(Math.round(numW * numRate).toString());
    }
  };

  const handleRateChange = (r: string) => {
    setPricePerWatt(r);
    const numW = parseFloat(wattage) || 0;
    const numRate = parseFloat(r) || 0;
    if (numW > 0 && numRate > 0) {
      setPricePerPlate(Math.round(numW * numRate).toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const numWattage = parseFloat(wattage) || 585;
    const numRate = parseFloat(pricePerWatt) || 29.5;
    const numPlatePrice = parseFloat(pricePerPlate) || Math.round(numWattage * numRate);

    const newPin: PinItem = {
      id: `pin-custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || `${brand} ${numWattage}W Tier-1 Solar Panel in Pakistan. Live Market Price: Rs. ${numRate}/Watt (Rs. ${numPlatePrice.toLocaleString()}/Plate).`,
      imageUrl: imageUrl.trim() || sampleSolarImages[0].url,
      author: {
        name: 'Maria Segovia',
        initial: 'M',
        bgColor: 'bg-fuchsia-600',
        followers: '14.2k',
      },
      tags: tagInput
        ? tagInput.split(',').map((t) => t.trim().toLowerCase())
        : ['solar-panel', 'price-pkr'],
      comments: [],
      saves: 1,
      solarPrice: {
        brand: brand,
        model: `${brand} ${numWattage}W TOPCon`,
        wattage: numWattage,
        pricePerWattPkr: numRate,
        pricePerPlatePkr: numPlatePrice,
        technology: 'N-Type TOPCon',
        systemSizeKw: 10,
        estimatedSystemCostPkr: numPlatePrice * 18 + 500000,
        inverterRecommendation: 'Nitrox / Knox 10kW Hybrid',
        monthlySavingsPkr: 72000,
        warrantyYears: '12 Yrs Product / 25 Yrs Performance',
        tier: 'Tier 1',
        stockStatus: 'In Stock (Karachi/Lahore/ISB)'
      }
    };

    onPinCreated(newPin);
    onClose();
  };

  return (
    <div
      id="create-pin-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-[95vw] sm:w-[90vw] md:w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 scrollbar-thin scrollbar-thumb-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Add Solar Panel Picture with Price
              </h3>
              <p className="text-[11px] text-gray-500">Post solar panels with PKR market rates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Solar Panel Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Longi Hi-MO 7 585W N-Type Bifacial Panel"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Pricing Row */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Solar Panel Price Details (PKR)</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Longi, Jinko, Canadian..."
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-emerald-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">Panel Wattage (W)</label>
                <input
                  type="number"
                  value={wattage}
                  onChange={(e) => handleWattChange(e.target.value)}
                  placeholder="585"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-emerald-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">Price Per Watt (Rs.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pricePerWatt}
                  onChange={(e) => handleRateChange(e.target.value)}
                  placeholder="29.5"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-emerald-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">Price Per Plate (PKR)</label>
                <input
                  type="number"
                  value={pricePerPlate}
                  onChange={(e) => setPricePerPlate(e.target.value)}
                  placeholder="17250"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-emerald-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Quick Select Solar Panel Photo */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Choose Solar Panel Picture:
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {sampleSolarImages.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    imageUrl === img.url ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste custom image URL..."
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Description & Specifications
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add specs, efficiency %, warranty, and stock locations..."
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Panel with Price</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
