import { useState } from 'react';
import { HelpCircle, Minus, Plus } from 'lucide-react';

interface PhotoControlsProps {
  photoCount: number;
  onPhotoCountChange: (count: number) => void;
}

export function PhotoControls({ photoCount, onPhotoCountChange }: PhotoControlsProps) {
  return (
    <div className="flex-shrink-0 border-t border-gray-800/50 bg-gray-900/95 p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-200">Number of Photos</label>
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Choose how many photos to generate (1-5). Each photo costs 1 credit.
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 bg-gray-800/50 rounded-lg p-2">
          <button
            onClick={() => {
              const newCount = Math.max(1, photoCount - 1);
              onPhotoCountChange(newCount);
            }}
            className="p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={photoCount <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="text-lg font-medium text-white w-20 text-center">
            {photoCount} Photo{photoCount !== 1 ? 's' : ''}
          </span>
          
          <button
            onClick={() => {
              const newCount = Math.min(5, photoCount + 1);
              onPhotoCountChange(newCount);
            }}
            className="p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={photoCount >= 5}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}