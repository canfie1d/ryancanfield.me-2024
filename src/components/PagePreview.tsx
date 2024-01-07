import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import PreviewContent from "./PreviewContent";
import styles from "../styles/preview.module.scss";

const PagePreview = ({
  pageName,
  scrolled,
}: {
  pageName: string;
  scrolled: boolean;
}) => {
  const { textColors, backgroundColors } = useThemeContext();

  return (
    <aside
      aria-label={pageName}
      style={{
        color: textColors ? textColors[pageName] : "#89AAC0",
        backgroundColor: backgroundColors
          ? backgroundColors[pageName]
          : "#89AAC0",
      }}
      className={classNames(styles.preview, scrolled && styles.previewScrolled)}
    >
      <PreviewContent pageName={pageName} />
    </aside>
  );
};

export default PagePreview;
