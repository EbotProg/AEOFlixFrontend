self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-ui-cache").then((cache) => {
      return cache.addAll([
        "/", // Homepage
        "/downloads", // Download route
      ]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
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
        .catch(() => caches.match("/download")), // Serve cached version
    );
  }
});
