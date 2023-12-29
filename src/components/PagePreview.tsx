import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Theme } from "../contexts/useThemeProvider";
import PreviewContent from "./PreviewContent";
import styles from "../styles/preview.module.scss";

const PagePreview = ({ pageName }: { pageName: string }) => {
  const pathname = useLocation();
  const isCurrent = pathname.toString() === `/${pageName}`;
  const { textColors, backgroundColors } = useContext(Theme);

  return (
    <aside
      aria-label={pageName}
      style={{
        color: textColors ? textColors[pageName] : "#333",
        backgroundColor: backgroundColors ? backgroundColors[pageName] : "#fff",
      }}
      className={classNames(styles.preview, isCurrent && styles.previewHidden)}
    >
      <PreviewContent pageName={pageName} />
    </aside>
  );
};

export default PagePreview;
