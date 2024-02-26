import { useState } from "react";
import classNames from "classnames";

import { useAchievementContext } from "../../contexts/AchievementProvider";
import { useThemeContext } from "../../contexts/ThemeProvider";
import IconMenu from "../IconMenu";
import ColorPicker from "../ColorPicker";
import Button from "../Button";
import styles from "./ColorMenu.module.scss";

const ColorMenu = ({
  index,
  extraPadded,
  backgroundColor,
  alignRight,
  hidden = false,
  vertical,
  collapsed,
  hideLabel,
  colorPickerlocation,
}: {
  index: number;
  backgroundColor: string;
  extraPadded?: boolean;
  colorPickerlocation: { top: number | string; left: number | string };
  alignRight?: boolean;
  hidden?: boolean;
  collapsed?: boolean;
  vertical?: boolean;
  hideLabel?: boolean;
  padded?: boolean;
}) => {
  const [colorPickerActive, setColorPickerActive] = useState(false);

  const { hasAchievement, addAchievement } = useAchievementContext();

  const { lockedColors, setLockedColor } = useThemeContext();

  const copyColor = () => {
    if (!hasAchievement("copy_pasta")) {
      addAchievement("copy_pasta");
    }

    // @todo Add a 'Copied' message
    navigator.clipboard.writeText(backgroundColor);
  };

  const isLocked = lockedColors?.some(
    (lockedColor) => lockedColor.hex === backgroundColor
  );

  return (
    <div
      className={classNames(
        styles.colorMenu,
        collapsed && styles.colorMenuCollapsed,
        alignRight && styles.colorMenuAlignRight,
        extraPadded && styles.colorMenuExtraPadded
      )}
    >
      <Button
        className={classNames(
          styles.colorMenuLabel,
          hideLabel && styles.colorMenuLabelHidden
        )}
        onClick={copyColor}
        variant="transparent"
      >
        {backgroundColor}
      </Button>
      <IconMenu
        vertical={vertical}
        justify="center"
        actions={[
          {
            icon: "copy",
            label: "Copy color",
            onClick: copyColor,
          },
          {
            icon: isLocked ? "lock" : "unlock",
            label: "Lock color",
            checked: isLocked,
            onChange: () => {
              if (!hasAchievement("custom")) {
                addAchievement("custom");
              }
              if (
                !hasAchievement("fully_custom") &&
                lockedColors.length === 4
              ) {
                addAchievement("fully_custom");
              }
              setLockedColor({ hex: backgroundColor, position: index });
            },
          },
          {
            icon: "edit",
            label: "Edit color",
            active: colorPickerActive,
            onClick: () => setColorPickerActive(true),
          },
        ]}
      />
      <ColorPicker
        location={colorPickerlocation}
        onClose={() => setColorPickerActive(false)}
        backgroundColor={backgroundColor}
        active={colorPickerActive}
      />
    </div>
  );
};

export default ColorMenu;
