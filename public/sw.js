const CACHE_VERSION = 'v2';
const CACHE_NAME = `as-barberia-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// Recursos base. El resto se cachea on-demand, siempre del mismo origen.
const urlsToCache = ['/', OFFLINE_URL];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((nombres) =>
        Promise.all(
          nombres.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  // Solo se toca lo servido desde este dominio. Las agendas de Calendly y
  // Cal.com viajan sin interceptar: su disponibilidad cambia a cada minuto y
  // servirla desde cache mostraría turnos que ya no existen.
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // El HTML va a la red primero, así un deploy nuevo se ve sin esperar.
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
          return respuesta;
        })
        .catch(() =>
          caches.match(request).then((cacheada) => cacheada || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // Los assets llevan hash en el nombre: si están en cache, sirven.
  event.respondWith(
    caches.match(request).then((cacheada) => {
      if (cacheada) return cacheada;
      return fetch(request).then((respuesta) => {
        if (!respuesta || respuesta.status !== 200 || respuesta.type !== 'basic') {
          return respuesta;
        }
        const copia = respuesta.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
        return respuesta;
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
