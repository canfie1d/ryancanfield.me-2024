import classNames from "classnames";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useAnimate } from "../../hooks/useAnimate";
import { usePageScrollContext } from "../../contexts/PageScrollProvider";
import styles from "./PageWrapper.module.scss";

const PageWrapper = ({
  pageName,
  initial,
  ignoreScroll,
  children,
}: {
  pageName: string;
  initial?: false;
  ignoreScroll?: boolean;
  children: ReactNode;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrolled } = usePageScrollContext();
  const { slide } = useAnimate();

  return (
    <motion.div
      key={pageName}
      animate={!prefersReducedMotion && slide(pageName)}
      className={classNames(
        styles.pageWrapper,
        !ignoreScroll && scrolled && styles.pageWrapperScrolled
      )}
      initial={initial}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
