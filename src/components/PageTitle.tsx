import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import GithubIcon from "../icons/github.svg?react";
import LinkedinIcon from "../icons/linkedin.svg?react";
import styles from "../styles/page-title.module.scss";

const PageTitle = () => {
  const { pathname } = useLocation();

  const renderPageLinks = () => (
    <div className={styles.pageLinks}>
      <a
        target="_blank"
        href="https://github.com/canfie1d/ryancanfield.me-2024"
        aria-label="Website Github repo"
      >
        <GithubIcon />
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/ryanmcanfield"
        aria-label="LinkedIn Profile"
      >
        <LinkedinIcon />
      </a>
    </div>
  );

  return pathname === "/" ? (
    <main className={styles.pageWrapper}>
      <div className={styles.pageTitleWrapper}>
        <h1 className={styles.pageTitle}>Ryan Canfield</h1>
        <h2 className={styles.pageSubtitle}>
          Hands-in-code Software Engineering Leader
        </h2>
      </div>
      {renderPageLinks()}
    </main>
  ) : (
    <header className={classNames(styles.pageHeader)}>
      <Link
        to="/"
        className={classNames(styles.pageTitle, styles.pageTitleMinimized)}
        aria-label="Home"
      >
        Ryan Canfield
      </Link>
      {renderPageLinks()}
    </header>
  );
};

export default PageTitle;
