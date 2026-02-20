import { useLocation } from "react-router-dom";
import { PageNames, pageNames } from "~/data/themeConfig";
import { usePageMeta } from "~/hooks/usePageMeta";
import { useWindowSize } from "~/hooks/useWindowSize";
import PagePreviewLink from "./PagePreviewLink";
import ColorMenu from "~/components/ColorMenu";
import styles from "./PagePreview.module.scss";
import { getColorsFromTheme } from "~/helpers/getColorsFromTheme";
import { useGameModeStore } from "~/stores/game-mode";

const PagePreview = ({
  pageName,
  hideAll,
}: {
  pageName: PageNames;
  hideAll?: boolean;
}) => {
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const { pathname } = useLocation();
  const metaData = usePageMeta(pageName);
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive =
    activeGameModes?.[pageName as keyof typeof activeGameModes];
  const indexOfPage = pageNames.indexOf(pageName);

  const { textColor, backgroundColor } = getColorsFromTheme(pageName);

  return (
    <aside
      aria-label={metaData.title}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      className={styles.pagePreview}
    >
      {!hideAll && (
        <>
          <ColorMenu
            index={indexOfPage}
            hidden={gameModeActive}
            backgroundColor={backgroundColor}
            vertical={pathname !== "/" && !isSmallScreen}
            hideLabel={isSmallScreen}
            extraPadded={pathname === "/" && isSmallScreen}
            colorPickerLocation={
              !isSmallScreen
                ? { top: "200px", left: "-50px" }
                : pathname === "/"
                  ? { top: "95px", left: "95px" }
                  : { top: "60px", left: "95px" }
            } // @todo add html popover api
          />
          <PagePreviewLink
            textColor={textColor}
            metaData={metaData}
            pageName={pageName}
          />
        </>
      )}
    </aside>
  );
};

export default PagePreview;
