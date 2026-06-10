const CACHE = "sportprep-v4";

const STATIC_FILES = [
  "/",
  "/static/index.html",
  "/static/css/style.css",
  "/static/js/app.js",
  "/manifest.json",
  "/static/icons/icon-192.png",
  "/static/icons/icon-512.png"
];

// INSTALL : mise en cache de l'app shell
self.addEventListener("install", event => {
  console.log("[SW] Install");
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

// ACTIVATE : nettoyage des anciens caches
self.addEventListener("activate", event => {
  console.log("[SW] Activate");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH : stratégie hybride
self.addEventListener("fetch", event => {
  const url = event.request.url;

  // Ressources statiques → Cache First
  if (
    url.endsWith(".css") ||
    url.endsWith(".js") ||
    url.endsWith(".png") ||
    url.endsWith(".json") ||
    url.includes("/static/")
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigation (page HTML) → Cache First avec fallback réseau
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/").then(cached => cached || fetch(event.request))
    );
    return;
  }

  // Tout le reste → réseau avec fallback cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
