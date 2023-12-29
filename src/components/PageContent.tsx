import { ReactNode } from "react";
import classNames from "classnames";
import { useThemeContext } from "../contexts/useThemeProvider";
import styles from "../styles/content.module.scss";

const PageContent = ({
  header,
  pageName,
  children,
}: {
  header: {
    meta: ReactNode | string;
    title: string;
    icon?: ReactNode;
  };
  pageName: string;
  children: ReactNode;
}) => {
  const { textColors, backgroundColors } = useThemeContext();

  return (
    <main
      style={{
        color: textColors ? textColors[pageName] : "#333",
        backgroundColor: backgroundColors ? backgroundColors[pageName] : "#fff",
      }}
      className={classNames(styles.main)}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.contentMeta}>{header.meta}</div>
          <div className={styles.contentHeader}>
            {header.icon}
            <h1>{header.title}</h1>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default PageContent;
