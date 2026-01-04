// NOTE: Keep this cache name versioned to force updates when SW logic changes.
const CACHE_NAME = "silent-voice-v2";
const ASSETS_TO_CACHE = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Avoid caching API responses or cross-origin requests.
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  // For navigations (HTML), always go to network to avoid stale pages after DB changes.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req));
    return;
  }

  // Cache-first for static assets we explicitly precache.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
