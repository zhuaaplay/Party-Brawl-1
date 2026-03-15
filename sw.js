const CACHE_NAME = 'party-brawl-cache-v1';
const urlsToCache = [
    '.',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'browserconfig.xml',
    'assets/icon/icon.png',
    'assets/icon/icon-16x16.png',
    'assets/icon/icon-32x32.png',
    'assets/icon/icon-48x48.png',
    'assets/icon/icon-72x72.png',
    'assets/icon/icon-96x96.png',
    'assets/icon/icon-128x128.png',
    'assets/icon/icon-144x144.png',
    'assets/icon/icon-152x152.png',
    'assets/icon/icon-180x180.png',
    'assets/icon/icon-192x192.png',
    'assets/icon/icon-256x256.png',
    'assets/icon/icon-384x384.png',
    'assets/icon/icon-512x512.png'
];

// Instalasi Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Mengambil konten dari cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Memperbarui Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
