import { Fragment } from "react";
import { ACHIEVEMENTS } from "~/data/achievements";
import { themeConfig, unlockableThemeConfig } from "~/data/themeConfig";
import { AchievementType, useAchievementStore } from "~/stores/achievements";

import Card from "~/components/Card/Card";
import Text from "~/components/Text";

const WritingGameContent = () => {
  const achievements = useAchievementStore((store) => store.achievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);

  return (
    <div className="contentBody">
      <Card.Wrapper columns={3}>
        <Card pageName="writing" title="Themes" smallTitle centerTitle>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >
            {`${themeConfig.length + (hasAchievement("rondo_mode") ? 1 : 0)}/${themeConfig.length + unlockableThemeConfig.length}`}
          </Text>
        </Card>
        <Card pageName="writing" title="Achievements" smallTitle centerTitle>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >{`${achievements.length}/${ACHIEVEMENTS.length}`}</Text>
        </Card>
        <Card pageName="writing" title="Lore" smallTitle centerTitle>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >
            2/4
          </Text>
        </Card>
      </Card.Wrapper>
      <code className="code">
        {achievements.map((achievement: AchievementType) => (
          <Fragment key={achievement.id}>
            {achievement.collectedDate}: {achievement.title}
            <br />
          </Fragment>
        ))}
      </code>
    </div>
  );
};

export default WritingGameContent;
