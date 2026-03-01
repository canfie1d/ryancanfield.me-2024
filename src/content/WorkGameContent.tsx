import { ACHIEVEMENTS } from "~/data/achievements";
import { AchievementType, useAchievementStore } from "~/stores/achievements";
import { useAchievements } from "~/hooks/useSanityContent";

import GameContentBody from "~/components/GameContentBody/GameContentBody";
import Card from "~/components/Card";
import Icon from "~/components/Icon";
import Text from "~/components/Text";

const WorkGameContent = () => {
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const { data: sanityAchievements } = useAchievements();
  const achievements = (sanityAchievements ?? ACHIEVEMENTS) as AchievementType[];

  return (
    <GameContentBody>
      <Card.Wrapper>
        {achievements.map((achievement: AchievementType) => (
          <Card
            pageName="work"
            type="achievement"
            variant={!hasAchievement(achievement.id) ? "disabled" : undefined}
            key={achievement.id}
            title={achievement.title}
            smallTitle
          >
            {hasAchievement(achievement.id) ?
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-unit)",
                }}
              >
                <Icon
                  size="large"
                  color="#ff0000"
                  name={achievement.icon}
                />
                <Text style={{ paddingBottom: 0 }}>{achievement.description}</Text>
              </div>
            : <Icon
                size="large"
                name="lock-question"
              />
            }
          </Card>
        ))}
      </Card.Wrapper>
    </GameContentBody>
  );
};

export default WorkGameContent;
