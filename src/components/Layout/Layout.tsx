import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { useThemeContext } from "../../contexts/ThemeProvider";
import { usePageScrollContext } from "../../contexts/PageScrollProvider";
import styles from "./Layout.module.scss";

const Layout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { backgroundColors } = useThemeContext();
  const { scrolled } = usePageScrollContext();
  const { pathname } = useLocation();

  return (
    <div
      style={{
        backgroundColor: backgroundColors ? backgroundColors[4] : "#fff",
      }}
      className={classNames(
        styles.layout,
        className,
        pathname === "/" && styles.layoutHome,
        scrolled && styles.layoutScrolled,
        scrolled && "layoutScrolled"
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
