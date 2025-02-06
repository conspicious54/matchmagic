import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Crown, Calendar, CreditCard, AlertCircle } from 'lucide-react';

export default function ManagePlanPage() {
  useEffect(() => {
    document.title = 'Manage Plan | PhotoMatchAI';
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  
  // Hardcoded for demo - in production would come from user's profile
  const currentPlan = {
    type: 'monthly',
    name: 'All Access',
    price: 29.99
  };

  const features = [
    "100 AI-generated photos per month",
    "All styles & poses available",
    "Priority generation queue",
    "Advanced editing options",
    "Commercial usage rights",
    "24/7 priority support"
  ];

  const handleUpgrade = async () => {
    setIsLoading(true);
    // Implement upgrade logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel your plan? This will take effect at the end of your current billing period.')) {
      setIsLoading(true);
      // Implement cancellation logic
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      {/* Header */}
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

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-24">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
          Your Plan
        </h1>

        {/* Current Plan Card */}
        <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl p-6 border border-pink-500/30 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{currentPlan.name}</h3>
              <p className="text-gray-400">{currentPlan.type === 'monthly' ? 'Monthly Plan' : 'Annual Plan'}</p>
            </div>
            <Crown className="w-8 h-8 text-pink-500" />
          </div>
          <div className="text-2xl font-bold mb-4">${currentPlan.price}/month</div>
          
          {/* Features List */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-300">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Billing Info */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-8">
          <div className="flex items-center space-x-2 text-gray-400">
            <CreditCard className="w-4 h-4" />
            <span>Next billing date: March 2, 2025</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {currentPlan.type === 'monthly' && (
            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-semibold transition-all duration-300 hover:from-pink-600 hover:to-rose-600 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Switch to Annual Plan (Save 33%)</span>
            </button>
          )}
          
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gray-800 text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-700 flex items-center justify-center space-x-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>Cancel Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}