import { useEffect } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useJewelDiscoveryStore } from "~/stores/jewel-discovery";
import { useCaseStudies, useUiStrings } from "~/hooks/useSanityContent";
import { INVENTORY_ITEMS } from "~/data/inventory";
import Text from "~/components/Text";

const CaseStudy = ({ id }: { id: string }) => {
  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const setToast = useAchievementStore((store) => store.setToast);
  const markCaseStudyViewed = useJewelDiscoveryStore((store) => store.markCaseStudyViewed);
  const viewedCaseStudyIds = useJewelDiscoveryStore((store) => store.viewedCaseStudyIds);
  const addItem = useInventoryStore((store) => store.addItem);
  const hasItem = useInventoryStore((store) => store.hasItem);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("so_studious")) {
      addAchievement("so_studious");
    }
  }, [loadingAchievements, addAchievement, hasAchievement]);

  useEffect(() => {
    markCaseStudyViewed(id);
  }, [id, markCaseStudyViewed]);

  useEffect(() => {
    if (
      !loadingAchievements &&
      hasAchievement("all_work_no_play") &&
      viewedCaseStudyIds.length >= 1 &&
      !hasItem("jewel-work")
    ) {
      addItem("jewel-work");
      const jewel = INVENTORY_ITEMS["jewel-work"];
      setToast({
        open: true,
        title: jewel.name,
        message: jewel.description,
      });
    }
  }, [loadingAchievements, hasAchievement, viewedCaseStudyIds.length, hasItem, addItem, setToast]);

  const { data: caseStudies } = useCaseStudies();
  const { data: ui } = useUiStrings();
  const study = caseStudies?.find((item) => item.id === id);

  if (!study) return null;

  return (
    <div className="contentBody">
      <h3>{ui?.caseStudyProblem ?? ""}</h3>
      {study.problem?.content?.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.problem?.images?.map((img, i) => (
        <img
          key={`image-${i}`}
          src={img.src ?? ""}
          alt={img.caption ?? ""}
        />
      ))}

      <h3>{ui?.caseStudySolution ?? ""}</h3>
      {study.solution?.content?.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.solution?.images?.map((img, i) => (
        <img
          key={`image-${i}`}
          src={img.src ?? ""}
          alt={img.caption ?? ""}
        />
      ))}

      <h3>{ui?.caseStudyResult ?? ""}</h3>
      {study.result?.content?.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.result?.images?.map((img, i) => (
        <img
          key={`image-${i}`}
          src={img.src ?? ""}
          alt={img.caption ?? ""}
        />
      ))}
    </div>
  );
};

export default CaseStudy;
