import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useScroll } from "react-use";
import { useAnimate } from "../hooks/useAnimate";
import { motion, useReducedMotion } from "framer-motion";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import classNames from "classnames";
import PagePreview from "../components/PagePreview";
import PageContent from "../components/PageContent";
import AboutContent from "../content/AboutContent";
import Atom from "../icons/atom.svg?react";
import styles from "../styles/page.module.scss";

const About = () => {
  const { scrolled, setScrolled } = usePageScrollContext();

  const ref = useRef(null);
  const { y } = useScroll(ref);
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const { slide } = useAnimate();
  const pageName = "about";
  const isCurrent = pathname === `/${pageName}`;

  if (ref.current) {
    if ((scrolled === false || scrolled === undefined) && y > 50) {
      setScrolled(true);
    } else if (scrolled === true && y === 0) {
      setScrolled(false);
    }
  }

  return (
    <motion.div
      key={pageName}
      animate={!prefersReducedMotion && slide(pageName)}
      className={classNames(
        styles.pageWrapper,
        scrolled && !isCurrent && styles.pageWrapperScrolled
      )}
    >
      {isCurrent ? (
        <PageContent
          ref={ref}
          pageName={pageName}
          header={{
            meta: "①",
            title: "About",
            icon: <Atom />,
          }}
        >
          <AboutContent />
        </PageContent>
      ) : (
        <PagePreview scrolled={scrolled} pageName={pageName} />
      )}
    </motion.div>
  );
};

export default About;
