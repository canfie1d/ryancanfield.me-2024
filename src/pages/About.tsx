import { useScroll } from "react-use";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useEffect, useRef } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useGameModeContext } from "../contexts/GameModeProvider";
import PageContent from "../content/PageContent";
import AboutContent from "../content/AboutContent";
import AboutGameContent from "../content/AboutGameContent";
import { useGetPageMeta } from "../hooks/getPageMetaData";

const About = () => {
  const ref = useRef(null);
  const { scrolled, setScrolled } = usePageScrollContext();
  const { y } = useScroll(ref);

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

  if (ref.current) {
    if (!scrolled && y > 100) {
      setScrolled(true);
    } else if (scrolled && y <= 100) {
      setScrolled(false);
    }
  }

  return (
    <PageContent
      ref={ref}
      pageName="about"
      scrolled={scrolled}
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
