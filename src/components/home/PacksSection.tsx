import { useState } from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import { packs } from '../../data/packs';
import { useAuth } from '../auth/AuthContext';
import type { Pack } from '../../data/types';

export function PacksSection() {
  const [hoveredPack, setHoveredPack] = useState<string | null>(null);
  
  const handleGoogleSignIn = () => {
    // @ts-ignore - Google is added via script tag
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
            Choose Your Pack
          </h2>
          <p className="text-gray-400 text-lg">
            Select the perfect photo pack tailored to your needs. Each pack includes unique poses, settings, and styles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packs.map((pack) => {
            const IconComponent = pack.icon;
            return (
              <div 
                key={pack.name}
                className={`relative rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] ${
                  pack.popular
                    ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30'
                    : 'bg-gray-800/50 border-gray-700'
                } border`}
                onMouseEnter={() => setHoveredPack(pack.name)}
                onMouseLeave={() => setHoveredPack(null)}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img 
                    src={pack.image} 
                    alt={pack.name}
                    className="w-full h-full object-cover opacity-20 transition-transform duration-300 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black"></div>
                </div>

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <IconComponent className={`w-8 h-8 ${pack.popular ? 'text-pink-500' : 'text-gray-400'}`} />
                        <div className="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{pack.name}</h3>
                    </div>
                    {pack.popular && (
                      <div className="flex items-center space-x-1 px-3 py-1 bg-pink-500/20 rounded-full">
                        <Star className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-semibold text-pink-500">Popular</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6">{pack.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {pack.includes.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-white">{pack.price}</div>
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}