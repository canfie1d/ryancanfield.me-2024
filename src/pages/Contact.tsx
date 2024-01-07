import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useScroll } from "react-use";
import classNames from "classnames";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useAnimate } from "../hooks/useAnimate";
import PagePreview from "../components/PagePreview";
import PageContent from "../components/PageContent";
import ContactContent from "../content/ContactContent";
import At from "../icons/at.svg?react";
import styles from "../styles/page.module.scss";

const Contact = () => {
  const { scrolled, setScrolled } = usePageScrollContext();

  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const pageName = "contact";
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
          header={{
            meta: "④",
            title: "Contact",
            icon: <At />,
          }}
        >
          <ContactContent />
        </PageContent>
      ) : (
        <PagePreview scrolled={scrolled} pageName={pageName} />
      )}
    </motion.div>
  );
};

export default Contact;
