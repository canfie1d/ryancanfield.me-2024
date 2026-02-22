import { useEffect } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { usePageMeta } from "~/hooks/usePageMeta";
import { useAbout } from "~/hooks/useSanityContent";
import PageContent from "~/content/PageContent";
import AboutContent from "~/content/AboutContent";
import AboutGameContent from "~/content/AboutGameContent";
import Loader from "~/components/Loader";
import { useGameModeStore } from "~/stores/game-mode";

const About = () => {
  const metaData = usePageMeta("about");
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive = activeGameModes?.about;
  const { isLoading } = useAbout();

  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("about_face")) {
      addAchievement("about_face");
    }
  }, [loadingAchievements, addAchievement, hasAchievement]);

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
      {isLoading ?
        <Loader />
      : gameModeActive ?
        <AboutGameContent />
      : <AboutContent />}
    </PageContent>
  );
};

export default About;
