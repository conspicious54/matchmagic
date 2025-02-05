import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-500/5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <div className="absolute inset-0 bg-pink-500/20 blur-lg"></div>
              </div>
              <span className="text-gray-400 hover:text-white transition-colors">MatchMagic.io</span>
            </div>
            <p className="text-gray-500">© 2024 All rights reserved</p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="text-gray-400">
              Questions? Email us at:<br />
              <a href="mailto:support@matchmagic.io" className="text-pink-500 hover:text-pink-400 transition-colors">
                support@matchmagic.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}