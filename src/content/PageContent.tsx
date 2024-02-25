import { ForwardedRef, ReactNode, forwardRef } from "react";
import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import {
  pagesUsingThemeColor,
  PageNames,
  pageNames,
} from "../data/themeConfig";
import ColorMenu from "../components/ColorMenu";
import Icon from "../components/Icon";
import styles from "./Content.module.scss";
import { useWindowSize } from "react-use";
import { useGameModeContext } from "../contexts/GameModeProvider";

const PageContent = forwardRef(
  (
    {
      scrolled,
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
      scrolled?: boolean;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { activeGameModes } = useGameModeContext();
    const gameModeActive =
      activeGameModes?.[pageName as keyof typeof activeGameModes];
    const { width } = useWindowSize();
    const isSmallScreen = width <= 768;
    const { textColors, backgroundColors } = useThemeContext();

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
            <div
              className={classNames(
                styles.contentMeta,
                scrolled && styles.contentMetaHidden
              )}
            >
              <span>{header.meta}</span>
              {pagesUsingThemeColor.includes(pageName as string) && (
                <ColorMenu
                  index={indexOfPage}
                  hidden={scrolled || gameModeActive}
                  backgroundColor={backgroundColors[indexOfPage]}
                  colorPickerlocation={{ top: "25px", left: "-210px" }}
                  hideLabel={isSmallScreen}
                  vertical={!isSmallScreen}
                  collapsed
                  alignRight
                />
              )}
            </div>
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
  }
);

export default PageContent;
