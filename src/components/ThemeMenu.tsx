import { MouseEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { ThemeTypes, themeConfig } from "../contexts/themeConfig";
import { drawContributions } from "github-contributions-canvas";
import { createPortal } from "react-dom";
import Adjustments from "../icons/adjustments.svg?react";
import CircleX from "../icons/circle-x.svg?react";
import styles from "../styles/themes.module.scss";
import Modal from "./Modal";

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
      {createPortal(
        <Modal
          show={!!ghData}
          header={
            <>
              <h2>GitHub Contributions</h2>
              <button
                className={styles.hiddenButton}
                onClick={() => setGhData(null)}
              >
                <CircleX />
              </button>
            </>
          }
        >
          <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
        </Modal>,
        document.body,
        "gh-data"
      )}
      <span className={styles.themeMenuHeader}>
        <button className={styles.hiddenButton} onClick={handleBonusClick}>
          <Adjustments />
        </button>{" "}
        <span>Theme</span>
      </span>
      <ul>{renderThemeOptions()}</ul>
    </footer>
  );
};

export default ThemeMenu;
