import { useEffect } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useGetPageMeta } from "../hooks/getPageMetaData";
import PageContent from "../content/PageContent";
import ContactContent from "../content/ContactContent";
import { useGameModeContext } from "../contexts/GameModeProvider";
import ContactGameContent from "../content/ContactGameContent";

const Contact = () => {
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
