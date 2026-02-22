import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getSSRSafeStorage } from "~/lib/ssrStorage";
import {
  type JewelId,
  type JewelSocketPage,
  JEWEL_FOR_PAGE,
  JEWEL_SOCKET_PAGES,
} from "~/data/inventory";
import { useInventoryStore } from "~/stores/inventory";
import { useAchievementStore } from "~/stores/achievements";
import { useGameModeStore } from "~/stores/game-mode";

export type PlacedJewels = Partial<Record<JewelSocketPage, JewelId>>;

type JewelSocketState = {
  placedJewels: PlacedJewels;
  placeJewel: (page: JewelSocketPage) => void;
  removeJewel: (page: JewelSocketPage) => void;
  isJewelPlaced: (page: JewelSocketPage) => boolean;
  resetJewelSockets: () => void;
};

const syncGameModeFromJewels = (placedJewels: PlacedJewels) => {
  const activeGameModes = {
    about: !!placedJewels.about,
    work: !!placedJewels.work,
    writing: !!placedJewels.writing,
    contact: !!placedJewels.contact,
  };
  const allActive = Object.values(activeGameModes).every(Boolean);
  useGameModeStore.getState().setGameMode(activeGameModes);
  if (allActive) {
    if (!useAchievementStore.getState().hasAchievement("wield")) {
      useAchievementStore.getState().addAchievement("wield");
    }
    if (!useInventoryStore.getState().hasItem("sword")) {
      useInventoryStore.getState().addItem("sword");
    }
  }
};

export const useJewelSocketStore = create<JewelSocketState>()(
  persist(
    (set, get) => ({
      placedJewels: {},
      placeJewel: (page: JewelSocketPage) => {
        const jewelId = JEWEL_FOR_PAGE[page];
        const { hasItem, removeItem } = useInventoryStore.getState();
        if (!hasItem(jewelId)) return;
        removeItem(jewelId);
        const updated = { ...get().placedJewels, [page]: jewelId };
        set({ placedJewels: updated });
        syncGameModeFromJewels(updated);
      },
      removeJewel: (page: JewelSocketPage) => {
        const placed = get().placedJewels[page];
        if (!placed) return;
        useInventoryStore.getState().addItem(placed);
        const updated = { ...get().placedJewels };
        delete updated[page];
        set({ placedJewels: updated });
        syncGameModeFromJewels(updated);
      },
      isJewelPlaced: (page: JewelSocketPage) => !!get().placedJewels[page],
      resetJewelSockets: () => {
        const { placedJewels } = get();
        const { addItem } = useInventoryStore.getState();
        for (const page of JEWEL_SOCKET_PAGES) {
          const jewel = placedJewels[page as JewelSocketPage];
          if (jewel) addItem(jewel);
        }
        set({ placedJewels: {} });
        syncGameModeFromJewels({});
      },
    }),
    {
      name: "jewel-sockets-storage",
      storage: createJSONStorage(getSSRSafeStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.placedJewels) {
          syncGameModeFromJewels(state.placedJewels);
        }
      },
    }
  )
);
