import { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../contexts/ThemeProvider";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loreTheme } from "../data/themeConfig";
import CodeForm from "../components/Form/CodeForm";
import PageContent from "../content/PageContent";
import Button from "../components/Button";
import Icon from "../components/Icon";
import styles from "./JourneysEnd.module.scss";

const JourneysEnd = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();
  const [params] = useSearchParams();
  const codeParam = params.get("code");
  const navigate = useNavigate();
  const { setTheme } = useThemeContext();
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
          <p>
            Your determination has been rewarded.
            <br />A shiny new theme is available for your collection!
          </p>
        ) : (
          <>
            <p>
              Rondo is available in the theme menu.
              <br />I hope you had as much fun finding this as I had hiding it.
            </p>
            <p>Thanks for participating.</p>
          </>
        )}
        <Button
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
      ref={ref}
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
            <p>This is where your journey ends.</p>
            <p>
              If you've found the code along your travels, enter it here to
              claim your reward.
            </p>
            <CodeForm setLoreButtonActive={setLoreButtonActive} />
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default JourneysEnd;
