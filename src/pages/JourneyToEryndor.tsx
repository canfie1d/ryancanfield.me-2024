import { useEffect, useState } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useNavigate } from "@tanstack/react-router";
import { loreTheme } from "~/data/themeConfig";
import { useJourneyContent } from "~/hooks/useSanityContent";
import CodeForm from "~/components/Form/CodeForm";
import GameContentBody from "~/components/GameContentBody/GameContentBody";
import PageContent from "~/content/PageContent";
import Button from "~/components/Button";
import DelayedFallback from "~/components/DelayedFallback";
import Loader from "~/components/Loader";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import styles from "./JourneyToEryndor.module.scss";
import { useThemeStore } from "~/stores/theme";

const JourneyToEryndor = () => {
  const { data: journey, isLoading } = useJourneyContent();
  const j = journey ?? {};
  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const searchParams =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const codeParam = searchParams?.get("code") ?? null;
  const navigate = useNavigate();
  const setTheme = useThemeStore((store) => store.setTheme);
  const [loreButtonActive, setLoreButtonActive] = useState<boolean>();

  useEffect(() => {
    if (!loadingAchievements) {
      if (!codeParam) {
        if (!hasAchievement("no_code_needed")) {
          addAchievement("no_code_needed");
        }
      } else if (!hasAchievement("the_scenic_route")) {
        addAchievement("the_scenic_route");
      } else if (hasAchievement("eryndor_mode")) {
        addAchievement("crown");
        const { addItem, hasItem } = useInventoryStore.getState();
        if (hasItem("sword") && !hasItem("sword-jewel")) {
          addItem("sword-jewel");
        }
      }
    }
  }, [loadingAchievements, addAchievement, codeParam, hasAchievement]);

  const renderRewardUI = () => {
    return (
      <div className={styles.loreReward}>
        {(
          !loadingAchievements &&
          hasAchievement("reward_determination") &&
          !hasAchievement("eryndor_mode")
        ) ?
          <Text>
            {j.rewardMessage?.split("\n").map((line: string, i: number) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </Text>
        : <>
            <Text>
              {j.eryndorAvailableMessage?.split("\n").map((line: string, i: number) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </Text>
          </>
        }
        <Button
          pageName="journey-to-eryndor"
          onClick={() => {
            if (!hasAchievement("eryndor_mode")) {
              addAchievement("eryndor_mode");
            }
            setTheme(loreTheme);
            navigate({ to: "/about" });
          }}
        >
          <Icon name="bow" />
          <span>{!hasAchievement("eryndor_mode") ? j.activateButton : j.switchButton}</span>
        </Button>
      </div>
    );
  };

  return (
    <PageContent
      pageName="journey-to-eryndor"
      header={{
        meta: j.meta ?? "",
        title: j.title ?? "",
        icon: "bow",
      }}
    >
      {isLoading ?
        <DelayedFallback>
          <Loader />
        </DelayedFallback>
      : <GameContentBody>
          {loreButtonActive || hasAchievement("reward_determination") ?
            renderRewardUI()
          : <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{j.journeyEndsIntro}</Text>
              <Text>{j.enterCodePrompt}</Text>
              {!codeParam && <Text>{j.noCodeHint}</Text>}
              <CodeForm setLoreButtonActive={setLoreButtonActive} />
            </div>
          }
        </GameContentBody>
      }
    </PageContent>
  );
};

export default JourneyToEryndor;
