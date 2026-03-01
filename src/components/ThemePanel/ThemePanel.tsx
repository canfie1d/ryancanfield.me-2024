import { useLocation } from "@tanstack/react-router";
import { useWindowSize } from "~/hooks/useWindowSize";
import ThemeMenu from "./ThemeMenu";
import styles from "./Theme.module.scss";

const ThemePanel = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;

  return (
    <footer className={styles.themePanel}>
      <ThemeMenu showHeader={pathname === "/" || !isSmallScreen} />
    </footer>
  );
};

export default ThemePanel;
