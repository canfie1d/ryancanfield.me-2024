import { useEffect } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { CASE_STUDIES } from "~/data/caseStudies";
import Text from "~/components/Text";

const CaseStudy = ({ id }: { id: string }) => {
  const loadingAchievements = useAchievementStore(
    (store) => store.loadingAchievements
  );
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("so_studious")) {
      addAchievement("so_studious");
    }
  }, [loadingAchievements]);

  const study = CASE_STUDIES.find((item) => item.id === id);

  if (!study) return null;

  return (
    <div className="contentBody">
      <h3>Problem Analysis</h3>
      {study.problem.content.map((paragraph, i) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.problem.images?.map((image, i) => (
        <img key={`image-${i}`} src={image.src} alt="" />
      ))}

      <h3>Solution</h3>
      {study.solution.content.map((paragraph, i) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.solution.images?.map((image, i) => (
        <img key={`image-${i}`} src={image.src} alt="" />
      ))}

      <h3>Result</h3>
      {study.result.content.map((paragraph, i) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.result.images?.map((image, i) => (
        <img key={`image-${i}`} src={image.src} alt="" />
      ))}
    </div>
  );
};

export default CaseStudy;
