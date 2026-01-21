// R&M Groups Service Worker - PWA Implementation
const CACHE_NAME = 'rm-groups-v1.0.0';
const STATIC_CACHE_NAME = 'rm-groups-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'rm-groups-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/index.css',
  '/index.tsx',
  '/manifest.json',
  '/images/passport.png',
  '/images/hero-travel.svg',
  '/images/professional-hero.svg',
  '/images/flight-booking.svg',
  '/images/visa-assistance.svg',
  '/images/luxury-car.svg',
  '/images/private-jet.svg',
  '/images/passport-processing.svg',
  '/images/travel-insurance.svg',
  '/images/urban-delivery.svg',
  '/images/corporate-office.svg',
  '/images/team-office.svg',
  '/images/tech-workspace.svg',
  '/images/luxury-business.svg'
];

// External resources to cache (removed CORS-problematic resources)
const EXTERNAL_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker for R&M Groups...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache external resources (with better error handling)
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching external resources...');
        return Promise.allSettled(
          EXTERNAL_RESOURCES.map(url => 
            cache.add(new Request(url, { mode: 'cors' })).catch(err => {
              console.log('[SW] Failed to cache:', url, err);
              return null;
            })
          )
        );
      })
    ]).then(() => {
      console.log('[SW] All assets cached successfully');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME && 
              cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same origin requests - cache first strategy
    event.respondWith(cacheFirstStrategy(request));
  } else if (EXTERNAL_RESOURCES.some(resource => request.url.startsWith(resource))) {
    // External resources - stale while revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else if (url.hostname.includes('unsplash.com') || url.hostname.includes('images.unsplash.com')) {
    // Image requests - cache first with long expiry
    event.respondWith(imagesCacheStrategy(request));
  } else {
    // Other external requests - network first
    event.respondWith(networkFirstStrategy(request));
  }
});

// Cache first strategy - for static assets
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache first strategy failed:', error);
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale while revalidate strategy - for external resources
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Images cache strategy - for Unsplash and other images
async function imagesCacheStrategy(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache images for longer periods
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Image cache strategy failed:', error);
    // Return a placeholder image or cached version
    return caches.match('/images/hero-travel.svg');
  }
}

// Network first strategy - for API calls and dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Network error - Please check your connection', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
});

// Sync offline contact form submissions
async function syncContactForms() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('contact-form-offline')) {
        try {
          const response = await fetch(request);
          if (response.ok) {
            await cache.delete(request);
            console.log('[SW] Offline form submission synced');
          }
        } catch (error) {
          console.log('[SW] Failed to sync form submission:', error);
        }
      }
    }
  } catch (error) {
    console.log('[SW] Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'New update from R&M Groups',
    icon: '/images/passport.png',
    badge: '/images/passport.png',
    image: data.image || '/images/hero-travel.svg',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/images/flight-booking.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/passport.png'
      }
    ],
    requireInteraction: true,
    tag: 'rm-groups-notification'
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'R&M Groups', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('[SW] R&M Groups Service Worker loaded successfully');