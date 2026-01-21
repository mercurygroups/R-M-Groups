import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, Zap } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after user has been on site for 30 seconds
      setTimeout(() => {
        if (!localStorage.getItem('pwa-install-dismissed')) {
          setShowInstallPrompt(true);
        }
      }, 30000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      
      // Track installation
      if (window.gtag) {
        window.gtag('event', 'pwa_install', {
          event_category: 'PWA',
          event_label: 'App Installed'
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (window.gtag) {
        window.gtag('event', 'pwa_install_prompt', {
          event_category: 'PWA',
          event_label: outcome === 'accepted' ? 'Accepted' : 'Dismissed'
        });
      }

      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    
    if (window.gtag) {
      window.gtag('event', 'pwa_install_dismissed', {
        event_category: 'PWA',
        event_label: 'Install Prompt Dismissed'
      });
    }
  };

  // Don't show if already installed or dismissed
  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-in slide-in-from-bottom duration-500">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-3xl shadow-2xl border border-blue-400/20 backdrop-blur-md">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-white/20 p-3 rounded-2xl">
            <Download size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Install R&M Groups App</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Get faster access to our premium travel services with our mobile app experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center">
            <div className="bg-white/10 p-2 rounded-xl mb-2 mx-auto w-fit">
              <Zap size={16} />
            </div>
            <p className="text-xs text-blue-100">Faster Loading</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 p-2 rounded-xl mb-2 mx-auto w-fit">
              <Smartphone size={16} />
            </div>
            <p className="text-xs text-blue-100">Offline Access</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 p-2 rounded-xl mb-2 mx-auto w-fit">
              <Monitor size={16} />
            </div>
            <p className="text-xs text-blue-100">Native Feel</p>
          </div>
        </div>

        {isIOS ? (
          <div className="bg-white/10 p-4 rounded-2xl">
            <p className="text-sm text-blue-100 mb-2 font-semibold">Install on iOS:</p>
            <p className="text-xs text-blue-200 leading-relaxed">
              Tap the Share button <span className="inline-block">📤</span> in Safari, then select "Add to Home Screen" <span className="inline-block">➕</span>
            </p>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-lg active:scale-95"
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;