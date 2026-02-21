import { useEffect } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useCaseStudies } from "~/hooks/useSanityContent";
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

  const { data: caseStudies } = useCaseStudies();
  const study = caseStudies?.find((item) => item.id === id);

  if (!study) return null;

  return (
    <div className="contentBody">
      <h3>Problem Analysis</h3>
      {study.problem.content.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.problem.images?.map((image: { image: { asset: { url: string } }; caption?: string }, i: number) => (
        <img key={`image-${i}`} src={image.image.asset.url} alt={image.caption ?? ""} />
      ))}

      <h3>Solution</h3>
      {study.solution.content.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.solution.images?.map((image: { image: { asset: { url: string } }; caption?: string }, i: number) => (
        <img key={`image-${i}`} src={image.image.asset.url} alt={image.caption ?? ""} />
      ))}

      <h3>Result</h3>
      {study.result.content.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.result.images?.map((image: { image: { asset: { url: string } }; caption?: string }, i: number) => (
        <img key={`image-${i}`} src={image.image.asset.url} alt={image.caption ?? ""} />
      ))}
    </div>
  );
};

export default CaseStudy;
