import { loreTheme, themeConfig } from "~/data/themeConfig";
import { useAchievementStore } from "~/stores/achievements";
import { useThemeStore } from "~/stores/theme";
// import { hexToRgb } from "~/helpers/hexToRgb";
// import { getTextColor } from "~/helpers/getTextColor";
// import { rgbToHex } from "~/helpers/rgbToHex";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import classNames from "classnames";
import styles from "./Theme.module.scss";

const ThemeMenu = ({ showHeader }: { showHeader: boolean }) => {
  const themeName = useThemeStore((store) => store.name);
  // const backgroundColors = useThemeStore((store) => store.backgroundColors);
  const setTheme = useThemeStore((store) => store.setTheme);
  const lockedColors = useThemeStore((store) => store.lockedColors);
  const resetLockedColors = useThemeStore((store) => store.resetLockedColors);
  const buildCustomTheme = useThemeStore((store) => store.buildCustomTheme);

  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  const handleSelectKnownTheme = (index: number) => {
    if (!hasAchievement("fresh_coat")) {
      addAchievement("fresh_coat");
    }

    if (index === -1 && hasAchievement("reward_determination")) {
      setTheme(loreTheme);
      resetLockedColors();
      return null;
    }

    let newTheme = themeConfig[index];

    if (lockedColors?.length) {
      newTheme = buildCustomTheme(themeConfig[index]);
    }

    setTheme(newTheme);
  };

  // const handleSelectNewTheme = async () => {
  //   if (!hasAchievement("brand_spankin")) {
  //     addAchievement("brand_spankin");
  //   }
  //   // Avail. models: "ui", "makoto_shinkai","metroid_fusion","akira_film","flower_photography"
  //   // Use N to get suggested colors [[44,43,44],[90,83,82],"N","N","N"]
  //   const lockedColorPayload: (string | (number[] | null))[] = backgroundColors
  //     ?.map((color) => {
  //       const colors = [];
  //       if (lockedColors?.some((lockedColor) => lockedColor.hex === color)) {
  //         colors.push(hexToRgb(color));
  //       } else {
  //         colors.push("N");
  //       }
  //       return colors;
  //     })
  //     .flat();

  //   let body = lockedColors?.length
  //     ? JSON.stringify(lockedColorPayload)
  //     : undefined;

  //   if (
  //     // Fixes bug where lockedColors is an array of "N"
  //     // instead of an empty array when all colors are unlocked
  //     // For some reason I decided to use .filter and check the length
  //     // instead of using .some or .every
  //     body &&
  //     JSON.parse(body)?.filter((color: string) => {
  //       return color !== "N";
  //     }).length === 0
  //   ) {
  //     resetLockedColors();
  //     body = undefined;
  //   }

  //   try {
  //     const bgResponse = await fetch("/api/theme-picker", {
  //       method: "POST",
  //       body: body,
  //     });

  //     const rgbColors = await bgResponse.json();

  //     if (rgbColors.msg) throw new Error(rgbColors.msg);

  //     const hexColors = rgbColors.result
  //       .map((color: [r: string, g: string, b: string]) => rgbToHex(color))
  //       .toReversed();

  //     let newTheme: ThemeType = {
  //       name: "random",
  //       backgroundColors: hexColors,
  //       textColors: hexColors.map((color: string) => getTextColor(color)),
  //     };

  //     if (lockedColors?.length) {
  //       newTheme = buildCustomTheme(newTheme);
  //     }

  //     setTheme(newTheme);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const renderThemeOptions = () => {
    const themeOptions = themeConfig.map((theme, i) => {
      return (
        <li key={theme.name}>
          <Button
            id={theme.name}
            variant="transparent"
            className={classNames(
              styles.themeButton,
              themeName === theme.name && styles.themeButtonActive
            )}
            disabled={lockedColors?.length >= 4}
            onClick={() => handleSelectKnownTheme(i)}
          >
            {theme.name}
          </Button>
        </li>
      );
    });

    if (hasAchievement("the_journey_begins")) {
      const eryndorUnlocked = hasAchievement("reward_determination");
      themeOptions.push(
        <li key="eryndor">
          {eryndorUnlocked ? (
            <Button
              id="eryndor"
              title="Eryndor"
              active={themeName === "eryndor"}
              className={classNames(
                styles.themeButton,
                themeName === "eryndor" && styles.themeButtonActive
              )}
              onClick={() => handleSelectKnownTheme(-1)}
            >
              <Icon name="bow" size="x-small" />
              <span>
                <em>Eryndor</em>
              </span>
            </Button>
          ) : (
            <div
              className={styles.themeSwatchLocked}
              aria-label="Locked theme"
              title="There's something hidden here..."
            >
              <div className={styles.themeSwatchColors}>
                {loreTheme.backgroundColors.map((color) => (
                  <span
                    key={color}
                    className={styles.themeSwatchColor}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className={styles.lockedOverlay}>
                <Icon name="lock" size="x-small" />
              </div>
            </div>
          )}
        </li>
      );
    }

    // themeOptions.push(
    //   <li key="custom">
    //     <Button
    //       id="custom"
    //       active={themeName === "custom"}
    //       className={classNames(
    //         styles.themeButton,
    //         themeName === "custom" && styles.themeButtonActive
    //       )}
    //       disabled={lockedColors?.length >= 4}
    //       onClick={handleSelectNewTheme}
    //     >
    //       {lockedColors?.length ? "update" : "new"}
    //     </Button>
    //   </li>
    // );

    return themeOptions;
  };

  return (
    <div className={styles.themeMenu}>
      {showHeader && (
        <span className={styles.themeMenuHeader}>
          <Icon name="spray" />
          <span>themes</span>
        </span>
      )}
      {lockedColors?.length >= 4 && (
        <Text className={styles.themeMenuMessage}>
          <Icon name="lock" />
          To change your theme unlock one color at minimum.
        </Text>
      )}
      <ul>{renderThemeOptions()}</ul>
    </div>
  );
};

export default ThemeMenu;
