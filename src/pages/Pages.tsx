import { Suspense, lazy } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { useShortcuts } from "../hooks/useShortcuts";
import PagePreview from "../components/PagePreview";
import classNames from "classnames";
import styles from "../styles/page.module.scss";
import { useAnimate } from "../hooks/useAnimate";

const About = lazy(() => import("./About"));
const Work = lazy(() => import("./Work"));
const Writing = lazy(() => import("./Writing"));
const Contact = lazy(() => import("./Contact"));
const CaseStudy = lazy(() => import("./CaseStudy"));

const Page = () => {
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const { slide } = useAnimate();
  useShortcuts();

  const layout = () => {
    switch (pathname) {
      case "/about":
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(styles.pageWrapper)}
            >
              <Suspense fallback={<PagePreview key="about" pageName="about" />}>
                <About key="about" />
              </Suspense>
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="work" pageName="work" />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="writing" pageName="writing" />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="contact" pageName="contact" />
            </motion.div>
          </>
        );
      case "/work":
      case "/work/freightweb":
      case "/work/xinova":
      case "/work/princess":
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="about" pageName="about" />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(styles.pageWrapper)}
            >
              <Suspense fallback={<PagePreview key="work" pageName="work" />}>
                <Work key="work" />
              </Suspense>
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="writing" pageName="writing" />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="contact" pageName="contact" />
            </motion.div>
          </>
        );
      case "/writing":
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="about" pageName="about" />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="work" pageName="work" />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(styles.pageWrapper)}
            >
              <Suspense
                fallback={<PagePreview key="writing" pageName="writing" />}
              >
                <Writing key="writing" />
              </Suspense>
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="contact" pageName="contact" />
            </motion.div>
          </>
        );
      case "/contact":
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="about" pageName="about" />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="work" pageName="work" />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="writing" pageName="writing" />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(styles.pageWrapper)}
            >
              <Suspense
                fallback={<PagePreview key="contact" pageName="contact" />}
              >
                <Contact key="contact" />
              </Suspense>
            </motion.div>
          </>
        );
      case "/":
      default:
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="about" pageName="about" />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="work" pageName="work" />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="writing" pageName="writing" />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="contact" pageName="contact" />
            </motion.div>
          </>
        );
    }
  };

  return <LayoutGroup>{layout()}</LayoutGroup>;
};

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/about" element={<Page />} />
      <Route path="/work" element={<Page />}>
        <Route
          path="/work/freightweb"
          element={<CaseStudy id="freightweb" />}
        />
        <Route path="/work/xinova" element={<CaseStudy id="xinova" />} />
        <Route path="/work/princess" element={<CaseStudy id="princess" />} />
      </Route>
      <Route path="/writing" element={<Page />} />
      <Route path="/contact" element={<Page />} />
    </Routes>
  );
};

export default Pages;
