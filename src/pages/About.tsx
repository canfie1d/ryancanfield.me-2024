import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useAnimate } from "../hooks/useAnimate";
import { useShortcuts } from "../hooks/useShortcuts";
import PagePreview from "../components/PagePreview";
import PageContent from "../components/PageContent";
import AboutContent from "../content/AboutContent";
import Atom from "../icons/atom.svg?react";
import styles from "../styles/page.module.scss";
import classNames from "classnames";

const About = () => {
  useShortcuts();
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const pageName = "about";
  const isCurrent = pathname === `/${pageName}`;
  const { slide } = useAnimate();

  return (
    <motion.div
      key={pageName}
      animate={!prefersReducedMotion && slide(pageName)}
      className={classNames(
        styles.pageWrapper,
        pathname === "/" && styles.pageWrapperHome
      )}
    >
      {isCurrent ? (
        <PageContent
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
        <PagePreview pageName={pageName} />
      )}
    </motion.div>
  );
};

export default About;
