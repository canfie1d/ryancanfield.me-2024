import { ForwardedRef, ReactNode, forwardRef } from "react";
import classNames from "classnames";
import { useThemeContext } from "../contexts/ThemeProvider";
import { PageNames, pageNames } from "../data/themeConfig";
import styles from "../styles/content.module.scss";

const PageContent = forwardRef(
  (
    {
      header,
      pageName,
      children,
    }: {
      header: {
        meta: ReactNode | string;
        title: string;
        icon?: ReactNode;
      };
      pageName: PageNames;
      children: ReactNode;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
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
  }
);

export default PageContent;
