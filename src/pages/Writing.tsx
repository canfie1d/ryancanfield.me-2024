import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useAnimate } from "../hooks/useAnimate";
import { useScroll } from "react-use";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import PagePreview from "../components/PagePreview";
import PageContent from "../components/PageContent";
import WritingContent from "../content/WritingContent";
import Brain from "../icons/brain.svg?react";
import styles from "../styles/page.module.scss";
import classNames from "classnames";
import { useRef } from "react";

const Writing = () => {
  const { scrolled, setScrolled } = usePageScrollContext();

  const prefersReducedMotion = useReducedMotion();
  const pageName = "writing";

  const { pathname } = useLocation();
  const isCurrent = pathname === `/${pageName}`;
  const { slide } = useAnimate();
  const ref = useRef(null);
  const { y } = useScroll(ref);

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
          header={{ meta: "③", title: "Writing", icon: <Brain /> }}
        >
          <WritingContent />
        </PageContent>
      ) : (
        <PagePreview scrolled={scrolled} pageName={pageName} />
      )}
    </motion.div>
  );
};

export default Writing;
