import { Fragment } from "react";
import {
  AchievementType,
  useAchievementContext,
} from "../contexts/AchievementProvider";
import { ACHIEVEMENTS } from "../data/achievements";
import { themeConfig, unlockableThemeConfig } from "../data/themeConfig";
import Card from "../components/Card/Card";

const WritingGameContent = () => {
  const { achievements, hasAchievement } = useAchievementContext();

  return (
    <div className="contentBody">
      <Card.Wrapper columns={3}>
        <Card title="Themes" smallTitle centerTitle>
          <p
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >
            {`${themeConfig.length + (hasAchievement("rondo_mode") ? 1 : 0)}/${themeConfig.length + unlockableThemeConfig.length}`}
          </p>
        </Card>
        <Card title="Achievements" smallTitle centerTitle>
          <p
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >{`${achievements.length}/${ACHIEVEMENTS.length}`}</p>
        </Card>
        <Card title="Lore" smallTitle centerTitle>
          <p
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >
            2/4
          </p>
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
