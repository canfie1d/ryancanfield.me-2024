import { loreTheme, themeConfig } from "~/data/themeConfig";
import { useAchievementStore } from "~/stores/achievements";
import { useThemeStore } from "~/stores/theme";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import classNames from "classnames";
import styles from "./Theme.module.scss";
import { Link } from "react-router-dom";
import { useGameModeStore } from "~/stores/game-mode";
import { useEffect } from "react";
// import CustomThemeButton from "./CustomThemeButton";

const ThemeMenu = ({ showHeader }: { showHeader: boolean }) => {
  const themeName = useThemeStore((store) => store.name);
  const setTheme = useThemeStore((store) => store.setTheme);
  const lockedColors = useThemeStore((store) => store.lockedColors);
  const resetLockedColors = useThemeStore((store) => store.resetLockedColors);
  const buildCustomTheme = useThemeStore((store) => store.buildCustomTheme);
  const backgroundColors = useThemeStore((store) => store.backgroundColors);
  const cursor = useGameModeStore((store) => store.cursor);
  const resetGameModes = useGameModeStore((store) => store.resetGameModes);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const setAllGameModesActive = useGameModeStore(
    (store) => store.setAllGameModesActive
  );

  useEffect(() => {
    const cursorImage = window.getComputedStyle(document.body).getPropertyValue('cursor');

    if (cursorImage !== 'auto' && cursor === 'default') {
      document.body.style.cursor = 'auto';
    } else {
      document.body.style.cursor = 'auto';
    }

  }, [cursor]);

  const handleSelectKnownTheme = (index: number) => {
    // index === -1 is "eryndor"
    if (index === -1 && hasAchievement("reward_determination")) {
      setTheme(loreTheme);
      resetLockedColors();
      setAllGameModesActive();
      return;
    }

    if (!hasAchievement("fresh_coat")) {
      addAchievement("fresh_coat");
    }

    let newTheme = themeConfig[index];

    if (lockedColors?.length) {
      newTheme = buildCustomTheme(themeConfig[index]);
    }

    resetGameModes();
    setTheme(newTheme);
  };

  const renderThemeOptions = () => {
    const themeOptions = themeConfig.map((theme, i) => {
      return (
        <li
          key={theme.name}
          title={
            lockedColors?.length >= 4
              ? "To change your theme unlock at least one color."
              : ""
          }
        >
          <Button
            id={theme.name}
            variant="transparent"
            active={themeName === theme.name}
            style={
              themeName === theme.name
                ? {
                    background: `linear-gradient(to right, ${backgroundColors.slice(0, 3).join(", ")})`,
                  }
                : {}
            }
            className={classNames(
              styles.themeButton,
              theme.name === "léon" && styles.themeButtonDark,
              themeName === theme.name && styles.themeButtonActive
            )}
            disabled={lockedColors?.length >= 4}
            onClick={() => handleSelectKnownTheme(i)}
          >
            {theme.name}
          </Button>
        </li>
      );
    });

    // themeOptions.push(
    //   <li key="custom">
    //     <CustomThemeButton />
    //   </li>
    // );

    if (hasAchievement("the_journey_begins")) {
      themeOptions.push(
        <li key="eryndor">
          {!hasAchievement("reward_determination") && (
            <Link to="/journey-to-eryndor">
              <span className="sr_only">
                Completing the journey is the only way
              </span>
            </Link>
          )}
          <Button
            id="eryndor"
            title={
              !hasAchievement("reward_determination")
                ? "Completing the journey is the only way"
                : ""
            }
            active={themeName === "eryndor"}
            style={
              themeName === "eryndor"
                ? {
                    background: `linear-gradient(to right, ${backgroundColors.join(", ")})`,
                    color: "var(--off-white)",
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.6)",
                  }
                : {}
            }
            className={classNames(
              styles.themeButton,
              themeName !== "eryndor" && styles.themeButtonEryndor,
              themeName === "eryndor" && styles.themeButtonActive
            )}
            disabled={!hasAchievement("reward_determination")}
            onClick={() => handleSelectKnownTheme(-1)}
          >
            <Icon name="bow" size="x-small" />
            <span>
              <em>Eryndor</em>
            </span>
          </Button>
        </li>
      );
    }

    return themeOptions;
  };

  const allColorsLocked = lockedColors?.length === 4;

  if (allColorsLocked && !hasAchievement("fully_custom")) {
    addAchievement("fully_custom");
  }

  return (
    <div className={styles.themeMenu}>
      {showHeader && (
        <span className={styles.themeMenuHeader}>
          <Icon name="spray" />
          <span>themes</span>
        </span>
      )}
      <ul>{renderThemeOptions()}</ul>
    </div>
  );
};

export default ThemeMenu;
