import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getSSRSafeStorage } from "~/lib/ssrStorage";

/** Tracks which console commands have been used (for jewel-about discovery) */
type ConsoleCommandsUsed = {
  look: boolean;
  go: boolean;
  inventory: boolean;
  help: boolean;
  achievements: boolean;
};

type JewelDiscoveryState = {
  consoleCommandsUsed: ConsoleCommandsUsed;
  viewedCaseStudyIds: string[];
  viewedArticleIds: string[];
  markConsoleCommand: (cmd: keyof ConsoleCommandsUsed) => void;
  markCaseStudyViewed: (id: string) => void;
  markArticleViewed: (id: string) => void;
  reset: () => void;
};

const initialConsoleCommands: ConsoleCommandsUsed = {
  look: false,
  go: false,
  inventory: false,
  help: false,
  achievements: false,
};

export const useJewelDiscoveryStore = create<JewelDiscoveryState>()(
  persist(
    (set, get) => ({
      consoleCommandsUsed: initialConsoleCommands,
      viewedCaseStudyIds: [],
      viewedArticleIds: [],
      markConsoleCommand: (cmd: keyof ConsoleCommandsUsed) => {
        set((state) => ({
          consoleCommandsUsed: {
            ...state.consoleCommandsUsed,
            [cmd]: true,
          },
        }));
      },
      markCaseStudyViewed: (id: string) => {
        const current = get().viewedCaseStudyIds;
        if (current.includes(id)) return;
        set({ viewedCaseStudyIds: [...current, id] });
      },
      markArticleViewed: (id: string) => {
        const current = get().viewedArticleIds;
        if (current.includes(id)) return;
        set({ viewedArticleIds: [...current, id] });
      },
      reset: () =>
        set({
          consoleCommandsUsed: initialConsoleCommands,
          viewedCaseStudyIds: [],
          viewedArticleIds: [],
        }),
    }),
    {
      name: "jewel-discovery-storage",
      storage: createJSONStorage(getSSRSafeStorage),
    }
  )
);

export function hasUsedAllConsoleCommands(): boolean {
  const used = useJewelDiscoveryStore.getState().consoleCommandsUsed;
  return used.look && used.go && used.inventory && used.help && used.achievements;
}
