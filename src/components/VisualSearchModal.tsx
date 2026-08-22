import React, { useState } from 'react';
import { X, Upload, Camera, Search, Sparkles } from 'lucide-react';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTagSearch: (tag: string) => void;
}

export const VisualSearchModal: React.FC<VisualSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTagSearch,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleVisualCategories = [
    { label: 'Rooftop Solar', tag: 'rooftop' },
    { label: 'Wind Turbines', tag: 'wind-turbines' },
    { label: 'Inverters & Batteries', tag: 'batteries' },
    { label: 'Utility Farms', tag: 'solar' },
    { label: 'Monocrystalline Cells', tag: 'photovoltaic' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setTimeout(() => {
        onSelectTagSearch('solar');
        onClose();
      }, 1200);
    }
  };

  return (
    <div
      id="visual-search-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-[95vw] sm:w-[90vw] md:w-full max-w-lg p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              Visual Solar Search
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-3">
            Drop an image or blueprint of solar panels, inverters, or wind turbines to find matching installations.
          </p>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                setTimeout(() => {
                  onSelectTagSearch('solar');
                  onClose();
                }, 1200);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragOver ? 'border-amber-500 bg-amber-50/50' : 'border-gray-200 hover:border-amber-400 hover:bg-gray-50/80'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {previewUrl ? (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={previewUrl}
                  alt="Visual Search Preview"
                  className="w-32 h-32 object-cover rounded-xl shadow-xs"
                />
                <span className="text-xs font-semibold text-amber-600 animate-pulse flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Analyzing solar structure...
                </span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-2">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  Drag and drop a solar photo or <span className="text-amber-600 underline">browse</span>
                </p>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</span>
              </>
            )}
          </label>
        </div>

        <div className="mt-5 pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            Or search popular categories:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleVisualCategories.map((cat) => (
              <button
                key={cat.tag}
                onClick={() => {
                  onSelectTagSearch(cat.tag);
                  onClose();
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-amber-100 hover:text-amber-900 text-gray-700 font-medium transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
