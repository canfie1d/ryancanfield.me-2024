import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getSSRSafeStorage } from "~/lib/ssrStorage";

type JewelDiscoveryState = {
  viewedCaseStudyIds: string[];
  viewedArticleIds: string[];
  markCaseStudyViewed: (id: string) => void;
  markArticleViewed: (id: string) => void;
  reset: () => void;
};

export const useJewelDiscoveryStore = create<JewelDiscoveryState>()(
  persist(
    (set, get) => ({
      viewedCaseStudyIds: [],
      viewedArticleIds: [],
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
