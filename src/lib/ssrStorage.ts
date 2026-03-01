import type { StateStorage } from "zustand/middleware";

/**
 * Returns localStorage in the browser and a no-op storage on the server.
 * Use with Zustand persist to avoid "window is not defined" during SSR.
 */
export function getSSRSafeStorage(): StateStorage {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => { },
      removeItem: () => { },
    };
  }
  return localStorage;
}
