import { ReactNode, useRef } from "react";
import classNames from "classnames";
import { useWindowSize } from "react-use";
import { useThemeContext } from "../contexts/ThemeProvider";
import { useGameModeContext } from "../contexts/GameModeProvider";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import {
  pagesUsingThemeColor,
  PageNames,
  pageNames,
} from "../data/themeConfig";
import ColorMenu from "../components/ColorMenu";
import Icon from "../components/Icon";
import styles from "./PageContent.module.scss";
import { Waypoint } from "react-waypoint";

const PageContent = ({
  header,
  pageName,
  children,
}: {
  header: {
    meta: ReactNode | string;
    title: string;
    subtitle?: string;
    icon?: string;
  };
  pageName: PageNames;
  children: ReactNode;
}) => {
  const ref = useRef(null);
  const { activeGameModes } = useGameModeContext();
  const gameModeActive =
    activeGameModes?.[pageName as keyof typeof activeGameModes];
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const { textColors, backgroundColors } = useThemeContext();
  const { setScrolled } = usePageScrollContext();
  const indexOfPage = pageNames.indexOf(pageName);

  return (
    <main
      ref={ref}
      style={{
        color: textColors ? textColors[indexOfPage] : "#89AAC0",
        backgroundColor: backgroundColors
          ? backgroundColors[indexOfPage]
          : "#89AAC0",
      }}
      className={classNames(styles.main)}
    >
      <div className={styles.pageContentWrapper}>
        <div className={styles.content}>
          <div className={classNames(styles.contentMeta)}>
            <span>{header.meta}</span>
            {pagesUsingThemeColor.includes(pageName as string) && (
              <ColorMenu
                index={indexOfPage}
                hidden={gameModeActive}
                backgroundColor={backgroundColors[indexOfPage]}
                colorPickerlocation={{ top: "25px", left: "-210px" }}
                hideLabel={isSmallScreen}
                vertical={!isSmallScreen}
                collapsed
                alignRight
              />
            )}
          </div>
          <Waypoint
            scrollableAncestor={ref.current}
            onEnter={() => setScrolled(false)}
            onLeave={() => setScrolled(true)}
          />

          <div className={styles.contentHeader}>
            {header.icon && <Icon name={header.icon} size="large" />}
            <h1>{header.title}</h1>
            <h2>{header.subtitle}</h2>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default PageContent;
