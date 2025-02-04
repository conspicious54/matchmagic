import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Info } from 'lucide-react';

function GeneratingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Generating Model | PhotoMatchAI';
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pricing/subscribe');
    }, 12000); // 12 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-pink-500/20 blur-3xl"></div>
          <Loader2 className="w-16 h-16 text-pink-500 animate-spin relative" />
        </div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
          Generating Your AI Model
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Please wait while we process your photos and create your personalized AI model...
        </p>

        {/* Enhanced Progress Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-xl"></div>
          <div className="relative bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="mb-4">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 w-2/3 animate-[loading_12s_ease-in-out]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Processing photos...</span>
              <span className="text-gray-400">67%</span>
            </div>
          </div>
        </div>

        {/* Processing Time Info */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-gray-300 font-medium mb-1">Processing Time</p>
            <p className="text-gray-400 text-sm">
              Model training typically takes 4-5 hours for optimal results. We'll notify you when it's ready!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratingPage;