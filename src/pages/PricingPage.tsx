import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check, Crown, Clock, CreditCard, Calendar } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';

function PricingPage() {
  useEffect(() => {
    document.title = 'Pricing | PhotoMatchAI';
  }, []);

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const { user } = useAuth();

  const plans = {
    monthly: {
      price: 29.99,
      period: 'month',
      savings: null,
    },
    annual: {
      price: 19.99,
      period: 'month',
      savings: '33%',
    },
  };

  const features = [
    "100 AI-generated photos per month",
    "All styles & poses available",
    "Priority generation queue",
    "Advanced editing options",
    "Commercial usage rights",
    "24/7 priority support",
    "New styles added monthly",
    "Exclusive pre-release features"
  ];

  const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // @ts-ignore - Google is added via script tag
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <nav className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
              All Access Plan
            </h1>
            <p className="text-xl text-gray-400">
              Start with 5 free AI-generated photos. No credit card required for trial.
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-pink-500/20 rounded-full">
              <span className="text-pink-500 font-semibold">✨ Try 5 photos free, then choose your plan</span>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-800/50 p-1 rounded-xl inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {(['monthly', 'annual'] as const).map((plan) => (
              <div
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan
                    ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 scale-[1.02]'
                    : 'bg-gray-800/50 border-gray-700 hover:scale-[1.02]'
                } border`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {plan === 'annual' ? 'Annual Plan' : 'Monthly Plan'}
                    </h3>
                    <p className="text-gray-400">
                      {plan === 'annual' ? 'Best value' : 'Maximum flexibility'}
                    </p>
                  </div>
                  {plan === 'annual' && (
                    <Crown className="w-8 h-8 text-pink-500" />
                  )}
                  {plan === 'monthly' && (
                    <Clock className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                <div className="mb-8">
                  <div className="flex items-end mb-2">
                    <span className="text-4xl font-bold">${plans[plan].price}</span>
                    <span className="text-gray-400 ml-2">/{plans[plan].period}</span>
                  </div>
                  {plans[plan].savings && (
                    <div className="text-green-400">Save {plans[plan].savings}</div>
                  )}
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className={`w-full py-4 px-6 rounded-xl font-semibold mb-8 transition-all duration-300 ${
                    selectedPlan === plan
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Start Free Trial
                </button>

                <div className="flex items-center justify-center space-x-4 mb-8 text-sm text-gray-400">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Secure payment
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Cancel anytime
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-gray-800/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-8 text-center">Everything in All Access</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;