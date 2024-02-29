import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAchievementContext } from "../contexts/AchievementProvider";
import PageContent from "../content/PageContent";

const NotFound = () => {
  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

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
        <p>
          Oops! The page you're looking for doesn't exist (on this site anyway).
        </p>
        <Link to="/">Go back to the home page</Link>
      </div>
    </PageContent>
  );
};

export default NotFound;
