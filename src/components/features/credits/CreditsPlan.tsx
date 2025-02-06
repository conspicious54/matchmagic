import { Infinity, Star, Zap } from 'lucide-react';

interface CreditsPlanProps {
  type: 'unlimited' | 'credits';
  isSelected: boolean;
  onSelect: () => void;
}

export function CreditsPlan({ type, isSelected, onSelect }: CreditsPlanProps) {
  const isUnlimited = type === 'unlimited';

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 scale-[1.02]'
          : 'bg-gray-800/50 border-gray-700 hover:scale-[1.02]'
      } border overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {isUnlimited ? (
            <>
              <Infinity className="w-6 h-6 text-pink-500" />
              <div className="px-2 py-1 bg-pink-500/20 rounded-full">
                <span className="text-xs font-semibold text-pink-500">Best Value</span>
              </div>
            </>
          ) : (
            <div className="w-6 h-6" />
          )}
        </div>
        <h3 className="text-lg font-bold mb-2">{isUnlimited ? 'Unlimited Plan' : 'Credit Pack'}</h3>
        <p className="text-gray-300 mb-4">
          {isUnlimited ? 'Generate unlimited photos every month' : '100 credits for one-time purchase'}
        </p>
        <div className="text-xl font-bold mb-2">{isUnlimited ? '$49.99/mo' : '$18.99'}</div>
        <ul className="space-y-2 mb-4">
          {isUnlimited ? (
            <>
              <li className="flex items-center text-gray-300">
                <Infinity className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                Unlimited generations
              </li>
              <li className="flex items-center text-gray-300">
                <Zap className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                Priority processing
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center text-gray-300">
                <Star className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                100 photo generations
              </li>
              <li className="flex items-center text-gray-300">
                <Star className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                Never expires
              </li>
            </>
          )}
          <li className="flex items-center text-gray-300">
            <Star className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
            All features included
          </li>
        </ul>
      </div>
    </div>
  );
}