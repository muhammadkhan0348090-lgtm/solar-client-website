import React, { useState } from 'react';
import { X, Sun, Moon, Bell, Shield, Sliders } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifyComments, setNotifyComments] = useState(true);
  const [highResPreviews, setHighResPreviews] = useState(true);
  const [autoPlayVideos, setAutoPlayVideos] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="theme-card border rounded-3xl w-[95vw] sm:w-[90vw] md:w-full max-w-md p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">
              Solar Company Preferences
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


        <div className="mt-4 space-y-4 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <p className="font-semibold text-gray-800">Comment & Like Alerts</p>
              <p className="text-xs text-gray-500">Get notified when engineers interact</p>
            </div>
            <input
              type="checkbox"
              checked={notifyComments}
              onChange={(e) => setNotifyComments(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded-sm focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <p className="font-semibold text-gray-800">HD Solar Previews</p>
              <p className="text-xs text-gray-500">Load maximum resolution drone shots</p>
            </div>
            <input
              type="checkbox"
              checked={highResPreviews}
              onChange={(e) => setHighResPreviews(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded-sm focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <p className="font-semibold text-gray-800">Auto-play Installation Clips</p>
              <p className="text-xs text-gray-500">Loop renewable project video pins</p>
            </div>
            <input
              type="checkbox"
              checked={autoPlayVideos}
              onChange={(e) => setAutoPlayVideos(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded-sm focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
