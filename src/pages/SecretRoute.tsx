import { useEffect } from "react";
import { useAchievementStore } from "~/stores/achievements";
import PageContent from "~/content/PageContent";
import GameContentBody from "~/components/GameContentBody/GameContentBody";
import Text from "~/components/Text";
import { LORE_WORD } from "~/constants/lore";

type SecretRouteProps = {
  achievementId: "number_cruncher" | "circle_around";
};

const SecretRoute = ({ achievementId }: SecretRouteProps) => {
  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement(achievementId)) {
      addAchievement(achievementId);
    }
  }, [loadingAchievements, addAchievement, hasAchievement, achievementId]);

  return (
    <PageContent
      pageName="journey-to-eryndor"
      header={{
        meta: "①",
        title: "",
        icon: "path",
      }}
    >
      <GameContentBody>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "var(--spacing-unit)",
          }}
        >
          <Text size="large">Input this word at the end:</Text>
          <Text
            size="xlarge"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {LORE_WORD}
          </Text>
        </div>
      </GameContentBody>
    </PageContent>
  );
};

export default SecretRoute;
