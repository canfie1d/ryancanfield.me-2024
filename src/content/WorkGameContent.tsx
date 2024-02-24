import {
  AchievementType,
  useAchievementContext,
} from "../contexts/AchievementProvider";
import { ACHIEVEMENTS } from "../data/achievements";
import Card from "../components/Card";
import Icon from "../components/Icon";

const WorkGameContent = () => {
  const { hasAchievement } = useAchievementContext();

  return (
    <div className="contentBody">
      <Card.Wrapper>
        {ACHIEVEMENTS.map((achievement: AchievementType) => (
          <Card
            type="achievement"
            variant={!hasAchievement(achievement.id) ? "disabled" : undefined}
            key={achievement.id}
            title={achievement.title}
            smallTitle
          >
            {hasAchievement(achievement.id) ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-unit)",
                }}
              >
                <Icon size="large" color="#ff0000" name={achievement.icon} />
                <p style={{ paddingBottom: 0 }}>{achievement.description}</p>
              </div>
            ) : (
              <Icon size="large" name="lock-question" />
            )}
          </Card>
        ))}
      </Card.Wrapper>
    </div>
  );
};

export default WorkGameContent;
