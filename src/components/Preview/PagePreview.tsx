import classNames from "classnames";
import { useThemeContext } from "../../contexts/ThemeProvider";
import { PageNames, pageNames } from "../../data/themeConfig";
import { useGetPageMeta } from "../../hooks/getPageMetaData";
import { useGameModeContext } from "../../contexts/GameModeProvider";
import { useLocation } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import PreviewContent from "./PreviewContent";
import ColorMenu from "../ColorMenu/ColorMenu";
import styles from "./PagePreview.module.scss";

const PagePreview = ({
  pageName,
  scrolled,
}: {
  pageName: PageNames;
  scrolled: boolean;
}) => {
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const { pathname } = useLocation();
  const metaData = useGetPageMeta(pageName);
  const { activeGameModes } = useGameModeContext();
  const gameModeActive =
    activeGameModes?.[pageName as keyof typeof activeGameModes];

  const { textColors, backgroundColors } = useThemeContext();
  const indexOfPage = pageNames.indexOf(pageName);

  const backgroundColor = backgroundColors
    ? backgroundColors[indexOfPage]
    : "#89AAC0";

  const textColor = textColors ? textColors[indexOfPage] : "#89AAC0";

  return (
    <aside
      aria-label={metaData.title}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      className={classNames(
        styles.pagePreview,
        scrolled && styles.previewScrolled
      )}
    >
      <ColorMenu
        index={indexOfPage}
        hidden={scrolled || gameModeActive}
        backgroundColor={backgroundColor}
        vertical={pathname !== "/" && !isSmallScreen}
        hideLabel={isSmallScreen}
        extraPadded={pathname === "/" && isSmallScreen}
        colorPickerlocation={
          !isSmallScreen
            ? { top: "200px", left: "-50px" }
            : pathname === "/"
              ? { top: "95px", left: "95px" }
              : { top: "60px", left: "95px" }
        } // @todo add html popover api
      />
      <PreviewContent
        scrolled={scrolled}
        metaData={metaData}
        pageName={pageName}
      />
    </aside>
  );
};

export default PagePreview;
