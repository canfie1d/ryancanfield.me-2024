import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

const Button = ({
  id,
  active,
  children,
  title,
  type = "button",
  variant,
  disabled,
  onClick,
  onMouseEnter,
  className,
  ariaLabel,
  ariaHidden,
  style,
}: {
  id?: string;
  active?: boolean;
  children: ReactNode;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  variant?:
    | "secondary"
    | "transparent"
    | "transparent-padded"
    | "backdrop"
    | "vanishing"
    | "danger";
  onMouseEnter?: MouseEventHandler;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}) => {
  return (
    <button
      id={id}
      type={type}
      title={title}
      onMouseEnter={(e) => onMouseEnter && onMouseEnter(e)}
      className={cn(
        styles.button,
        variant && styles[`button-${variant}`],
        active && styles["button-active"],
        className && className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
