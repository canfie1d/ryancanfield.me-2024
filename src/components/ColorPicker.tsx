import { useRef } from "react";
import { HexColorPicker } from "react-colorful";
import classNames from "classnames";
import { ThemeType } from "~/data/themeConfig";
import { getTextColor } from "~/helpers/getTextColor";
import useClickOutside from "~/hooks/useClickOutside";
import styles from "./ColorMenu/ColorMenu.module.scss";
import { useThemeStore } from "~/stores/theme";
import { useAchievementStore } from "~/stores/achievements";

type ColorPickerProps = {
  active: boolean;
  onClose: () => void;
  location: {
    top: number | string;
    left: number | string;
  };
  backgroundColor: string;
};

const ColorPicker = ({ active, onClose, location, backgroundColor }: ColorPickerProps) => {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  const textColors = useThemeStore((store) => store.textColors);
  const backgroundColors = useThemeStore((store) => store.backgroundColors);
  const replaceLockedColor = useThemeStore((store) => store.replaceLockedColor);
  const setTheme = useThemeStore((store) => store.setTheme);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);

  const handleColorChange = (value: string) => {
    if (!hasAchievement("custom")) {
      addAchievement("custom");
    }
    const indexToReplace = backgroundColors.indexOf(backgroundColor);

    replaceLockedColor(
      { hex: backgroundColor, position: indexToReplace },
      { hex: value, position: indexToReplace },
    );

    const newBgColors = [...backgroundColors];
    newBgColors.splice(indexToReplace, 1, value);

    const newTextColors = [...textColors];
    newTextColors.splice(indexToReplace, 1, getTextColor(value));

    const newTheme: ThemeType = {
      name: "custom",
      backgroundColors: newBgColors,
      textColors: newTextColors,
    };

    setTheme(newTheme);
  };

  return (
    <div
      ref={ref}
      style={{ top: location.top, left: location.left }}
      className={classNames(styles.previewColorPicker, active && styles.previewColorPickerActive)}
    >
      <HexColorPicker
        id={`color-picker-${backgroundColor}`}
        color={backgroundColor}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ColorPicker;
