import { HelpCircle } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  tooltip: string;
}

export function PromptInput({ value, onChange, tooltip }: PromptInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-200">Prompt</label>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {tooltip}
          </div>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-24 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white placeholder-gray-500"
        placeholder="Describe your photo..."
      />
    </div>
  );
}