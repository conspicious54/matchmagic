import { Info } from 'lucide-react';

interface ModelStatusProps {
  isLoading: boolean;
  name: string | null;
  progress: number | null;
  message: string | null;
}

export function ModelStatus({ isLoading, name, progress, message }: ModelStatusProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50">
      {isLoading ? (
        <div className="space-y-3">
          {progress !== null && (
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
              <div 
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-pink-500 border-t-transparent"></div>
            <span className="text-gray-300">
              {message || 'Loading your model...'} 
              {progress !== null && ` (${Math.round(progress)}%)`}
            </span>
          </div>
          <div className="flex items-start space-x-2 text-xs text-gray-400 bg-gray-800/50 p-2 rounded">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>Model training can take 4-5 hours. We'll notify you when it's ready!</p>
          </div>
        </div>
      ) : name ? (
        <div>
          <h3 className="font-semibold text-lg text-white">{name}</h3>
          <p className="text-sm text-gray-300">Your model is ready</p>
        </div>
      ) : (
        <div className="text-gray-300 text-sm">
          Your model is still in the works. This usually takes ~45 minutes, but can take up to 4-5 hours for best results.
        </div>
      )}
    </div>
  );
}