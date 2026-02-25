import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getSSRSafeStorage } from "~/lib/ssrStorage";
import type { JewelId } from "~/data/inventory";

type LockedItemsState = {
  locked: JewelId[];
  addLocked: (id: JewelId) => void;
  removeLocked: (id: JewelId) => void;
  isLocked: (id: JewelId) => boolean;
  hasLockedItems: () => boolean;
  /** Mark that user has seen the backpack on journey page (so we know to show locked jewel) */
  setJourneyBackpackSeen: (seen: boolean) => void;
  journeyBackpackSeen: boolean;
};

export const useLockedItemsStore = create<LockedItemsState>()(
  persist(
    (set, get) => ({
      locked: [],
      journeyBackpackSeen: false,

      addLocked: (id) => {
        set((state) =>
          state.locked.includes(id) ? state : { locked: [...state.locked, id] },
        );
      },

      removeLocked: (id) => {
        set((state) => ({
          locked: state.locked.filter((i) => i !== id),
        }));
      },

      isLocked: (id) => get().locked.includes(id),

      hasLockedItems: () => get().locked.length > 0,

      setJourneyBackpackSeen: (seen) => set({ journeyBackpackSeen: seen }),
    }),
    {
      name: "locked-items-storage",
      storage: createJSONStorage(getSSRSafeStorage),
    },
  ),
);
