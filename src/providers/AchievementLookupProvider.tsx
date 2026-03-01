import { useEffect, type ReactNode } from "react";
import { useAchievements } from "~/hooks/useSanityContent";
import { useAchievementStore } from "~/stores/achievements";

/**
 * Syncs Sanity achievements into the achievement store for toast display.
 * When achievements are loaded from Sanity, the store uses them for addAchievement toast title/description.
 */
export function AchievementLookupProvider({ children }: { children: ReactNode }) {
  const { data: sanityAchievements } = useAchievements();
  const setAchievementsLookup = useAchievementStore((store) => store.setAchievementsLookup);

  useEffect(() => {
    if (sanityAchievements && Array.isArray(sanityAchievements)) {
      setAchievementsLookup(
        sanityAchievements.map((a) => ({
          id: a.id ?? "",
          title: a.title ?? "",
          description: a.description ?? "",
          icon: a.icon ?? "",
        })),
      );
    } else {
      setAchievementsLookup(null);
    }
  }, [sanityAchievements, setAchievementsLookup]);

  return <>{children}</>;
}
