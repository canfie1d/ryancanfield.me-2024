import { MouseEventHandler, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import styles from "./Toast.module.scss";

const Toast = ({
  open,
  children,
  onClose,
  closeTime,
  type,
}: {
  open: boolean;
  children: ReactNode;
  onClose: MouseEventHandler;
  closeTime?: number;
  type?: "achievement";
}) => {
  const hasFocus = document.hasFocus();

  useEffect(() => {
    if (open && closeTime && hasFocus) {
      setTimeout(onClose, closeTime);
    }
    return () => {
      if (open && closeTime) {
        clearTimeout(closeTime);
      }
    };
  }, [open, hasFocus]);

  return (
    <>
      {createPortal(
        open && (
          <div
            className={classNames(styles.toast, type && styles[`${type}Toast`])}
          >
            {children}
          </div>
        ),
        document.body,
        "toast"
      )}
    </>
  );
};

export default Toast;
