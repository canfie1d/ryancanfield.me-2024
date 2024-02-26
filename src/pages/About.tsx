import { useEffect } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useGameModeContext } from "../contexts/GameModeProvider";
import { useGetPageMeta } from "../hooks/getPageMetaData";
import PageContent from "../content/PageContent";
import AboutContent from "../content/AboutContent";
import AboutGameContent from "../content/AboutGameContent";

const About = () => {
  const metaData = useGetPageMeta("about");
  const { activeGameModes } = useGameModeContext();
  const gameModeActive = activeGameModes?.about;

  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("about_face")) {
      addAchievement("about_face");
    }
  }, [loadingAchievements]);

  return (
    <PageContent
      pageName="about"
      header={{
        meta: "①",
        title: metaData.title,
        subtitle: metaData.subtitle,
        icon: metaData.icon,
      }}
    >
      {gameModeActive ? <AboutGameContent /> : <AboutContent />}
    </PageContent>
  );
};

export default About;
