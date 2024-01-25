import classNames from "classnames";
import { Suspense, lazy, useEffect } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { useShortcuts } from "../hooks/useShortcuts";
import { useAnimate } from "../hooks/useAnimate";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import PagePreview from "../components/PagePreview";
import styles from "../styles/page.module.scss";

const About = lazy(() => import("./About"));
const Work = lazy(() => import("./Work"));
const Writing = lazy(() => import("./Writing"));
const Contact = lazy(() => import("./Contact"));
const CaseStudy = lazy(() => import("./CaseStudy"));

const Page = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrolled, setScrolled } = usePageScrollContext();
  const { pathname } = useLocation();
  const { slide } = useAnimate();
  useShortcuts();

  useEffect(() => {
    setScrolled(false);
  }, [pathname]);

  const layout = () => {
    switch (pathname) {
      case "/about":
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(styles.pageWrapper)}
              initial={false}
            >
              <Suspense
                fallback={
                  <PagePreview key="about" pageName="about" scrolled={false} />
                }
              >
                <About key="about" />
              </Suspense>
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview key="work" pageName="work" scrolled={scrolled} />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview
                key="writing"
                pageName="writing"
                scrolled={scrolled}
              />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview
                key="contact"
                pageName="contact"
                scrolled={scrolled}
              />
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
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview key="about" pageName="about" scrolled={scrolled} />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(styles.pageWrapper)}
              initial={false}
            >
              <Suspense
                fallback={
                  <PagePreview key="work" pageName="work" scrolled={false} />
                }
              >
                <Work key="work" />
              </Suspense>
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview
                key="writing"
                pageName="writing"
                scrolled={scrolled}
              />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview
                key="contact"
                pageName="contact"
                scrolled={scrolled}
              />
            </motion.div>
          </>
        );
      case "/writing":
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview key="about" pageName="about" scrolled={scrolled} />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview key="work" pageName="work" scrolled={scrolled} />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(styles.pageWrapper)}
              initial={false}
            >
              <Suspense
                fallback={
                  <PagePreview
                    key="writing"
                    pageName="writing"
                    scrolled={false}
                  />
                }
              >
                <Writing key="writing" />
              </Suspense>
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview
                key="contact"
                pageName="contact"
                scrolled={scrolled}
              />
            </motion.div>
          </>
        );
      case "/contact":
        return (
          <>
            <motion.div
              key="about-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview key="about" pageName="about" scrolled={scrolled} />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview key="work" pageName="work" scrolled={scrolled} />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("about")}
              className={classNames(
                styles.pageWrapper,
                scrolled && styles.pageWrapperScrolled
              )}
            >
              <PagePreview
                key="writing"
                pageName="writing"
                scrolled={scrolled}
              />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(styles.pageWrapper)}
              initial={false}
            >
              <Suspense
                fallback={
                  <PagePreview
                    key="contact"
                    pageName="contact"
                    scrolled={false}
                  />
                }
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
              <PagePreview key="about" pageName="about" scrolled={false} />
            </motion.div>
            <motion.div
              key="work-page"
              animate={!prefersReducedMotion && slide("work")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="work" pageName="work" scrolled={false} />
            </motion.div>
            <motion.div
              key="writing-page"
              animate={!prefersReducedMotion && slide("writing")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="writing" pageName="writing" scrolled={false} />
            </motion.div>
            <motion.div
              key="contact-page"
              animate={!prefersReducedMotion && slide("contact")}
              className={classNames(styles.pageWrapper)}
            >
              <PagePreview key="contact" pageName="contact" scrolled={false} />
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
