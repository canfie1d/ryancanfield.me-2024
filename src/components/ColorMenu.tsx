import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { getTextColor } from "../helpers/getTextColor";
import { ThemeType } from "../data/themeConfig";
import useClickOutside from "../hooks/useClickOutside";
import Lock from "../icons/lock.svg?react";
import Unlock from "../icons/unlock.svg?react";
import Edit from "../icons/edit.svg?react";
import styles from "../styles/color-menu.module.scss";

const ColorMenu = ({
  backgroundColor,
  visible,
  index,
}: {
  backgroundColor: string;
  visible: boolean;
  index: number;
}) => {
  const ref = useRef(null);
  useClickOutside(ref, () => setColorPickerActive(false));

  const {
    textColors,
    backgroundColors,
    lockedColors,
    setLockedColor,
    replaceLockedColor,
    setTheme,
  } = useThemeContext();

  const isLocked = lockedColors?.some(
    (lockedColor) => lockedColor.hex === backgroundColor
  );
  const [colorPickerActive, setColorPickerActive] = useState(false);

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
      className={classNames(
        styles.colorMenu,
        visible && styles.colorMenuVisible
      )}
    >
      <p>{backgroundColor}</p>
      <div>
        <div>
          <input
            id={`save-checkbox-${backgroundColor}`}
            type="checkbox"
            className={styles.previewSaveCheckbox}
            checked={isLocked || false}
            aria-label="Lock color"
            onChange={() =>
              setLockedColor({ hex: backgroundColor, position: index })
            }
          />
          <label
            htmlFor={`save-checkbox-${backgroundColor}`}
            className={classNames(styles.previewSaveLabel)}
          >
            {isLocked ? <Lock /> : <Unlock />}
          </label>
        </div>
        <div>
          <div
            ref={ref}
            className={classNames(
              styles.previewColorPicker,
              colorPickerActive && styles.previewColorPickerActive
            )}
          >
            <HexColorPicker
              id={`color-picker-${backgroundColor}`}
              color={backgroundColor}
              onChange={handleColorChange}
            />
          </div>
          <button
            onClick={() => setColorPickerActive(true)}
            className={classNames(styles.previewColorLabel)}
            aria-label="Edit color"
          >
            <Edit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorMenu;
