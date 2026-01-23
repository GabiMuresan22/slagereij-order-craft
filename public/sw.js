/**
 * Service Worker for Slagerij John PWA
 * Provides offline support and caching for better performance
 */

// IMPORTANT: Increment this version to force cache refresh after deployments
const CACHE_VERSION = 'v2';
const CACHE_NAME = `slagerij-john-${CACHE_VERSION}`;
const RUNTIME_CACHE = `slagerij-john-runtime-${CACHE_VERSION}`;

// Assets to cache on install (only truly static assets)
const PRECACHE_ASSETS = [
  '/og-image.jpg',
  '/favicon.ico',
  '/favicon.svg',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching essential assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Activate immediately
  );
});

// Activate event - clean up ALL old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete any cache that doesn't match current version
            return !cacheName.includes(CACHE_VERSION);
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => self.clients.claim()) // Take control of all pages
  );
});

// Fetch event - Network-first for HTML/JS/CSS, cache-first for images
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // Skip Supabase API calls and external resources
  if (url.origin.includes('supabase.co') || 
      url.origin.includes('googleapis.com') ||
      url.origin.includes('gstatic.com') ||
      url.origin !== self.location.origin) {
    return; // Let these go to network
  }

  // For JS, CSS, and HTML files - always try network first (prevents stale chunk issues)
  const isCodeFile = url.pathname.endsWith('.js') || 
                     url.pathname.endsWith('.css') || 
                     url.pathname.endsWith('.html') ||
                     url.pathname === '/' ||
                     event.request.mode === 'navigate';

  if (isCodeFile) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache the fresh response
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache only if network fails
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // For navigation requests, return cached index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
        })
    );
    return;
  }

  // For images and other static assets - cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return response;
          });
      })
  );
});

// Listen for skip waiting message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
