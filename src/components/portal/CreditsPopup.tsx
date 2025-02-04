import { useState } from 'react';
import { X, CreditCard, Sparkles, Star, Zap, Infinity } from 'lucide-react';

interface CreditsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditsPopup({ isOpen, onClose }: CreditsPopupProps) {
  const [selectedOption, setSelectedOption] = useState<'unlimited' | 'credits' | null>(null);

  if (!isOpen) return null;

  const handlePurchase = () => {
    // TODO: Implement payment processing
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
            Add Credits
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Unlimited Plan */}
            <div
              onClick={() => setSelectedOption('unlimited')}
              className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                selectedOption === 'unlimited'
                  ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 scale-[1.02]'
                  : 'bg-gray-800/50 border-gray-700 hover:scale-[1.02]'
              } border overflow-hidden group`}
            >
              {/* Animated Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Infinity className="w-6 h-6 text-pink-500" />
                  <div className="px-3 py-1 bg-pink-500/20 rounded-full">
                    <span className="text-sm font-semibold text-pink-500">Best Value</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Unlimited Plan</h3>
                <p className="text-gray-300 mb-4">Generate unlimited photos every month</p>
                <div className="text-2xl font-bold mb-2 text-white">$49.99/mo</div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center text-sm text-gray-300">
                    <Infinity className="w-4 h-4 text-pink-500 mr-2" />
                    Unlimited generations
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <Zap className="w-4 h-4 text-pink-500 mr-2" />
                    Priority processing
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <Star className="w-4 h-4 text-pink-500 mr-2" />
                    All features included
                  </li>
                </ul>
              </div>
            </div>

            {/* Credit Pack */}
            <div
              onClick={() => setSelectedOption('credits')}
              className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                selectedOption === 'credits'
                  ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 scale-[1.02]'
                  : 'bg-gray-800/50 border-gray-700 hover:scale-[1.02]'
              } border`}
            >
              <div className="flex items-center justify-between mb-4">
                <CreditCard className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Credit Pack</h3>
              <p className="text-gray-300 mb-4">100 credits for one-time purchase</p>
              <div className="text-2xl font-bold mb-2 text-white">$18.99</div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-center text-sm text-gray-300">
                  <Sparkles className="w-4 h-4 text-pink-500 mr-2" />
                  100 photo generations
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Star className="w-4 h-4 text-pink-500 mr-2" />
                  Never expires
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <Zap className="w-4 h-4 text-pink-500 mr-2" />
                  All features included
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={!selectedOption}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              selectedOption
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/25'
                : 'bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedOption ? 'Purchase Now' : 'Select a Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}