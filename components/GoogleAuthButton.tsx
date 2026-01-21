import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface GoogleAuthButtonProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  text?: string;
}

declare global {
  interface Window {
    google: any;
    googleAuthCallback: (response: any) => void;
  }
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ 
  onSuccess, 
  onError, 
  text = "Continue with Google" 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    // Debug: Log the client ID
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log('Google Client ID:', clientId);
    setDebugInfo(`Client ID: ${clientId ? 'Set' : 'Missing'}`);

    // Load Google Identity Services
    const loadGoogleScript = () => {
      if (window.google) {
        console.log('Google already loaded');
        initializeGoogle();
        return;
      }

      console.log('Loading Google Identity Services...');
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google script loaded successfully');
        initializeGoogle();
      };
      script.onerror = (error) => {
        console.error('Failed to load Google Identity Services:', error);
        onError('Failed to load Google authentication. Please check your internet connection.');
      };
      document.head.appendChild(script);
    };

    const initializeGoogle = () => {
      if (window.google && window.google.accounts) {
        console.log('Initializing Google OAuth...');
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          setIsGoogleLoaded(true);
          setDebugInfo('Google OAuth initialized successfully');
          console.log('Google OAuth initialized successfully');
        } catch (error) {
          console.error('Google initialization error:', error);
          onError('Failed to initialize Google authentication');
        }
      } else {
        console.error('Google accounts not available');
        onError('Google authentication service not available');
      }
    };

    loadGoogleScript();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handleGoogleResponse = async (response: any) => {
    console.log('Google response received:', response);
    setIsLoading(true);
    
    try {
      if (response.credential) {
        // Decode the JWT token to get user info
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        console.log('Google user payload:', payload);
        
        const userData = {
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          picture: payload.picture,
          googleId: payload.sub,
          isVerified: payload.email_verified
        };

        console.log('Processed user data:', userData);

        // Use the auth context to handle Google login
        if (loginWithGoogle) {
          const result = await loginWithGoogle(userData);
          console.log('Login result:', result);
          if (result.success) {
            onSuccess();
          } else {
            onError(result.message || 'Google authentication failed');
          }
        } else {
          console.error('loginWithGoogle function not available');
          onError('Authentication service not available');
        }
      } else {
        console.error('No credential received from Google');
        onError('No credential received from Google');
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      onError('Google authentication failed: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!isGoogleLoaded) {
      onError('Google authentication is not ready. Please wait and try again.');
      return;
    }

    console.log('Initiating Google login...');
    setIsLoading(true);
    
    try {
      // Try to show the One Tap prompt first
      window.google.accounts.id.prompt((notification: any) => {
        console.log('Google prompt notification:', notification);
        
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('One Tap not displayed, falling back to popup');
          // Fallback to popup method
          try {
            window.google.accounts.id.renderButton(
              document.getElementById('google-signin-button'),
              {
                theme: 'outline',
                size: 'large',
                width: 300,
                text: 'continue_with',
                shape: 'rectangular',
              }
            );
            // Make the hidden button visible temporarily
            const hiddenButton = document.getElementById('google-signin-button');
            if (hiddenButton) {
              hiddenButton.style.display = 'block';
              hiddenButton.style.position = 'absolute';
              hiddenButton.style.top = '-9999px';
              // Trigger click on the Google button
              setTimeout(() => {
                const googleButton = hiddenButton.querySelector('div[role="button"]') as HTMLElement;
                if (googleButton) {
                  googleButton.click();
                }
              }, 100);
            }
          } catch (renderError) {
            console.error('Button render error:', renderError);
            onError('Failed to show Google login button');
          }
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Google prompt error:', error);
      setIsLoading(false);
      onError('Failed to show Google login: ' + (error as Error).message);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading || !isGoogleLoaded}
        className="w-full bg-white border-2 border-slate-200 text-slate-700 font-semibold py-4 px-6 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 animate-glow-soft"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        <span>{isLoading ? 'Connecting...' : text}</span>
      </button>
      
      {/* Debug info in development */}
      {import.meta.env.DEV && (
        <div className="mt-2 text-xs text-slate-500">
          Debug: {debugInfo}
        </div>
      )}
      
      {/* Hidden div for Google button rendering */}
      <div id="google-signin-button" className="hidden"></div>
    </div>
  );
};

export default GoogleAuthButton;