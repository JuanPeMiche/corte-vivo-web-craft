import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    // Solo registrar el service worker en producción
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          console.log('Service Worker registrado exitosamente:', registration);

          // Manejar actualizaciones
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nueva versión disponible
                  if (confirm('Nueva versión disponible. ¿Actualizar ahora?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });

          // Manejar cuando el SW toma control
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
          });

        } catch (error) {
          console.error('Error registrando Service Worker:', error);
        }
      };

      registerSW();
    }
  }, []);
};

export default useServiceWorker;