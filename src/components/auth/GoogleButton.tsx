import { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: (notification: any) => void;
        };
      };
    };
  }
}

const CLIENT_ID = '652320628732-i2onu109kl1h74vhogaeeqid2ralhris.apps.googleusercontent.com';

export function GoogleButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { signInWithGoogle } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && buttonRef.current && !isInitialized) {
        try {
          window.google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: signInWithGoogle,
            auto_select: false,
            cancel_on_tap_outside: true,
            context: 'signin'
          });

          window.google.accounts.id.renderButton(buttonRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            width: buttonRef.current.offsetWidth,
          });

          setIsInitialized(true);
        } catch (error) {
          console.error('Error initializing Google Sign In:', error);
        }
      }
    };

    // Try to initialize immediately
    initializeGoogleSignIn();

    // Also set up a retry mechanism
    const retryInterval = setInterval(() => {
      if (!isInitialized && window.google) {
        initializeGoogleSignIn();
      }
    }, 1000);

    return () => {
      clearInterval(retryInterval);
    };
  }, [signInWithGoogle, isInitialized]);

  return <div ref={buttonRef} className="w-full h-[40px]" />;
}