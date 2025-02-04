import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { supabase } from '../lib/supabase';
import { Camera, Image, Clock, Copy, Check } from 'lucide-react';
import { dashboardPacks } from '../data/packs';
import { examplePhotos } from '../data/examples';
import type { ExamplePhoto } from '../data/types';
import { setGlobalPrompt } from '../components/portal/ModelSidebar';

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'photos' | 'examples' | 'packs'>('packs');
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Dashboard | PhotoMatchAI';
  }, []);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        console.log('DashboardPage: No user found, redirecting to home');
        navigate('/', { replace: true });
        return;
      }

      try {
        console.log('DashboardPage: Checking profile for user:', user.id);
        
        const { data: profiles, error } = await supabase
          .from('user_profiles')
          .select('name, plan_status')
          .eq('user_id', user.id);

        if (error) {
          console.error('DashboardPage: Database error:', error);
          throw error;
        }

        const profile = profiles?.[0];
        console.log('DashboardPage: Profile data:', profile);

        if (!profile?.name) {
          console.log('DashboardPage: No profile found, redirecting to create');
          navigate('/create', { replace: true });
          return;
        }

        if (profile.plan_status !== 'active') {
          console.log('DashboardPage: Plan not active, redirecting to subscribe');
          navigate('/pricing/subscribe', { replace: true });
          return;
        }

        console.log('DashboardPage: Profile valid and plan active, staying on dashboard');
      } catch (error) {
        console.error('DashboardPage: Error checking profile:', error);
        navigate('/create', { replace: true });
      }
    };

    checkProfile();
  }, [navigate, user]);

  const handleUsePrompt = (photo: ExamplePhoto, index: number) => {
    // Update the global prompt state with all fields
    setGlobalPrompt(
      photo.prompt,
      photo.style,
      photo.cameraAngle,
      photo.photoCount,
      photo.cameraType
    );
    
    // Show copied indicator
    setCopiedPrompt(index);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'photos':
        return (
          <div className="text-center py-12 text-gray-300">
            <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-lg mb-2">No photos generated yet</p>
            <p className="text-gray-400">
              Use the sidebar controls to create your first AI-generated photo
            </p>
          </div>
        );
      case 'examples':
        return (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {examplePhotos.map((photo, index) => (
              <div 
                key={index} 
                className="break-inside-avoid mb-4 group relative"
                onMouseEnter={() => setHoveredPhoto(index)}
                onMouseLeave={() => setHoveredPhoto(null)}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={photo.url}
                    alt={`Example ${index + 1}`}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <button
                      onClick={() => handleUsePrompt(photo, index)}
                      className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-white/30 transition-colors text-sm mb-2"
                    >
                      {copiedPrompt === index ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span>Prompt Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Use Prompt</span>
                        </>
                      )}
                    </button>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-300">{photo.prompt}</p>
                      <p className="text-gray-400">Style: {photo.style}</p>
                      <p className="text-gray-400">Camera Angle: {photo.cameraAngle}</p>
                      <p className="text-gray-400">Camera: {photo.cameraType}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'packs':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardPacks.map((pack) => (
              <div 
                key={pack.name}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 group"
              >
                {/* Background Image */}
                <div className="relative h-48">
                  <img 
                    src={pack.image} 
                    alt={pack.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{pack.name}</h3>
                    <p className="text-sm text-gray-300">{pack.description}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    {pack.includes.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => pack.prompt && handleUsePrompt({ 
                      prompt: pack.prompt,
                      style: "Modern",
                      cameraAngle: "Three-Quarter",
                      photoCount: 5,
                      cameraType: "Canon EOS R5",
                      url: pack.image
                    }, -1)}
                    className={`w-full px-4 py-2 ${
                      pack.price 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' 
                        : 'bg-white/10 hover:bg-white/20'
                    } text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2`}
                  >
                    {pack.price ? (
                      <span>Use Pack ({pack.price})</span>
                    ) : (
                      <>
                        <span>Use Pack</span>
                        <Copy className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
          Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <Clock className="w-5 h-5 text-pink-500" />
            </div>
            <div className="text-gray-300">
              No recent activity to show
            </div>
          </div>
          
          {/* Credits Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Credits</h2>
              <Camera className="w-5 h-5 text-pink-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">100</div>
            <div className="text-gray-300">
              Available credits
            </div>
          </div>

          {/* Generated Photos Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Generated Photos</h2>
              <Image className="w-5 h-5 text-pink-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">0</div>
            <div className="text-gray-300">
              Total photos generated
            </div>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
          <div className="border-b border-gray-700/50">
            <div className="flex space-x-1 p-4">
              {[
                { id: 'packs', label: 'Photo Packs' },
                { id: 'photos', label: 'Your Photos' },
                { id: 'examples', label: 'Examples' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;