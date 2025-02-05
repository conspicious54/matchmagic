import { ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { GoogleButton } from '../auth/GoogleButton';

export function HeroSection() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-75"
          style={{ filter: 'brightness(0.6)' }}
        >
          <source src="https://pub-cda2548da4a2411a995b49fb5416f4ca.r2.dev/Screen%20Recording%202025-02-02%20at%206.23.09%E2%80%AFPM.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            🔥 Fire your photographer
          </h1>
          <p className="text-2xl text-gray-300 mb-6 leading-relaxed">
            Create stunning AI-generated photos that will make your dating profile stand out. Look professional, natural, and 100% like you.
          </p>
          
          {/* Powered by 360VisionAI Blurb */}
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/30 to-pink-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative px-6 py-3 bg-gradient-to-r from-purple-600/10 via-fuchsia-500/10 to-pink-500/10 backdrop-blur-sm rounded-lg border border-purple-500/20">
              <span className="text-lg font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                ✨ Powered by 360VisionAI
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 mt-8">
            <div className="w-full max-w-md mx-auto">
              <GoogleButton />
            </div>
            <p className="text-sm text-gray-400">
              Get 5 free photos when you sign up today
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
    </div>
  );
}