import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { PageNames, pageNames } from "../data/themeConfig";
import PreviewContent from "./PreviewContent";

import styles from "../styles/preview.module.scss";
import ColorMenu from "./ColorMenu";

const PagePreview = ({
  pageName,
  scrolled,
}: {
  pageName: PageNames;
  scrolled: boolean;
}) => {
  const { textColors, backgroundColors } = useThemeContext();
  const indexOfPage = pageNames.indexOf(pageName);

  const backgroundColor = backgroundColors
    ? backgroundColors[indexOfPage]
    : "#89AAC0";

  const textColor = textColors ? textColors[indexOfPage] : "#89AAC0";

  return (
    <aside
      aria-label={pageName}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      className={classNames(styles.preview, scrolled && styles.previewScrolled)}
    >
      <ColorMenu
        index={indexOfPage}
        visible={!scrolled}
        backgroundColor={backgroundColor}
      />
      <PreviewContent pageName={pageName} />
    </aside>
  );
};

export default PagePreview;
