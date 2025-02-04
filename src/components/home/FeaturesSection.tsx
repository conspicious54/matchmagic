import { Camera, Star } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export function FeaturesSection() {
  const { user } = useAuth();

  const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // @ts-ignore - Google is added via script tag
    if (window.google) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('Google Sign-In prompt not displayed:', notification.getNotDisplayedReason());
        }
      });
    }
  };

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="group bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
            <div className="relative">
              <Camera className="w-12 h-12 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Dating App Photos That Convert</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Create professional, natural-looking photos that get more matches on Tinder, Bumble, and other dating apps.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
          <div className="group bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
            <div className="relative">
              <Star className="w-12 h-12 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Instagram-Ready Content</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Generate stunning photos that are indistinguishable from professional shoots, perfect for your social media presence.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}