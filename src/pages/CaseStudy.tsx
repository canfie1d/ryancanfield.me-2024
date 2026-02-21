import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAchievementStore } from "~/stores/achievements";
import { getCaseStudy } from "~/lib/sanityQueries";
import Text from "~/components/Text";

const CaseStudy = ({ id }: { id: string }) => {
  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  const { data: study, isLoading } = useQuery({
    queryKey: ["sanity", "caseStudy", id],
    queryFn: () => getCaseStudy(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("so_studious")) {
      addAchievement("so_studious");
    }
  }, [loadingAchievements]);

  if (isLoading || !study) return null;

  return (
    <div className="contentBody">
      <h3>Problem Analysis</h3>
      {study.problem?.content?.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.problem?.images?.map((image: { src: string }, i: number) => (
        <img
          key={`image-${i}`}
          src={image.src}
          alt=""
        />
      ))}

      <h3>Solution</h3>
      {study.solution?.content?.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.solution?.images?.map((image: { src: string }, i: number) => (
        <img
          key={`image-${i}`}
          src={image.src}
          alt=""
        />
      ))}

      <h3>Result</h3>
      {study.result?.content?.map((paragraph: string, i: number) => (
        <Text key={`paragraph-${i}`}>{paragraph}</Text>
      ))}
      {study.result?.images?.map((image: { src: string }, i: number) => (
        <img
          key={`image-${i}`}
          src={image.src}
          alt=""
        />
      ))}
    </div>
  );
};

export default CaseStudy;
