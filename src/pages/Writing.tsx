import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useAnimate } from "../hooks/useAnimate";
import PagePreview from "../components/PagePreview";
import PageContent from "../components/PageContent";
import WritingContent from "../content/WritingContent";
import Brain from "../icons/brain.svg?react";
import styles from "../styles/page.module.scss";
import classNames from "classnames";

const Writing = () => {
  const prefersReducedMotion = useReducedMotion();
  const pageName = "writing";

  const { pathname } = useLocation();
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
          header={{ meta: "③", title: "Writing", icon: <Brain /> }}
        >
          <WritingContent />
        </PageContent>
      ) : (
        <PagePreview pageName={pageName} />
      )}
    </motion.div>
  );
};

export default Writing;
