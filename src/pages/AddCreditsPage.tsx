import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Sparkles, Star, Zap, Infinity } from 'lucide-react';

export default function AddCreditsPage() {
  useEffect(() => {
    document.title = 'Add Credits | PhotoMatchAI';
  }, []);

  const [selectedOption, setSelectedOption] = useState<'unlimited' | 'credits' | null>(null);

  const handlePurchase = () => {
    // TODO: Implement payment processing
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      <div className="fixed top-0 left-0 right-0 bg-gray-900/50 border-b border-gray-800/50 backdrop-blur-xl z-40">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
          Add Credits
        </h1>

        <div className="space-y-4">
          {/* Unlimited Plan */}
          <div
            onClick={() => setSelectedOption('unlimited')}
            className={`relative rounded-xl p-6 transition-all duration-300 ${
              selectedOption === 'unlimited'
                ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 scale-[1.02]'
                : 'bg-gray-800/50 border-gray-700'
            } border overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Infinity className="w-6 h-6 text-pink-500" />
                <div className="px-2 py-1 bg-pink-500/20 rounded-full">
                  <span className="text-xs font-semibold text-pink-500">Best Value</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Unlimited Plan</h3>
              <p className="text-gray-300 mb-4">Generate unlimited photos every month</p>
              <div className="text-2xl font-bold mb-2">$49.99/mo</div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-center text-gray-300">
                  <Infinity className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                  Unlimited generations
                </li>
                <li className="flex items-center text-gray-300">
                  <Zap className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                  Priority processing
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                  All features included
                </li>
              </ul>
            </div>
          </div>

          {/* Credit Pack */}
          <div
            onClick={() => setSelectedOption('credits')}
            className={`relative rounded-xl p-6 transition-all duration-300 ${
              selectedOption === 'credits'
                ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 scale-[1.02]'
                : 'bg-gray-800/50 border-gray-700'
            } border`}
          >
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Credit Pack</h3>
            <p className="text-gray-300 mb-4">100 credits for one-time purchase</p>
            <div className="text-2xl font-bold mb-2">$18.99</div>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center text-gray-300">
                <Sparkles className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                100 photo generations
              </li>
              <li className="flex items-center text-gray-300">
                <Star className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                Never expires
              </li>
              <li className="flex items-center text-gray-300">
                <Zap className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0" />
                All features included
              </li>
            </ul>
          </div>
        </div>

        {/* Purchase Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F] to-transparent">
          <button
            onClick={handlePurchase}
            disabled={!selectedOption}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              selectedOption
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
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