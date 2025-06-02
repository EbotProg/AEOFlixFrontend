self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll([
        "/", // Homepage
        "/offline", // Offline fallback page
      ]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/video/")) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((res) => {
              return caches.open("offline-cache").then((cache) => {
                cache.put(event.request, res.clone());
                return res;
              });
            })
          );
        })
        .catch(() => caches.match("/offline")),
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request)),
    );
  }
});
