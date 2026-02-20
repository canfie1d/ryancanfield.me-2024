import { ACHIEVEMENTS } from "~/data/achievements";
import { AchievementType, useAchievementStore } from "~/stores/achievements";

import Card from "~/components/Card";
import Icon from "~/components/Icon";
import Text from "~/components/Text";

const WorkGameContent = () => {
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);

  return (
    <div className="contentBody">
      <Text>
        Fourty achievements await you in Eryndor, each a mark of your valor and
        wisdom. From the Chalice of the First Dawn to the Crown of the Eternal
        Glade, these triumphs weave your tale into the realm's eternal tapestry.
        Seek them out, and let your legacy shine.
      </Text>
      <Card.Wrapper>
        {ACHIEVEMENTS.map((achievement: AchievementType) => (
          <Card
            pageName="work"
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
                <Text style={{ paddingBottom: 0 }}>
                  {achievement.description}
                </Text>
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
