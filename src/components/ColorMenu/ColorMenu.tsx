import { useState, useMemo, useCallback } from "react";
import classNames from "classnames";

import { useAchievementStore } from "~/stores/achievements";
import IconMenu from "~/components/IconMenu";
import ColorPicker from "~/components/ColorPicker";
import Button from "~/components/Button";
import styles from "./ColorMenu.module.scss";
import { useThemeStore } from "~/stores/theme";
import Toast from "../Toast";
import Text from "../Text";

const ColorMenu = ({
  index,
  extraPadded,
  backgroundColor,
  alignRight,
  hidden = false,
  vertical,
  collapsed,
  hideLabel,
  colorPickerLocation,
}: {
  index: number;
  backgroundColor: string;
  extraPadded?: boolean;
  colorPickerLocation: { top: number | string; left: number | string };
  alignRight?: boolean;
  hidden?: boolean;
  collapsed?: boolean;
  vertical?: boolean;
  hideLabel?: boolean;
  padded?: boolean;
}) => {
  const [colorPickerActive, setColorPickerActive] = useState(false);

  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  const lockedColors = useThemeStore((store) => store.lockedColors);
  const setLockedColor = useThemeStore((store) => store.setLockedColor);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const copyColor = useCallback(() => {
    if (!hasAchievement("copy_pasta")) {
      addAchievement("copy_pasta");
    } else {
      setShowCopiedToast(true);
    }

    navigator.clipboard.writeText(backgroundColor);
  }, [hasAchievement, addAchievement, backgroundColor]);

  const isLocked = useMemo(
    () =>
      lockedColors?.some((lockedColor) => lockedColor.hex === backgroundColor),
    [lockedColors, backgroundColor]
  );

  const actions = useMemo(() => {
    return [
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
          if (!hasAchievement("fully_custom") && lockedColors?.length === 4) {
            addAchievement("fully_custom");
          }
          setLockedColor({ hex: backgroundColor, position: index });
        },
      },
      {
        icon: "eyedropper",
        label: "Choose new color",
        active: colorPickerActive,
        onClick: () => setColorPickerActive(true),
      },
    ];
  }, [
    copyColor,
    isLocked,
    hasAchievement,
    addAchievement,
    lockedColors,
    backgroundColor,
    index,
    colorPickerActive,
    setLockedColor,
  ]);

  return (
    <div
      className={classNames(
        styles.colorMenu,
        hidden && styles.colorMenuHidden,
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
      <IconMenu vertical={vertical} justify="center" actions={actions} />
      {colorPickerActive && (
        <ColorPicker
          location={colorPickerLocation}
          onClose={() => setColorPickerActive(false)}
          backgroundColor={backgroundColor}
          active={colorPickerActive}
        />
      )}
      <Toast
        open={showCopiedToast}
        closeTime={1200}
        onClose={() => setShowCopiedToast(false)}
        type="alert"
      >
        <Text>Color copied!</Text>
      </Toast>
    </div>
  );
};

export default ColorMenu;
