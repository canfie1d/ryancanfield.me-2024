import React, { ReactNode, useRef } from "react";
import classNames from "classnames";
import { useWindowSize } from "~/hooks/useWindowSize";
import { Waypoint } from "react-waypoint";
import { usePageScrollStore } from "~/stores/scroll";
import { pagesUsingThemeColor, PageNames, pageNames } from "~/data/themeConfig";
import ColorMenu from "~/components/ColorMenu";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import styles from "./PageContent.module.scss";
import { useGetColorsFromTheme } from "~/helpers/getColorsFromTheme";
import { useGameModeStore } from "~/stores/game-mode";

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
  const ref = useRef<HTMLElement | null>(null);
  const [scrollContainer, setScrollContainer] = React.useState<HTMLElement | null>(null);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
    setScrollContainer(node);
  };
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive = activeGameModes?.[pageName as keyof typeof activeGameModes];
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const { textColor, backgroundColor } = useGetColorsFromTheme(pageName);
  const setScrolled = usePageScrollStore((store) => store.setScrolled);
  const indexOfPage = pageNames.indexOf(pageName);

  return (
    <main
      ref={setRef}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      className={classNames(styles.main)}
    >
      <div className={styles.pageContentWrapper}>
        <div className={styles.content}>
          <div className={classNames(styles.contentMeta)}>
            <Text
              as="span"
              color={textColor}
            >
              {header.meta}
            </Text>
            {pagesUsingThemeColor.includes(pageName as string) && (
              <ColorMenu
                index={indexOfPage}
                hidden={gameModeActive}
                backgroundColor={backgroundColor}
                colorPickerLocation={{ top: "25px", left: "-210px" }}
                hideLabel={isSmallScreen}
                vertical={!isSmallScreen}
                collapsed
                alignRight
              />
            )}
          </div>
          <Waypoint
            scrollableAncestor={scrollContainer}
            onEnter={() => setScrolled(false)}
            onLeave={() => setScrolled(true)}
          />

          <div className={styles.contentHeader}>
            {header.icon && (
              <Icon
                name={header.icon}
                size="large"
              />
            )}
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
