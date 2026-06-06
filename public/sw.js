/**
 * AlgoCheat AI — Service Worker v1
 * Strategies: Cache-First for assets, Network-First for HTML, offline fallback
 */

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `algocheat-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `algocheat-dynamic-${CACHE_VERSION}`;

const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.png',
];

// ─── Install: Pre-cache app shell ───────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing AlgoCheat AI v1...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL);
    }).then(() => {
      console.log('[SW] App shell cached.');
    })
  );
  self.skipWaiting();
});

// ─── Activate: Clean old caches ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch: Routing strategies ───────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET from same origin
  if (request.method !== 'GET' || url.origin !== location.origin) return;

  // Cache-First: static assets (JS, CSS, images, fonts)
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|woff2|ico)$/)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network-First: HTML navigation
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }
});

// ─── Strategy: Cache-First ───────────────────────────────────────────────────
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Asset unavailable offline', { status: 503 });
  }
}

// ─── Strategy: Network-First ─────────────────────────────────────────────────
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match('/offline.html');
  }
}
