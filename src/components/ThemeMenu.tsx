import { useEffect, useState } from "react";
import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { useWindowSize } from "../hooks/useWindowSize";
import { useLocation } from "react-router-dom";
import { ThemeType, themeConfig } from "../data/themeConfig";
import { hexToRgb } from "../helpers/hexToRgb";
import { getTextColor } from "../helpers/getTextColor";
import { rgbToHex } from "../helpers/rgbToHex";
import PaletteIcon from "../icons/palette.svg?react";
import LockIcon from "../icons/lock.svg?react";
import styles from "../styles/themes.module.scss";

const ThemeMenu = () => {
  const {
    name,
    backgroundColors,
    setTheme,
    lockedColors,
    resetLockedColors,
    buildCustomTheme,
  } = useThemeContext();
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const [themeMenuActive, setThemeMenuActive] = useState(false);

  useEffect(() => {
    if (pathname === "/" && width > 768) {
      setThemeMenuActive(true);
    } else {
      setThemeMenuActive(false);
    }
  }, [pathname]);

  const handleSelectKnownTheme = (index: number) => {
    let newTheme = themeConfig[index];

    if (lockedColors?.length) {
      newTheme = buildCustomTheme(themeConfig[index]);
    }

    setTheme(newTheme);
  };

  const handleSelectNewTheme = async () => {
    // Avail. models: "ui", "makoto_shinkai","metroid_fusion","akira_film","flower_photography"
    // Use N to get suggested colors [[44,43,44],[90,83,82],"N","N","N"]
    const lockedColorPayload: (string | (number[] | null))[] = backgroundColors
      ?.map((color) => {
        const colors = [];
        if (lockedColors?.some((lockedColor) => lockedColor.hex === color)) {
          colors.push(hexToRgb(color));
        } else {
          colors.push("N");
        }
        return colors;
      })
      .flat();

    let body = lockedColors?.length
      ? JSON.stringify(lockedColorPayload)
      : undefined;

    if (
      // Fixes bug where lockedColors is an array of "N"
      // instead of an empty array when all colors are unlocked
      body &&
      JSON.parse(body)?.filter((color: string) => {
        return color !== "N";
      }).length === 0
    ) {
      resetLockedColors();
      body = undefined;
    }

    try {
      const bgResponse = await fetch("/api/theme-picker", {
        method: "POST",
        body: body,
      });

      const rgbColors = await bgResponse.json();

      if (rgbColors.msg) throw new Error(rgbColors.msg);

      const hexColors = rgbColors.result
        .map((color: [r: string, g: string, b: string]) => rgbToHex(color))
        .toReversed();

      let newTheme: ThemeType = {
        name: "random",
        backgroundColors: hexColors,
        textColors: hexColors.map((color: string) => getTextColor(color)),
      };

      if (lockedColors?.length) {
        newTheme = buildCustomTheme(newTheme);
      }

      setTheme(newTheme);
    } catch (error) {
      console.error(error);
    }
  };

  const renderThemeOptions = () => {
    const themeOptions = themeConfig.map((theme, i) => {
      return (
        <li key={theme.name}>
          <button
            id={theme.name}
            className={classNames(
              styles.themeButton,
              name === theme.name && styles.themeButtonActive
            )}
            disabled={lockedColors?.length >= 4}
            onClick={() => handleSelectKnownTheme(i)}
          >
            {theme.name}
          </button>
        </li>
      );
    });

    themeOptions.push(
      <li key="custom">
        <button
          id="custom"
          className={classNames(
            styles.themeButton,
            name === "custom" && styles.themeButtonActive
          )}
          disabled={lockedColors?.length >= 4}
          onClick={handleSelectNewTheme}
        >
          {lockedColors?.length ? "Update" : "New"}
        </button>
      </li>
    );

    return themeOptions;
  };

  return (
    <footer
      className={classNames(
        styles.themeMenu,
        themeMenuActive && styles.themeMenuActive
      )}
    >
      <span className={styles.themeMenuHeader}>
        {/* <Adjustments /> */}
        <PaletteIcon />
        <span>Themes</span>
      </span>
      {lockedColors?.length >= 4 && (
        <p className={styles.themeMenuMessage}>
          <LockIcon />
          To change your theme unlock at least one color.
        </p>
      )}
      <ul>{renderThemeOptions()}</ul>
    </footer>
  );
};

export default ThemeMenu;
