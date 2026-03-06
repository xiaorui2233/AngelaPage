const CACHE_NAME = 'angela-page-v3';
const APP_SHELL = ['/AngelaPage/', '/AngelaPage/index.html'];

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isNavigation(request) {
  return request.mode === 'navigate';
}

function isImmutableAsset(pathname) {
  return /\.(?:css|js|mjs|png|jpe?g|gif|webp|svg|ico|woff2?)$/i.test(pathname);
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (!isSameOrigin(url)) {
    event.respondWith(fetch(req).catch(() => new Response('', { status: 504, statusText: 'Network error' })));
    return;
  }

  // HTML uses network-first to avoid stale style/script combinations after deploy.
  if (isNavigation(req)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, fresh.clone());
        }
        return fresh;
      } catch {
        return (await caches.match(req)) ||
          (await caches.match('/AngelaPage/index.html')) ||
          new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }

  // Static assets use cache-first for speed.
  if (isImmutableAsset(url.pathname)) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;

      const response = await fetch(req);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, response.clone());
      }
      return response;
    })());
    return;
  }

  // Others use network-first with cache fallback.
  event.respondWith((async () => {
    try {
      const response = await fetch(req);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, response.clone());
      }
      return response;
    } catch {
      return (await caches.match(req)) || new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});
