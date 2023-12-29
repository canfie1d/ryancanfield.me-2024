import { MouseEvent } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useThemeContext } from "../contexts/useThemeProvider";
import { ThemeTypes, themeConfig } from "../contexts/themeConfig";
import Affiliate from "../icons/affiliate.svg?react";
import styles from "../styles/themes.module.scss";

const ThemeMenu = () => {
  const { theme, setTheme } = useThemeContext();
  const { pathname } = useLocation();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const themeId = e.currentTarget.id as ThemeTypes;
    setTheme(themeId);
  };

  const renderThemeOptions = () => {
    const themeOptions = Object.keys(themeConfig).map((themeId) => {
      return (
        <li key={themeId}>
          <button
            id={themeId}
            className={classNames(
              styles.themeButton,
              theme === themeId && styles.themeButtonActive
            )}
            onClick={handleClick}
          >
            {themeId}
          </button>
        </li>
      );
    });

    return themeOptions;
  };

  return (
    <div
      className={classNames(
        styles.themeMenu,
        pathname === "/" && styles.themeMenuActive
      )}
    >
      <span className={styles.themeMenuHeader}>
        <Affiliate /> <span>Theme</span>
      </span>
      <ul>{renderThemeOptions()}</ul>
    </div>
  );
};

export default ThemeMenu;
