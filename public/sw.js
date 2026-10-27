// Offline support: the app shell is cached on install and served
// stale-while-revalidate, so the app opens instantly offline and picks up
// new versions in the background. AI lookups (/api/) always go to the network.

const CACHE = 'hataya-v1';
const SHELL = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'lib/hebrew.js',
  'lib/conjugate.js',
  'lib/lexicon.js',
  'lib/dictionary.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== location.origin || url.pathname.includes('/api/')) return;

  // Navigations (including ?q=...) all get the app shell.
  const key = request.mode === 'navigate' ? './' : request;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(key, { ignoreSearch: request.mode === 'navigate' });
      const network = fetch(request)
        .then((res) => {
          if (res.ok) cache.put(key, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
