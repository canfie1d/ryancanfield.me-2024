import { HexColorPicker } from "react-colorful";
import { getTextColor } from "../helpers/getTextColor";
import { ThemeType } from "../data/themeConfig";
import { useThemeContext } from "../contexts/ThemeProvider";
import useClickOutside from "../hooks/useClickOutside";
import { useRef } from "react";
import classNames from "classnames";
import styles from "./ColorMenu/ColorMenu.module.scss";

const ColorPicker = ({
  active,
  onClose,
  location,
  backgroundColor,
}: {
  active: boolean;
  onClose: () => void;
  location: { top: number | string; left: number | string };
  backgroundColor: string;
}) => {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  const {
    textColors,
    backgroundColors,

    replaceLockedColor,
    setTheme,
  } = useThemeContext();

  const handleColorChange = (value: string) => {
    const indexToReplace = backgroundColors.indexOf(backgroundColor);

    replaceLockedColor(
      { hex: backgroundColor, position: indexToReplace },
      { hex: value, position: indexToReplace }
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
      className={classNames(
        styles.previewColorPicker,
        active && styles.previewColorPickerActive
      )}
    >
      {active && (
        <HexColorPicker
          id={`color-picker-${backgroundColor}`}
          color={backgroundColor}
          onChange={handleColorChange}
        />
      )}
    </div>
  );
};

export default ColorPicker;
