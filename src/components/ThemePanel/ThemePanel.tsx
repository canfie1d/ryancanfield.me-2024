import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { useWindowSize } from "~/hooks/useWindowSize";
import { useAchievementStore } from "~/stores/achievements";
import { useThemeStore } from "~/stores/theme";
import ThemeMenu from "./ThemeMenu";
import styles from "./Theme.module.scss";

const ThemePanel = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const lockedColors = useThemeStore((store) => store.lockedColors);

  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (loadingAchievements) return;
    if (!hasAchievement("lock_down") && lockedColors?.length >= 4) {
      addAchievement("lock_down");
    }
    if (!hasAchievement("fully_custom") && lockedColors?.length >= 4) {
      addAchievement("fully_custom");
    }
  }, [lockedColors, addAchievement, hasAchievement, loadingAchievements]);

  return (
    <footer className={styles.themePanel}>
      <ThemeMenu showHeader={pathname === "/" || !isSmallScreen} />
    </footer>
  );
};

export default ThemePanel;
