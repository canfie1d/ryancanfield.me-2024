import { useEffect } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { CASE_STUDIES } from "../data/caseStudies";

const CaseStudy = ({ id }: { id: string }) => {
  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

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
        <p key={`paragraph-${i}`}>{paragraph}</p>
      ))}
      {study.problem.images?.map((image, i) => (
        <img key={`image-${i}`} src={image.src} alt="" />
      ))}

      <h3>Solution</h3>
      {study.solution.content.map((paragraph, i) => (
        <p key={`paragraph-${i}`}>{paragraph}</p>
      ))}
      {study.solution.images?.map((image, i) => (
        <img key={`image-${i}`} src={image.src} alt="" />
      ))}

      <h3>Result</h3>
      {study.result.content.map((paragraph, i) => (
        <p key={`paragraph-${i}`}>{paragraph}</p>
      ))}
      {study.result.images?.map((image, i) => (
        <img key={`image-${i}`} src={image.src} alt="" />
      ))}
    </div>
  );
};

export default CaseStudy;
