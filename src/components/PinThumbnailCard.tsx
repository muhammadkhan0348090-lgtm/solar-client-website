import React, { useState } from 'react';
import { Play, Bookmark, Share2, Maximize2, Zap } from 'lucide-react';
import { PinItem } from '../types';

interface PinThumbnailCardProps {
  pin: PinItem;
  onSelectPin: (pin: PinItem) => void;
  onSavePin: (pinId: string) => void;
  isSaved: boolean;
  onQuickView: (pin: PinItem) => void;
}

export const PinThumbnailCard: React.FC<PinThumbnailCardProps> = ({
  pin,
  onSelectPin,
  onSavePin,
  isSaved,
  onQuickView,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      id={`pin-card-${pin.id}`}
      className="group relative rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
      onClick={() => onSelectPin(pin)}
    >
      {/* Pin Image */}
      <img
        src={pin.imageUrl}
        alt={pin.title}
        onLoad={() => setImgLoaded(true)}
        className={`w-full h-full object-cover aspect-4/3 sm:aspect-square md:aspect-auto max-h-72 min-h-48 group-hover:scale-105 transition-transform duration-300 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Video duration badge */}
      {pin.duration && (
        <div
          id={`duration-badge-${pin.id}`}
          className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-md border border-slate-700/60"
        >
          <span>{pin.duration}</span>
        </div>
      )}

      {/* Real Pakistan Price Badge on image */}
      {pin.solarPrice && (
        <div
          id={`price-badge-${pin.id}`}
          className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none group-hover:opacity-0 transition-opacity"
        >
          <span className="px-2.5 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[11px] font-bold tracking-tight border border-emerald-500/50 flex items-center gap-1.5 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Rs. {pin.solarPrice.pricePerWattPkr}/W</span>
          </span>
          <span className="px-2 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-slate-200 text-[10px] font-bold border border-slate-700 shadow-xl">
            Rs. {pin.solarPrice.pricePerPlatePkr.toLocaleString()}
          </span>
        </div>
      )}

      {/* "Last visited" overlay badge */}
      {pin.isLastVisited && (
        <div
          id="last-visited-overlay"
          className="absolute inset-0 bg-slate-950/50 flex items-center justify-center pointer-events-none"
        >
          <span className="text-white text-base sm:text-lg font-extrabold tracking-tight px-3 py-1 bg-slate-900/80 rounded-full backdrop-blur-md border border-slate-700 shadow-lg">
            Last visited
          </span>
        </div>
      )}

      {/* Hover Overlay with Quick Actions */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
        {/* Top-Right Save Button & Per Plate Price */}
        <div className="flex justify-between items-start">
          {pin.solarPrice ? (
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
              Rs. {pin.solarPrice.pricePerPlatePkr.toLocaleString()}
            </span>
          ) : <span />}
          <button
            id={`pin-save-btn-${pin.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSavePin(pin.id);
            }}
            className={`px-3.5 py-1.5 rounded-full font-bold text-xs shadow-xl transition-colors flex items-center gap-1 ${
              isSaved
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {pin.author.initial && (
              <div
                className={`w-6 h-6 rounded-full ${
                  pin.author.bgColor || 'bg-amber-600'
                } text-white font-bold text-[10px] flex items-center justify-center shadow-md`}
              >
                {pin.author.initial}
              </div>
            )}
            <span className="text-white text-xs font-bold drop-shadow-md line-clamp-1 max-w-[120px]">
              {pin.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id={`pin-quickview-btn-${pin.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(pin);
              }}
              title="Full screen view"
              className="w-8 h-8 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center shadow-md border border-slate-700 backdrop-blur-md transition-transform hover:scale-105"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
