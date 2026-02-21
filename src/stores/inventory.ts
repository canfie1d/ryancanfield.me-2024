import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  type InventoryItemId,
  INVENTORY_ITEMS,
  type InventoryItem,
} from "~/data/inventory";

type InventoryState = {
  items: InventoryItemId[];
  addItem: (id: InventoryItemId) => void;
  hasItem: (id: InventoryItemId) => boolean;
  getItem: (id: InventoryItemId) => InventoryItem | null;
  resetInventory: () => void;
};

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (id: InventoryItemId) => {
        if (get().hasItem(id)) return;
        set((state) => ({ items: [...state.items, id] }));
      },

      hasItem: (id: InventoryItemId) => {
        return get().items.includes(id);
      },

      getItem: (id: InventoryItemId) => {
        const def = INVENTORY_ITEMS[id];
        if (!def) return null;
        return { id, ...def };
      },

      resetInventory: () => set({ items: [] }),
    }),
    {
      name: "inventory-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
