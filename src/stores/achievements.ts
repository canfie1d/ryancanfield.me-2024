import { create } from "zustand";
import { generateUsername } from "unique-username-generator";
import { ACHIEVEMENTS } from "~/data/achievements";
import { createJSONStorage, persist } from "zustand/middleware";

export type AchievementType = {
  id: string;
  title: string;
  description: string;
  collectedDate: string | null;
  icon: string;
};

type AchievementStateTypes = {
  loadingAchievements: boolean;
  username: string;
  achievements: AchievementType[];
  hasAchievement: (achievementId: AchievementType["id"]) => boolean;
  addAchievement: (achievementId: AchievementType["id"]) => Promise<void>;
  resetAchievements: () => Promise<void>;
  loadAchievements: () => Promise<void>;
  toast: {
    open: boolean;
    title: string;
    message: string;
  };
  setToast: (toast: AchievementStateTypes["toast"]) => void;
};

export const useAchievementStore = create<AchievementStateTypes>()(
  persist(
    (set, get) => ({
      loadingAchievements: false,
      username: generateUsername("-"),
      achievements: [],
      toast: {
        open: false,
        title: "",
        message: "",
      },
      setToast: (toast: AchievementStateTypes["toast"]) => {
        set({ toast });
      },
      addAchievement: async (achievementId: AchievementType["id"]) => {
        const achievement = ACHIEVEMENTS.find(
          (a) => a.id === achievementId
        ) as AchievementType;

        if (!achievement || get().hasAchievement(achievementId)) return;

        achievement.collectedDate = new Date().toISOString();

        await fetch("/api/add-achievement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            achievement,
            username: get().username,
          }),
        }).catch(() => {
          // Fail silently — achievements still saved locally
        });

        set((state) => ({
          achievements: [...state.achievements, achievement],
          toast: {
            open: true,
            title: achievement.title,
            message: achievement.description,
          },
        }));
      },
      hasAchievement: (achievementId: AchievementType["id"]) => {
        return get().achievements.some(
          (achievement: AchievementType) => achievement.id === achievementId
        );
      },
      resetAchievements: async () => {
        await fetch("/api/delete-achievements", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: get().username }),
        }).catch(() => {
          // Fail silently
        });
        set({ achievements: [] });
      },
      loadAchievements: async () => {
        const { username } = get();
        if (!username) return;
        set({ loadingAchievements: true });
        try {
          const response = await fetch(
            `/api/get-achievements?user=${username}`
          );
          if (!response.ok) {
            set({ loadingAchievements: false });
            return;
          }
          const data = await response.json();
          if (data.achievements) {
            set({ achievements: data.achievements, loadingAchievements: false });
          } else {
            set({ loadingAchievements: false });
          }
        } catch {
          set({ loadingAchievements: false });
        }
      },
    }),
    {
      name: "achievement-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
