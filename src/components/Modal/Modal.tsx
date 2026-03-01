import { ReactNode, useEffect, useRef } from "react";
import classNames from "classnames";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { useUiStrings } from "~/hooks/useSanityContent";
import styles from "./Modal.module.scss";
import cn from "classnames";

const Modal = ({
  show,
  header,
  children,
  onClose,
  transformOrigin = "50% calc(100% - 75px)",
  small,
  bottomSheet,
  wide,
}: {
  show: boolean;
  header: ReactNode;
  transformOrigin?: string;
  children: ReactNode;
  onClose?: () => void;
  small?: boolean;
  bottomSheet?: boolean;
  wide?: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = Array.from(modal.querySelectorAll<HTMLElement>(focusableSelectors));
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.88,
      y: 12,
      transformOrigin,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transformOrigin,
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: 8,
      transformOrigin,
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            key="modal-panel"
            className={classNames(
              styles.modal,
              small && styles.modalSmall,
              bottomSheet && styles.modalBottomSheet,
              wide && styles.modalWide,
            )}
            variants={!prefersReducedMotion ? modalVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={
              !prefersReducedMotion ?
                {
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                  mass: 0.8,
                  opacity: { duration: 0.2, ease: "easeOut" },
                }
              : { duration: 0 }
            }
          >
            {header}
            <div className={styles.modalContent}>{children}</div>
          </motion.div>
          <motion.div
            key="modal-backdrop"
            className={styles.modalBackdrop}
            variants={!prefersReducedMotion ? backdropVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
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
}) => {
  const { data: ui } = useUiStrings();
  const ariaCloseModal = ui?.ariaCloseModal ?? "";
  return (
    <div className={styles.modalHeader}>
      <span
        className={styles.modalHeaderIcon}
        aria-hidden
      >
        <Icon
          name={icon}
          size="medium"
        />
      </span>
      <div>
        <h2
          className={cn(styles.modalHeaderTitle, icon === "spray" && styles.modalHeaderTitleSpray)}
        >
          {title}
        </h2>
        {subtitle && <h3 className={styles.modalHeaderSubtitle}>{subtitle}</h3>}
      </div>
      <Button
        variant="transparent"
        onClick={onClose}
        ariaLabel={ariaCloseModal}
      >
        <Icon name="circle-x" />
      </Button>
    </div>
  );
};

Modal.Header = ModalHeader;

export default Modal;
