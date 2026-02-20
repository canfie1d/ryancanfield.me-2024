import { useEffect } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { usePageMeta } from "~/hooks/usePageMeta";
import PageContent from "~/content/PageContent";
import ContactContent from "~/content/ContactContent";
import ContactGameContent from "~/content/ContactGameContent";
import { useGameModeStore } from "~/stores/game-mode";

const Contact = () => {
  const metaData = usePageMeta("contact");
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive = activeGameModes?.contact;

  const loadingAchievements = useAchievementStore(
    (store) => store.loadingAchievements
  );
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("reach_out")) {
      addAchievement("reach_out");
    }
  }, [loadingAchievements]);

  return (
    <PageContent
      pageName="contact"
      header={{
        meta: "④",
        title: metaData.title,
        subtitle: metaData.subtitle,
        icon: metaData.icon,
      }}
    >
      {gameModeActive ? <ContactGameContent /> : <ContactContent />}
    </PageContent>
  );
};

export default Contact;
