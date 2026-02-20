import { useEffect } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { usePageMeta } from "~/hooks/usePageMeta";
import PageContent from "~/content/PageContent";
import WritingContent from "~/content/WritingContent";
import WritingGameContent from "~/content/WritingGameContent";
import { useGameModeStore } from "~/stores/game-mode";

const Writing = () => {
  const metaData = usePageMeta("writing");
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive = activeGameModes?.writing;

  const loadingAchievements = useAchievementStore(
    (store) => store.loadingAchievements
  );
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("writers_block")) {
      addAchievement("writers_block");
    }
  }, [loadingAchievements]);

  return (
    <PageContent
      pageName="writing"
      header={{
        meta: "③",
        title: metaData.title,
        subtitle: metaData.subtitle,
        icon: metaData.icon,
      }}
    >
      {gameModeActive ? <WritingGameContent /> : <WritingContent />}
    </PageContent>
  );
};

export default Writing;
