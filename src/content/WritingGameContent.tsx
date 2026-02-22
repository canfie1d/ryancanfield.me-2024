import { Fragment } from "react";
import { ACHIEVEMENTS } from "~/data/achievements";
import { themeConfig, unlockableThemeConfig } from "~/data/themeConfig";
import { AchievementType, useAchievementStore } from "~/stores/achievements";
import { useAchievements, useUiStrings } from "~/hooks/useSanityContent";

import GameContentBody from "~/components/GameContentBody/GameContentBody";
import Card from "~/components/Card/Card";
import Text from "~/components/Text";

const WritingGameContent = () => {
  const achievements = useAchievementStore((store) => store.achievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const { data: sanityAchievements } = useAchievements();
  const { data: ui } = useUiStrings();
  const achievementsList = (sanityAchievements ?? ACHIEVEMENTS) as AchievementType[];
  const totalAchievements = achievementsList.length;

  return (
    <GameContentBody>
      <Card.Wrapper columns={3}>
        <Card
          pageName="writing"
          title={ui?.cardTitleThemes ?? ""}
          smallTitle
          centerTitle
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >
            {`${themeConfig.length + (hasAchievement("eryndor_mode") ? 1 : 0)}/${themeConfig.length + unlockableThemeConfig.length}`}
          </Text>
        </Card>
        <Card
          pageName="writing"
          title={ui?.cardTitleAchievements ?? "Achievements"}
          smallTitle
          centerTitle
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >{`${achievements.length}/${totalAchievements}`}</Text>
        </Card>
        <Card
          pageName="writing"
          title={ui?.cardTitleLore ?? ""}
          smallTitle
          centerTitle
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "var(--font-large)",
            }}
          >
            {`2/${ui?.loreCountTotal ?? 4}`}
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
    </GameContentBody>
  );
};

export default WritingGameContent;
