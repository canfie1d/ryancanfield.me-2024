import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import GithubIcon from "../icons/github.svg?react";
import LinkedinIcon from "../icons/linkedin.svg?react";
import styles from "../styles/page-title.module.scss";

const PageTitle = () => {
  const { pathname } = useLocation();

  return pathname === "/" ? (
    <main className={styles.pageTitleWrapper}>
      <h1 className={styles.pageTitle}>Ryan Canfield</h1>
      <h2 className={styles.pageSubtitle}>
        Hands-in-code
        <br />
        Engineering Leadership
      </h2>
      <div className={styles.pageContent}>
        <p className={styles.pageDescription}>
          {/* I'm a software engineer and engineering leader with a passion for
          building great products and teams. */}
        </p>
        <p className={styles.pageDescription}>
          Theme builder feature inspired by{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://coolors.co"
          >
            coolors.co
          </a>
        </p>
        <div className={styles.pageLinks}>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/canfie1d/ryancanfield.me-2024"
          >
            <GithubIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/ryanmcanfield"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
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
