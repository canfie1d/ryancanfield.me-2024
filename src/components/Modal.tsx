import { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "../styles/themes.module.scss";

const Modal = ({
  show,
  header,
  children,
}: {
  show: boolean;
  header: ReactNode;
  children: ReactNode;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="gh-data-modal"
          className={styles.modal}
          initial={!prefersReducedMotion ? { opacity: 0 } : {}}
          animate={!prefersReducedMotion ? { opacity: 1 } : {}}
          exit={!prefersReducedMotion ? { opacity: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.modalHeader}>{header}</div>
          <div className={styles.modalBody}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
