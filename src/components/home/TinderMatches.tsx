import { ArrowRight, Heart, Sparkles, Trophy } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export function TinderMatches() {
  const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // @ts-ignore - Google is added via script tag
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-gradient"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-3 mb-6">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-semibold text-yellow-500">Proven Results</span>
            </div>
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent">
              4.7x More Tinder Matches
              <br />
              <span className="text-4xl">or Your Money Back</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI-generated photos are proven to increase your match rate by an average of 470%. Don't believe us? Try it risk-free with our money-back guarantee.
            </p>
            
            {/* Stats grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 backdrop-blur-sm border border-pink-500/20">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-pink-500" />
                </div>
                <div className="text-4xl font-bold mb-2">470%</div>
                <div className="text-gray-400">Average increase in matches</div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 backdrop-blur-sm border border-pink-500/20">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-pink-500" />
                </div>
                <div className="text-4xl font-bold mb-2">92%</div>
                <div className="text-gray-400">Success rate with users</div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 backdrop-blur-sm border border-pink-500/20">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-pink-500" />
                </div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-gray-400">Money-back guarantee</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/25"
              >
                Start Free Trial
              </button>
              <button 
                onClick={scrollToHowItWorks}
                className="group inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <span>Learn how it works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}