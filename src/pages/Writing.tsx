import PageContent from "../content/PageContent";
import WritingContent from "../content/WritingContent";
import { useScroll } from "react-use";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useEffect, useRef } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useGetPageMeta } from "../hooks/getPageMetaData";
import { useGameModeContext } from "../contexts/GameModeProvider";
import WritingGameContent from "../content/WritingGameContent";

const Writing = () => {
  const ref = useRef(null);
  const { scrolled, setScrolled } = usePageScrollContext();
  const { y } = useScroll(ref);

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

  if (ref.current) {
    if ((scrolled === false || scrolled === undefined) && y > 100) {
      setScrolled(true);
    } else if (scrolled === true && y <= 100) {
      setScrolled(false);
    }
  }

  return (
    <PageContent
      ref={ref}
      pageName="writing"
      scrolled={scrolled}
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
