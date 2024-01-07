import { MouseEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { ThemeTypes, themeConfig } from "../contexts/themeConfig";
import Adjustments from "../icons/adjustments.svg?react";
import styles from "../styles/themes.module.scss";
import { createPortal } from "react-dom";
import { drawContributions } from "github-contributions-canvas";

const ThemeMenu = () => {
  const canvasRef = useRef(null);
  const { theme, setTheme } = useThemeContext();
  const [ghData, setGhData] = useState<any>(null);

  useEffect(() => {
    if (canvasRef.current && ghData) {
      drawContributions(canvasRef.current, {
        data: ghData.data,
        username: "canfie1d",
        themeName: "standard",
        fontFace: "Nunito",
      });
    }
  }, [ghData]);
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
            <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
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
