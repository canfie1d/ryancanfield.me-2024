import { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CircleX from "../icons/circle-x.svg?react";
import styles from "../styles/modal.module.scss";

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
          initial={
            !prefersReducedMotion
              ? {
                  opacity: 0,
                  transform: "scale(.125)",
                  transformOrigin: "50% calc(100% - 75px)",
                }
              : {}
          }
          animate={
            !prefersReducedMotion ? { opacity: 1, transform: "scale(1)" } : {}
          }
          exit={
            !prefersReducedMotion
              ? {
                  opacity: 0,
                  transform: "scale(.125)",
                  transformOrigin: "50% calc(100% - 75px)",
                }
              : {}
          }
          transition={{ duration: 0.25 }}
        >
          {header}
          <div className={styles.modalBody}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.Header = ({
  onClose,
  title,
  subtitle,
  icon,
}: {
  onClose: () => void;
  title: string;
  subtitle: string;
  icon: ReactNode;
}) => (
  <div className={styles.modalHeader}>
    <span className={styles.modalHeaderIcon}>{icon}</span>
    <h2>
      <span>{title}</span>
      <span>{subtitle}</span>
    </h2>
    <button className="hidden-button" onClick={onClose}>
      <CircleX />
    </button>
  </div>
);

export default Modal;
