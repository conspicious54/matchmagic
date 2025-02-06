import { HelpCircle } from 'lucide-react';

interface AccuracySliderProps {
  value: number;
  onChange: (value: number) => void;
  tooltip: string;
}

export function AccuracySlider({ value, onChange, tooltip }: AccuracySliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-200">Accuracy</label>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">{value}%</span>
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {tooltip}
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur"></div>
        <div className="relative bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Creative</span>
            <span className="text-sm text-gray-400">Accurate</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pink-500 [&::-webkit-slider-thumb]:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}