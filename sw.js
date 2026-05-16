const CACHE = 'portfolio-v1';
const STATIC = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/notes/notes.css',
  '/js/app.js',
  '/js/theme-init.js',
  '/js/notes-common.js',
  '/404.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;

  if (request.destination === 'document') {
    e.respondWith(
      fetch(request)
        .then(r => { caches.open(CACHE).then(c => c.put(request, r.clone())); return r; })
        .catch(() => caches.match(request).then(r => r || caches.match('/404.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(r => {
        if (r.ok) caches.open(CACHE).then(c => c.put(request, r.clone()));
        return r;
      });
      return cached || network;
    })
  );
});
