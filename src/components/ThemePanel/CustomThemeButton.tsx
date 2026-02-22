import { useAchievementStore } from "~/stores/achievements";
import { useThemeStore } from "~/stores/theme";
import { ThemeType } from "~/data/themeConfig";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import { useState } from "react";
import { hexToRgb } from "~/helpers/hexToRgb";
import { getTextColor } from "~/helpers/getTextColor";
import { rgbToHex } from "~/helpers/rgbToHex";

const NewThemeButton = () => {
  const [isPending, setIsPending] = useState(false);

  const backgroundColors = useThemeStore((store) => store.backgroundColors);
  const lockedColors = useThemeStore((store) => store.lockedColors);
  // const resetLockedColors = useThemeStore((store) => store.resetLockedColors);
  const buildCustomTheme = useThemeStore((store) => store.buildCustomTheme);
  const setTheme = useThemeStore((store) => store.setTheme);

  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);

  const handleSelectNewTheme = async () => {
    if (!hasAchievement("brand_spankin")) {
      addAchievement("brand_spankin");
    }

    const lockedColorPayload: (string | (number[] | null))[] =
      backgroundColors?.map((color) => {
        if (lockedColors?.some((lockedColor) => lockedColor.hex === color)) {
          return hexToRgb(color);
        }
        return "N";
      }) ?? [];

    const body =
      lockedColors?.length && lockedColorPayload.some((c) => c !== "N") ?
        JSON.stringify(lockedColorPayload)
      : undefined;

    setIsPending(true);
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
        name: "custom",
        backgroundColors: hexColors,
        textColors: hexColors.map((color: string) => getTextColor(color)),
      };

      if (lockedColors?.length) {
        newTheme = buildCustomTheme(newTheme);
      }

      setTheme(newTheme);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      id="new-theme"
      variant="transparent"
      disabled={isPending || (lockedColors?.length ?? 0) >= 4}
      onClick={handleSelectNewTheme}
    >
      {isPending ?
        <Loading />
      : lockedColors?.length ?
        "update"
      : "new theme"}
    </Button>
  );
};

export default NewThemeButton;
