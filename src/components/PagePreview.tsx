import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import PreviewContent from "./PreviewContent";
import styles from "../styles/preview.module.scss";

const PagePreview = ({ pageName }: { pageName: string }) => {
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
      className={classNames(styles.preview)}
    >
      <PreviewContent pageName={pageName} />
    </aside>
  );
};

export default PagePreview;
