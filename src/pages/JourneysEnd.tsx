import { useEffect, useState } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loreTheme } from "~/data/themeConfig";
import CodeForm from "~/components/Form/CodeForm";
import PageContent from "~/content/PageContent";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import styles from "./JourneysEnd.module.scss";
import { useThemeStore } from "~/stores/theme";

const JourneysEnd = () => {
  const loadingAchievements = useAchievementStore(
    (store) => store.loadingAchievements
  );
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const [params] = useSearchParams();
  const codeParam = params.get("code");
  const navigate = useNavigate();
  const setTheme = useThemeStore((store) => store.setTheme);
  const [loreButtonActive, setLoreButtonActive] = useState<boolean>();

  useEffect(() => {
    if (!loadingAchievements) {
      if (!codeParam) {
        if (!hasAchievement("no_code_needed")) {
          addAchievement("no_code_needed");
        }
      } else {
        if (!hasAchievement("the_scenic_route")) {
          addAchievement("the_scenic_route");
        }
      }
    }
  }, [loadingAchievements]);

  const renderRewardUI = () => {
    return (
      <div className={styles.loreReward}>
        {!loadingAchievements &&
        hasAchievement("reward_determination") &&
        !hasAchievement("rondo_mode") ? (
          <Text>
            Your determination has been rewarded.
            <br />A shiny new theme is available for your collection!
          </Text>
        ) : (
          <>
            <Text>
              Rondo is available in the theme menu.
              <br />I hope you had as much fun finding this as I had hiding it.
            </Text>
            <Text>Thanks for participating.</Text>
          </>
        )}
        <Button
          pageName="journeys-end"
          onClick={() => {
            if (!hasAchievement("rondo_mode")) {
              addAchievement("rondo_mode");
            }
            setTheme(loreTheme);
            navigate("/");
          }}
        >
          <Icon name="bow" />
          <span>Activate Rondo</span>
        </Button>
      </div>
    );
  };

  return (
    <PageContent
      pageName="journeys-end"
      header={{
        meta: "﹖﹖﹖﹖",
        title: "Journey's End",
        icon: "bow",
      }}
    >
      <div className="contentBody">
        {loreButtonActive || hasAchievement("reward_determination") ? (
          renderRewardUI()
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>This is where your journey ends.</Text>
            <Text>
              If you've found the code along your travels, enter it here to
              claim your reward.
            </Text>
            <CodeForm setLoreButtonActive={setLoreButtonActive} />
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default JourneysEnd;
