import { ReactNode } from "react";
import classNames from "classnames";
import { motion, useReducedMotion } from "motion/react";
import { useAnimate } from "~/hooks/useAnimate";
import styles from "./PageWrapper.module.scss";
// import { useIdentityContext } from "react-netlify-identity";

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
  // const { user, isLoggedIn } = useIdentityContext();
  // console.log("user: ", user);
  // console.log("isLoggedIn: ", isLoggedIn);

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
