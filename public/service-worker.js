const STATIC_CACHE = "static-cache-v1";
const RUNTIME_CACHE = "runtime-cache";
const FILES_TO_CACHE = [
  "/",
  "/favicon",
  "/index.html",
  "/style",
  "/dist/auto/images/icons/icon_512x512.png",
  "/dist/auto/images/icons/icon_384x384.png",
  "/dist/auto/images/icons/icon_256x256.png",
  "/dist/auto/images/icons/icon_192x192.png",
  "/dist/auto/images/icons/icon_128x128.png",
  "/dist/auto/images/icons/icon_96x96.png",
  "/dist/bundle.js",
  "/dist/manifest.json"
];

self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});
// Activate
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
// Fetch
self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) => {
          return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            })
            .catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
        })
        .catch((err) => console.log(err))
    );
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request).then((response) => {
        return response || fetch(evt.request);
      });
    })
  );
});