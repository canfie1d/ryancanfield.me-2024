import { ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import classNames from "classnames";
import { useThemeStore } from "~/stores/theme";
import { usePageScrollStore } from "~/stores/scroll";
import { useInventoryStore } from "~/stores/inventory";
import AchievementToast from "~/components/AchievementToast";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  const name = useThemeStore((store) => store.name);
  const backgroundColors = useThemeStore((store) => store.backgroundColors);
  const scrolled = usePageScrollStore((store) => store.scrolled);
  const hasSword = useInventoryStore((store) => store.hasItem("sword"));
  const hasKey = useInventoryStore((store) => store.hasItem("key"));
  const { pathname } = useLocation();

  return (
    <div
      style={{
        backgroundColor: backgroundColors ? backgroundColors[4] : "#fff",
      }}
      className={classNames(
        styles.layout,
        name,
        hasSword && name === "eryndor" && "hasSword",
        hasKey && "hasKey",
        pathname === "/" && styles.layoutHome,
        scrolled && styles.layoutScrolled,
        scrolled && "layoutScrolled",
      )}
    >
      <AchievementToast />
      {children}
    </div>
  );
};

export default Layout;
