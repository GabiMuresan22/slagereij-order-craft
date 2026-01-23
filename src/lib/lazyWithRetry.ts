import { lazy, ComponentType } from 'react';

type LazyImport<T extends ComponentType<unknown>> = () => Promise<{ default: T }>;

/**
 * Wraps React.lazy with retry logic to handle chunk loading failures
 * after deployments (stale service worker cache).
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  importFn: LazyImport<T>,
  retries = 2
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        
        // Check if it's a chunk loading failure
        const isChunkError = 
          error instanceof Error && 
          (error.message.includes('Failed to fetch dynamically imported module') ||
           error.message.includes('Loading chunk') ||
           error.message.includes('ChunkLoadError'));

        if (isChunkError && attempt < retries) {
          // Clear service worker cache and reload on last retry
          if (attempt === retries - 1) {
            // Unregister service workers
            if ('serviceWorker' in navigator) {
              const registrations = await navigator.serviceWorker.getRegistrations();
              for (const registration of registrations) {
                await registration.unregister();
              }
            }
            // Clear caches
            if ('caches' in window) {
              const cacheNames = await caches.keys();
              await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            // Hard reload
            window.location.reload();
          }
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
          continue;
        }
        throw error;
      }
    }

    throw lastError || new Error('Failed to load module');
  });
}
