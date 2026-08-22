import React from 'react';
import { X, Download, ZoomIn, ZoomOut, Share2 } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title = 'Solar Project High Resolution View',
}) => {
  const [scale, setScale] = React.useState(1);

  if (!isOpen) return null;

  return (
    <div
      id="lightbox-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="lightbox-content-box"
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between text-white mb-3 px-2">
          <span className="text-sm font-medium text-gray-200 truncate max-w-md">
            {title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.min(s + 0.25, 2.5))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(s - 0.25, 0.75))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors ml-2"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scaled Image */}
        <div className="overflow-auto max-h-[80vh] flex items-center justify-center rounded-2xl">
          <img
            src={imageUrl}
            alt={title}
            style={{ transform: `scale(${scale})` }}
            className="max-h-[78vh] w-auto object-contain rounded-xl transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
};
