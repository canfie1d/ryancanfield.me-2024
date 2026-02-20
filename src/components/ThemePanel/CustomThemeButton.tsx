import { ThemeType } from "~/data/themeConfig";
import { useThemeStore } from "~/stores/theme";
import { getTextColor } from "~/helpers/getTextColor";
import { rgbToHex } from "~/helpers/rgbToHex";
import Button from "~/components/Button";
import classNames from "classnames";
import styles from "./Theme.module.scss";
import { hexToRgb } from "~/helpers/hexToRgb";
import { useAchievementStore } from "~/stores/achievements";

const NewThemeButton = () => {
  const resetLockedColors = useThemeStore((store) => store.resetLockedColors);
  const buildCustomTheme = useThemeStore((store) => store.buildCustomTheme);
  const setTheme = useThemeStore((store) => store.setTheme);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const lockedColors = useThemeStore((store) => store.lockedColors);
  const backgroundColors = useThemeStore((store) => store.backgroundColors);
  const themeName = useThemeStore((store) => store.name);

  const handleSelectNewTheme = async () => {
    if (!hasAchievement("brand_spankin")) {
      addAchievement("brand_spankin");
    }
    // Avail. models: "ui", "makoto_shinkai","metroid_fusion","akira_film","flower_photography"
    // Use N to get suggested colors [[44,43,44],[90,83,82],"N","N","N"]
    const lockedColorPayload: (string | (number[] | null))[] = backgroundColors
      ?.map((color: string) => {
        const colors: (number[] | string)[] = [];
        if (lockedColors?.some((lockedColor) => lockedColor.hex === color)) {
          const rgb = hexToRgb(color);
          if (rgb) {
            colors.push(rgb);
          }
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
      // For some reason I decided to use .filter and check the length
      // instead of using .some or .every
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

  return (
    <Button
      id="custom"
      active={themeName === "custom"}
      className={classNames(
        styles.themeButton,
        themeName === "custom" && styles.themeButtonActive
      )}
      disabled={lockedColors?.length >= 4}
      onClick={handleSelectNewTheme}
      variant="transparent"
    >
      {lockedColors?.length ? "update" : "new theme"}
    </Button>
  );
};

export default NewThemeButton;
