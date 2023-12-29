import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "../styles/page-title.module.scss";

const PageTitle = () => {
  const { pathname } = useLocation();

  return pathname === "/" ? (
    <main className={styles.pageTitleWrapper}>
      <h1 className={styles.pageTitle}>Ryan Canfield</h1>
      <h2 className={styles.pageSubtitle}>
        Hands-in-code Engineering Leadership
      </h2>
    </main>
  ) : (
    <header
      className={classNames(
        styles.pageTitleWrapper,
        styles.pageTitleWrapperMinimized
      )}
    >
      <Link
        to="/"
        className={classNames(styles.pageTitle, styles.pageTitleMinimized)}
      >
        Ryan Canfield
      </Link>
    </header>
  );
};

export default PageTitle;
