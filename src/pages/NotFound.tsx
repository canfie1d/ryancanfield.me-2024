import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useUiStrings } from "~/hooks/useSanityContent";
import PageContent from "~/content/PageContent";
import Text from "~/components/Text";

const NotFound = () => {
  const { data: ui } = useUiStrings();

  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const addItem = useInventoryStore((store) => store.addItem);
  const hasItem = useInventoryStore((store) => store.hasItem);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("lost_and_found")) {
      addAchievement("lost_and_found");
    }
  }, [loadingAchievements, hasAchievement, addAchievement]);

  useEffect(() => {
    if (!loadingAchievements && hasAchievement("lost_and_found") && !hasItem("note")) {
      addItem("note");
    }
  }, [loadingAchievements, hasAchievement, hasItem, addItem]);

  return (
    <PageContent
      pageName="404"
      header={{
        meta: String(ui?.notFoundMeta ?? ""),
        title: String(ui?.notFoundTitle ?? ""),
        icon: "at",
      }}
    >
      <div
        style={{ textAlign: "center" }}
        className="contentBody"
      >
        <Text>{ui?.notFoundMessage ?? ""}</Text>
        <Link to="/">{ui?.notFoundLink ?? ""}</Link>
      </div>
    </PageContent>
  );
};

export default NotFound;
