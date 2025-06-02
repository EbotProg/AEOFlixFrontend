self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-ui-cache").then((cache) => {
      return cache.addAll([
        "/", // Homepage
        "/downloads", // Cached download route
        "/offline", // Offline fallback page
      ]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Handling document requests (HTML pages)
  if (event.request.destination === "document") {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((res) => {
              return caches.open("offline-ui-cache").then((cache) => {
                cache.put(event.request, res.clone());
                return res;
              });
            })
          );
        })
        .catch(() => caches.match("/downloads")), // Serve cached download page when offline
    );
  }

  // Handling dynamic video routes
  else if (url.pathname.startsWith("/video/")) {
    console.log(`Intercepted request for video page: ${url.pathname}`);

    event.respondWith(
      caches
        .match(event.request)
        .then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(event.request).then((fetchResponse) => {
              return caches.open("offline-video-cache").then((cache) => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
            })
          );
        })
        .catch(() => caches.match("/downloads")), // Serve fallback page for videos
    );
  }

  // Default caching for other requests (styles, scripts, assets)
  else {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request)),
    );
  }
});
