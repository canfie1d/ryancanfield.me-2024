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
  type?: "achievement" | "alert";
}) => {
  const hasFocus = document.hasFocus();
  const closingTime = closeTime && closeTime < 2400 ? closeTime : 2400;

  useEffect(() => {
    if (open && closingTime && hasFocus) {
      const timeoutId = setTimeout(onClose, closingTime);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open, hasFocus, closingTime, onClose]);

  return (
    <>
      {createPortal(
        open && (
          <div
            className={classNames(styles.toast, type && styles[`${type}Toast`])}
            style={{ animationDuration: `${closingTime}ms` }}
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
