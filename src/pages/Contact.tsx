import { useEffect, useRef } from "react";
import { useScroll } from "react-use";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useGetPageMeta } from "../hooks/getPageMetaData";
import PageContent from "../content/PageContent";
import ContactContent from "../content/ContactContent";
import { useGameModeContext } from "../contexts/GameModeProvider";
import ContactGameContent from "../content/ContactGameContent";

const Contact = () => {
  const ref = useRef(null);
  const { scrolled, setScrolled } = usePageScrollContext();
  const { y } = useScroll(ref);

  const metaData = useGetPageMeta("contact");
  const { activeGameModes } = useGameModeContext();
  const gameModeActive = activeGameModes?.contact;

  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("reach_out")) {
      addAchievement("reach_out");
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
      pageName="contact"
      scrolled={scrolled}
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
