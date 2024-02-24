import { ReactNode } from "react";
import classNames from "classnames";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./Modal.module.scss";

// @todo trap focus
const Modal = ({
  show,
  header,
  children,
  onClose,
  transformOrigin = "50% calc(100% - 75px)",
  small,
}: {
  show: boolean;
  header: ReactNode;
  transformOrigin?: string;
  children: ReactNode;
  onClose?: () => void;
  small?: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            key="gh-data-modal"
            className={classNames(styles.modal, small && styles.modalSmall)}
            initial={
              !prefersReducedMotion
                ? {
                    opacity: 0,
                    transform: "scale(.125)",
                    transformOrigin: transformOrigin,
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
                    transformOrigin: transformOrigin,
                  }
                : {}
            }
            transition={{ duration: 0.25 }}
          >
            {header}
            <div className={styles.modalContent}>{children}</div>
          </motion.div>
          <Button
            variant="backdrop"
            onClick={onClose && onClose}
            className={styles.modalBackdrop}
            ariaHidden
            children={undefined}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export const ModalHeader = ({
  onClose,
  title,
  subtitle,
  icon,
}: {
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon: string;
}) => (
  <div className={styles.modalHeader}>
    <span className={styles.modalHeaderIcon}>{<Icon name={icon} />}</span>
    <div>
      <h2 className={styles.modalHeaderTitle}>{title}</h2>
      {subtitle && <h3 className={styles.modalHeaderSubtitle}>{subtitle}</h3>}
    </div>
    <Button variant="transparent" onClick={onClose} ariaLabel="Close modal">
      <Icon name="circle-x" />
    </Button>
  </div>
);

Modal.Header = ModalHeader;

export default Modal;
