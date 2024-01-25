import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { ThemeType, themeConfig } from "../data/themeConfig";
import Adjustments from "../icons/adjustments.svg?react";
import { hexToRgb } from "../helpers/hexToRgb";
import { getTextColor } from "../helpers/getTextColor";
import { rgbToHex } from "../helpers/rgbToHex";
import styles from "../styles/themes.module.scss";
import { useMutation } from "@tanstack/react-query";

const getColors = async (payload: any) => {
  const body = { ...payload, model: "ui" };
  return await fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

const ThemeMenu = () => {
  const colorApi = useMutation({
    mutationFn: getColors,
    onSuccess: (resp) => {
      if (resp.msg) throw new Error(resp.msg);

      const hexColors = resp.result
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
    },
  });

  const {
    name,
    backgroundColors,
    setTheme,
    lockedColors,
    resetLockedColors,
    buildCustomTheme,
  } = useThemeContext();

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
      // temporary fix for bug where lockedColors is an array of "N"
      // instead of an empty array when all colors are unlocked
      body &&
      JSON.parse(body)?.filter((color: string) => {
        return color !== "N";
      }).length === 0
    ) {
      resetLockedColors();
      body = undefined;
    }

    colorApi.mutate(body);
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
          {lockedColors?.length ? "Update Theme" : "New Theme"}
        </button>
      </li>
    );

    return themeOptions;
  };

  return (
    <footer className={classNames(styles.themeMenu)}>
      <span className={styles.themeMenuHeader}>
        <Adjustments />
        <span>Theme</span>
      </span>
      {lockedColors?.length >= 4 && (
        <p
          style={{
            fontSize: "1rem",
            padding: ".5rem 1rem",
            margin: "1rem -1rem .5rem",
            background: "#eee",
          }}
        >
          To change your theme unlock at least one color.
        </p>
      )}
      <ul>{renderThemeOptions()}</ul>
    </footer>
  );
};

export default ThemeMenu;
