import { PageNames, pageNames } from "~/data/themeConfig";
import { useThemeStore } from "~/stores/theme";
import { getTextColor } from "./getTextColor";

export const useGetColorsFromTheme = (pageName: PageNames) => {
  const textColors = useThemeStore((store) => store.textColors);
  const backgroundColors = useThemeStore((store) => store.backgroundColors);
  const indexOfPage = pageNames.indexOf(pageName);

  const backgroundColor = backgroundColors
    ? backgroundColors[indexOfPage]
    : "#89AAC0";

  const textColor = textColors
    ? textColors[indexOfPage]
    : getTextColor("#89AAC0");

  return { backgroundColor, textColor };
};
