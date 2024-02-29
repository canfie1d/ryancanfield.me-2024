import { useEffect } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useGetPageMeta } from "../hooks/getPageMetaData";
import { useGameModeContext } from "../contexts/GameModeProvider";
import PageContent from "../content/PageContent";
import WritingContent from "../content/WritingContent";
import WritingGameContent from "../content/WritingGameContent";

const Writing = () => {
  const metaData = useGetPageMeta("writing");
  const { activeGameModes } = useGameModeContext();
  const gameModeActive = activeGameModes?.writing;

  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

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
