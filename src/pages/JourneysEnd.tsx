import { useEffect, useRef, useState } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useNavigate } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { loreTheme } from "~/data/themeConfig";
import { useJourneyContent } from "~/hooks/useSanityContent";
import CodeForm from "~/components/Form/CodeForm";
import GameContentBody from "~/components/GameContentBody/GameContentBody";
import PageContent from "~/content/PageContent";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import PortableText from "~/components/PortableText";
import styles from "./JourneysEnd.module.scss";
import { useThemeStore } from "~/stores/theme";

const JourneysEnd = () => {
  const { data: journey } = useJourneyContent();
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
  const [activating, setActivating] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingAchievements) return;
    if (!codeParam && !hasAchievement("no_code_needed")) {
      addAchievement("no_code_needed");
    }
    if (codeParam && !hasAchievement("the_scenic_route")) {
      addAchievement("the_scenic_route");
    }
    if (hasAchievement("eryndor_mode") && !hasAchievement("crown")) {
      addAchievement("crown");
      const { addItem, hasItem } = useInventoryStore.getState();
      if (hasItem("sword") && !hasItem("sword-jewel")) {
        addItem("sword-jewel");
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
            <Text>{j.thanksParticipating}</Text>
          </>
        }
        <Button
          pageName="journey-to-eryndor"
          disabled={activating}
          onClick={() => {
            if (!hasAchievement("eryndor_mode")) {
              addAchievement("eryndor_mode");
            }
            setTheme(loreTheme);

            if (prefersReducedMotion) {
              navigate({ to: "/" });
              return;
            }

            setActivating(true);
            const overlay = overlayRef.current;
            if (overlay) {
              overlay.style.opacity = "1";
              overlay.style.pointerEvents = "all";
            }
            setTimeout(() => {
              navigate({ to: "/" });
            }, 800);
          }}
        >
          <Icon name="bow" />
          <span>{j.activateButton}</span>
        </Button>
      </div>
    );
  };

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: loreTheme.backgroundColors[0],
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.5s ease",
        }}
      />
      <PageContent
        pageName="journey-to-eryndor"
        header={{
          meta: j.meta ?? "",
          title: j.title ?? "",
          icon: "bow",
        }}
      >
        <GameContentBody>
          {loreButtonActive || hasAchievement("reward_determination") ?
            <>
              {renderRewardUI()}
              {hasAchievement("eryndor_mode") && (
                <div className={styles.loreContent}>
                  {j.story?.length ?
                    <PortableText value={j.story} />
                  : null}
                </div>
              )}
            </>
          : <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {codeParam ?
                <Text>{j.introWithCode}</Text>
              : <Text>{j.introNoCode}</Text>}
              <Text>{j.enterCodePrompt}</Text>
              <CodeForm setLoreButtonActive={setLoreButtonActive} />
            </div>
          }
        </GameContentBody>
      </PageContent>
    </>
  );
};

export default JourneysEnd;
