import { useEffect, useRef, useState } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReducedMotion } from "motion/react";
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
    }
  }, [loadingAchievements]);

  const renderRewardUI = () => {
    return (
      <div className={styles.loreReward}>
        {!loadingAchievements &&
        hasAchievement("reward_determination") &&
        !hasAchievement("eryndor_mode") ? (
          <Text>
            Your determination has been rewarded.
            <br />A shiny new theme is available for your collection!
          </Text>
        ) : (
          <>
            <Text>
              Eryndor is available in the theme menu.
              <br />I hope you had as much fun finding this as I had hiding it.
            </Text>
            <Text>Thanks for participating.</Text>
          </>
        )}
        <Button
          pageName="journey-to-eryndor"
          disabled={activating}
          onClick={() => {
            if (!hasAchievement("eryndor_mode")) {
              addAchievement("eryndor_mode");
            }
            setTheme(loreTheme);

            if (prefersReducedMotion) {
              navigate("/");
              return;
            }

            setActivating(true);
            const overlay = overlayRef.current;
            if (overlay) {
              overlay.style.opacity = "1";
              overlay.style.pointerEvents = "all";
            }
            setTimeout(() => {
              navigate("/");
            }, 800);
          }}
        >
          <Icon name="bow" />
          <span>Activate Eryndor</span>
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
        meta: "﹖﹖﹖﹖",
        title: "Journey's End",
        icon: "bow",
      }}
    >
      <div className="contentBody">
        {loreButtonActive || hasAchievement("reward_determination") ? (
          <>
            {renderRewardUI()}
            {hasAchievement("eryndor_mode") && (
              <div className={styles.loreContent}>
                <Text>
                  <em>
                    The following is a story. It is not about code. Or maybe it
                    is — you can decide.
                  </em>
                </Text>
                <Text>
                  There was once a traveler who spent a long time building a
                  road that no one was meant to finish. Not because it was
                  cruel, but because the builder never believed anyone would
                  bother. Roads like that have a way of proving their builders
                  wrong.
                </Text>
                <Text>
                  You bothered. You found the clues, typed the commands, and
                  followed a trail that was only half-lit. That says something
                  about you — patience, maybe, or the kind of curiosity that
                  doesn't turn off when it's supposed to.
                </Text>
                <Text>
                  The theme you've unlocked is called Eryndor. It's a place
                  that only appears to those who look for it — you go somewhere
                  new, but you always come back. That felt right for a site
                  that asked you to keep exploring and then led you home.
                </Text>
                <Text>
                  Thanks for walking the road.
                  <br />
                  <em>— Ryan</em>
                </Text>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {codeParam ? (
              <Text>
                You actually did it. You followed the clues, found the code,
                and made it all the way here. I genuinely didn't expect everyone
                to go this far — but here you are.
              </Text>
            ) : (
              <Text>
                You got here fast. Maybe you knew where you were going, or maybe
                you were just wandering and got lucky. Either way — welcome.
              </Text>
            )}
            <Text>
              If you've found the code along your travels, enter it here to
              claim your reward.
            </Text>
            <CodeForm setLoreButtonActive={setLoreButtonActive} />
          </div>
        )}
      </div>
    </PageContent>
    </>
  );
};

export default JourneysEnd;
