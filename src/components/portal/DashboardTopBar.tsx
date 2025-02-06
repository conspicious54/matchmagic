import { useState } from 'react';
import { CreditCard, Plus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import { CreditsPopup } from './CreditsPopup';
import { PlanPopup } from './PlanPopup';

export function DashboardTopBar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isCreditsPopupOpen, setIsCreditsPopupOpen] = useState(false);
  const [isPlanPopupOpen, setIsPlanPopupOpen] = useState(false);
  const credits = 100; // Hardcoded for now

  const handleAddCredits = () => {
    // Check if we're on mobile
    if (window.innerWidth < 768) {
      navigate('/add-credits');
    } else {
      setIsCreditsPopupOpen(true);
    }
  };

  const handleManagePlan = () => {
    // Check if we're on mobile
    if (window.innerWidth < 768) {
      navigate('/manage-plan');
    } else {
      setIsPlanPopupOpen(true);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 h-16 bg-gray-900/50 border-b border-gray-800/50 backdrop-blur-xl z-40">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Credits Display */}
        <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50">
          <CreditCard className="w-4 h-4 text-pink-500" />
          <span className="text-gray-200">{credits} credits</span>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Add Credits Button */}
          <button 
            onClick={handleAddCredits}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/25"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Add Credits</span>
          </button>

          {/* Manage Plan Button */}
          <button
            onClick={handleManagePlan}
            className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Manage Plan</span>
          </button>

          {/* Sign Out Button - Hidden on mobile */}
          <button
            onClick={() => signOut()}
            className="hidden md:block px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Credits Popup - Only shown on desktop */}
      <CreditsPopup 
        isOpen={isCreditsPopupOpen}
        onClose={() => setIsCreditsPopupOpen(false)}
      />

      {/* Plan Management Popup - Only shown on desktop */}
      <PlanPopup
        isOpen={isPlanPopupOpen}
        onClose={() => setIsPlanPopupOpen(false)}
      />
    </div>
  );
}