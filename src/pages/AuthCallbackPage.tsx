import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/auth/AuthContext';

function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Authenticating | PhotoMatchAI';
  }, []);

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!user) {
        console.log('No user found, redirecting to home');
        navigate('/', { replace: true });
        return;
      }

      try {
        console.log('Checking profile for user:', user.id);
        
        // Get profile with a simple select - no maybeSingle or not conditions
        const { data: profiles, error } = await supabase
          .from('user_profiles')
          .select('name, plan_status')
          .eq('user_id', user.id);

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        // Get the first profile if it exists
        const profile = profiles?.[0];

        // Log the profile data for debugging
        console.log('Profile data:', profile);

        if (profile?.name) {
          console.log('Profile found with name:', profile.name);
          // Profile exists with name, check plan status
          if (profile.plan_status === 'active') {
            console.log('Plan is active, going to dashboard');
            navigate('/dashboard', { replace: true });
          } else {
            console.log('Plan is inactive, going to subscribe');
            navigate('/pricing/subscribe', { replace: true });
          }
        } else {
          console.log('No profile or no name, going to create');
          navigate('/create', { replace: true });
        }
      } catch (error) {
        console.error('Error during auth callback:', error);
        // On error, safest to send to create page
        navigate('/create', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Checking your account...</p>
      </div>
    </div>
  );
}

export default AuthCallbackPage;