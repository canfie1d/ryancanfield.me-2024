import { ThemeType, loreTheme, themeConfig } from "../../data/themeConfig";
import { useThemeContext } from "../../contexts/ThemeProvider";
import { useAchievementContext } from "../../contexts/AchievementProvider";
import { hexToRgb } from "../../helpers/hexToRgb";
import { getTextColor } from "../../helpers/getTextColor";
import { rgbToHex } from "../../helpers/rgbToHex";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./Theme.module.scss";

const ThemeMenu = ({ showHeader }: { showHeader: boolean }) => {
  const {
    name,
    backgroundColors,
    setTheme,
    lockedColors,
    resetLockedColors,
    buildCustomTheme,
  } = useThemeContext();

  const { hasAchievement, addAchievement } = useAchievementContext();

  const handleSelectKnownTheme = (index: number) => {
    console.log("handleSelectKnownTheme");
    if (!hasAchievement("fresh_coat")) {
      addAchievement("fresh_coat");
    }

    if (index === -1 && hasAchievement("reward_determination")) {
      setTheme(loreTheme);
      resetLockedColors();
      return null;
    }

    let newTheme = themeConfig[index];
    console.log("newTheme: ", newTheme);

    if (lockedColors?.length) {
      newTheme = buildCustomTheme(themeConfig[index]);
    }

    setTheme(newTheme);
  };

  const handleSelectNewTheme = async () => {
    if (!hasAchievement("brand_spankin")) {
      addAchievement("brand_spankin");
    }
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
          <Button
            id={theme.name}
            active={name === theme.name}
            className={styles.themeButton}
            disabled={lockedColors?.length >= 4}
            onClick={() => handleSelectKnownTheme(i)}
          >
            {theme.name}
          </Button>
        </li>
      );
    });

    if (hasAchievement("the_journey_begins"))
      themeOptions.push(
        <li key="rondo">
          <Button
            id="rondo"
            title="Unlock by finding the journey's end"
            active={name === "rondo"}
            className={styles.themeButton}
            disabled={!hasAchievement("reward_determination")}
            onClick={() => handleSelectKnownTheme(-1)}
          >
            <Icon name="bow" size="x-small" />
            <span>
              <em>Rondo</em>
            </span>
          </Button>
        </li>
      );

    themeOptions.push(
      <li key="custom">
        <Button
          id="custom"
          active={name === "custom"}
          className={styles.themeButton}
          disabled={lockedColors?.length >= 4}
          onClick={handleSelectNewTheme}
        >
          {lockedColors?.length ? "update" : "new"}
        </Button>
      </li>
    );

    return themeOptions;
  };

  return (
    <div className={styles.themeMenu}>
      {showHeader && (
        <span className={styles.themeMenuHeader}>
          <Icon name="palette" size="small" />
          <span>themes</span>
        </span>
      )}
      {lockedColors?.length >= 4 && (
        <p className={styles.themeMenuMessage}>
          <Icon name="lock" />
          To change your theme unlock at least one color.
        </p>
      )}
      <ul>{renderThemeOptions()}</ul>
    </div>
  );
};

export default ThemeMenu;
