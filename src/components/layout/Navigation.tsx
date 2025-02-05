import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { GoogleButton } from '../auth/GoogleButton';

export function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b border-gray-800/50 bg-black/30 backdrop-blur-xl fixed w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-pink-500 animate-pulse" />
                <div className="absolute inset-0 bg-pink-500/20 blur-xl -z-10"></div>
              </div>
              <span className="text-base md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-pink-100 to-pink-500 bg-clip-text text-transparent" style={{ 
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '-0.02em',
                textShadow: '0 0 30px rgba(236, 72, 153, 0.3)'
              }}>
                MatchMagic.io
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-3 md:space-x-6">
            <Link
              to="/pricing"
              className="text-sm md:text-base text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm md:text-base text-gray-400">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="w-[180px] md:w-[240px]">
                <GoogleButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}