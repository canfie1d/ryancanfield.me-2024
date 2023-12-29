import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Theme } from "../contexts/useThemeProvider";
import Atom from "../icons/atom.svg?react";
import At from "../icons/at.svg?react";
import Brain from "../icons/brain.svg?react";
import CodeCircle from "../icons/code-circle.svg?react";
import styles from "../styles/preview.module.scss";

const PagePreview = ({ pageName }: { pageName: string }) => {
  const pathname = useLocation();
  const isCurrent = pathname.toString() === `/${pageName}`;
  const { textColors, backgroundColors } = useContext(Theme);

  const getPreviewContent = () => {
    switch (pageName) {
      case "about":
        return (
          <>
            <Atom />
            <p className={styles.previewLinkContent}>⌘^1</p>
          </>
        );
      case "work":
        return (
          <>
            <CodeCircle />
            <p className={styles.previewLinkContent}>⌘^2</p>
          </>
        );
      case "writing":
        return (
          <>
            <Brain />
            <p className={styles.previewLinkContent}>⌘^3</p>
          </>
        );
      case "contact":
        return (
          <>
            <At />
            <p className={styles.previewLinkContent}>⌘^4</p>
          </>
        );
      default:
        break;
    }
  };

  return (
    <aside
      style={{
        color: textColors ? textColors[pageName] : "#333",
        backgroundColor: backgroundColors ? backgroundColors[pageName] : "#fff",
      }}
      className={classNames(styles.preview, isCurrent && styles.previewHidden)}
    >
      <Link className={styles.previewLink} to={`/${pageName}`}>
        <div className={styles.previewContent}>{getPreviewContent()}</div>
      </Link>
    </aside>
  );
};

export default PagePreview;
