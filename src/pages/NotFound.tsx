import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAchievementStore } from "~/stores/achievements";
import PageContent from "~/content/PageContent";
import Text from "~/components/Text";

const NotFound = () => {
  const loadingAchievements = useAchievementStore(
    (store) => store.loadingAchievements
  );
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("lost_and_found")) {
      addAchievement("lost_and_found");
    }
  }, [loadingAchievements]);

  return (
    <PageContent
      pageName="404"
      header={{
        meta: "④⓪④",
        title: "404",
        icon: "at",
      }}
    >
      <div style={{ textAlign: "center" }} className="contentBody">
        <Text>
          Oops! The page you're looking for doesn't exist (that we know of).
        </Text>
        <Link to="/">Go back to the home page</Link>
      </div>
    </PageContent>
  );
};

export default NotFound;
