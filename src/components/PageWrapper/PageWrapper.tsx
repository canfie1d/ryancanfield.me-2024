import classNames from "classnames";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useAnimate } from "../../hooks/useAnimate";
import styles from "./PageWrapper.module.scss";

const PageWrapper = ({
  pageName,
  initial,
  isCurrent,
  isHome,
  children,
}: {
  pageName: string;
  initial?: false;
  isCurrent?: boolean;
  isHome?: boolean;
  children: ReactNode;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { slide } = useAnimate();

  return (
    <motion.div
      key={pageName}
      animate={!prefersReducedMotion && slide(pageName)}
      className={classNames(
        styles.pageWrapper,
        isCurrent && styles.pageWrapperCurrent,
        isHome && styles.pageWrapperHome
      )}
      initial={initial}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
