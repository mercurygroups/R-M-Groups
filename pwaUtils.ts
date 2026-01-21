// PWA Utilities for R&M Groups
export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      console.log('[PWA] Registering service worker...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[PWA] Service worker registered successfully:', registration);

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is available
              console.log('[PWA] New service worker available');
              
              // Show update notification
              if (window.confirm('A new version of R&M Groups is available. Would you like to update?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        }
      });

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATE_READY') {
          console.log('[PWA] Service worker update ready');
        }
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

    } catch (error) {
      console.error('[PWA] Service worker registration failed:', error);
    }
  } else {
    console.log('[PWA] Service workers are not supported');
  }
};

export const unregisterServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('[PWA] Service worker unregistered');
      }
    } catch (error) {
      console.error('[PWA] Service worker unregistration failed:', error);
    }
  }
};

export const checkForUpdates = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        console.log('[PWA] Checked for updates');
      }
    } catch (error) {
      console.error('[PWA] Update check failed:', error);
    }
  }
};

// PWA Installation Detection
export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Network Status Detection
export const getNetworkStatus = (): boolean => {
  return navigator.onLine;
};

// Cache Management
export const clearAppCache = async (): Promise<void> => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('[PWA] App cache cleared');
    } catch (error) {
      console.error('[PWA] Cache clearing failed:', error);
    }
  }
};

// Offline Form Storage
export const storeOfflineFormData = (formData: any): void => {
  try {
    const offlineData = JSON.parse(localStorage.getItem('offline-forms') || '[]');
    offlineData.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    });
    localStorage.setItem('offline-forms', JSON.stringify(offlineData));
    console.log('[PWA] Form data stored offline');
  } catch (error) {
    console.error('[PWA] Offline form storage failed:', error);
  }
};

export const getOfflineFormData = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem('offline-forms') || '[]');
  } catch (error) {
    console.error('[PWA] Offline form retrieval failed:', error);
    return [];
  }
};

export const clearOfflineFormData = (): void => {
  try {
    localStorage.removeItem('offline-forms');
    console.log('[PWA] Offline form data cleared');
  } catch (error) {
    console.error('[PWA] Offline form data clearing failed:', error);
  }
};

// Push Notification Support
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    console.log('[PWA] Notification permission:', permission);
    return permission;
  }
  return 'denied';
};

export const showNotification = (title: string, options?: NotificationOptions): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/images/passport.png',
      badge: '/images/passport.png',
      ...options
    });
  }
};

// App Version Management
export const getAppVersion = async (): Promise<string> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.active) {
        return new Promise((resolve) => {
          const messageChannel = new MessageChannel();
          messageChannel.port1.onmessage = (event) => {
            resolve(event.data.version || '1.0.0');
          };
          registration.active.postMessage({ type: 'GET_VERSION' }, [messageChannel.port2]);
        });
      }
    } catch (error) {
      console.error('[PWA] Version check failed:', error);
    }
  }
  return '1.0.0';
};

// Performance Monitoring
export const trackPWAMetrics = (): void => {
  if ('performance' in window) {
    // Track app load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('[PWA] App load time:', loadTime + 'ms');
      
      // Track with Google Analytics if available
      if (window.gtag) {
        window.gtag('event', 'pwa_load_time', {
          event_category: 'PWA Performance',
          event_label: 'Load Time',
          value: loadTime
        });
      }
    });

    // Track first contentful paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('[PWA] First Contentful Paint:', entry.startTime + 'ms');
            
            if (window.gtag) {
              window.gtag('event', 'pwa_fcp', {
                event_category: 'PWA Performance',
                event_label: 'First Contentful Paint',
                value: Math.round(entry.startTime)
              });
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['paint'] });
    }
  }
};

// Initialize PWA
export const initializePWA = async (): Promise<void> => {
  console.log('[PWA] Initializing R&M Groups PWA...');
  
  // Register service worker
  await registerServiceWorker();
  
  // Track PWA metrics
  trackPWAMetrics();
  
  // Check if installed
  const isInstalled = isPWAInstalled();
  console.log('[PWA] Installation status:', isInstalled ? 'Installed' : 'Not installed');
  
  // Track installation status
  if (window.gtag) {
    window.gtag('event', 'pwa_status', {
      event_category: 'PWA',
      event_label: isInstalled ? 'Installed' : 'Browser',
      value: isInstalled ? 1 : 0
    });
  }
  
  console.log('[PWA] R&M Groups PWA initialized successfully');
};