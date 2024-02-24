import { useEffect } from "react";
import { useThemeContext } from "../../contexts/ThemeProvider";
import { useAchievementContext } from "../../contexts/AchievementProvider";
import ThemeMenu from "./ThemeMenu";
import styles from "./Theme.module.scss";
import { useLocation, useWindowSize } from "react-use";

const ThemePanel = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const { lockedColors } = useThemeContext();

  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

  useEffect(() => {
    if (
      !loadingAchievements &&
      !hasAchievement("lock_down") &&
      lockedColors?.length >= 4
    ) {
      addAchievement("lock_down");
    }
  }, [lockedColors]);

  return (
    <footer className={styles.themePanel}>
      <ThemeMenu showHeader={pathname === "/" || !isSmallScreen} />
    </footer>
  );
};

export default ThemePanel;
