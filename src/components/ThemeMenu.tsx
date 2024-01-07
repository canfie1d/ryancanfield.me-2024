import { MouseEvent, useState } from "react";
import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { ThemeTypes, themeConfig } from "../contexts/themeConfig";
import Adjustments from "../icons/adjustments.svg?react";
import styles from "../styles/themes.module.scss";
import { createPortal } from "react-dom";

const ThemeMenu = () => {
  const { theme, setTheme } = useThemeContext();
  const [ghData, setGhData] = useState<any>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const themeId = e.currentTarget.id as ThemeTypes;
    setTheme(themeId);
  };

  const handleBonusClick = async () => {
    try {
      const response = await fetch("/api/gh-contributions");

      const data = await response.json();
      setGhData(data);
    } catch (e) {
      console.error(e);
    }
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
    <footer className={classNames(styles.themeMenu)}>
      {ghData &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "#fff",
              overflow: "auto",
              padding: "1rem",
            }}
          >
            <button
              style={{ position: "sticky", top: 0 }}
              onClick={() => setGhData(null)}
            >
              X
            </button>
            <p>{JSON.stringify(ghData)}</p>
          </div>,
          document.body,
          "gh-data"
        )}
      <span className={styles.themeMenuHeader}>
        <button
          style={{
            background: "none",
            padding: 0,
            margin: 0,
            border: 0,
          }}
          onClick={handleBonusClick}
        >
          <Adjustments />
        </button>{" "}
        <span>Theme</span>
      </span>
      <ul>{renderThemeOptions()}</ul>
    </footer>
  );
};

export default ThemeMenu;
