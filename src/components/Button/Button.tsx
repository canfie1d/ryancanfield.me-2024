import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";
import { PageNames } from "~/data/themeConfig";
import { getColorsFromTheme } from "~/helpers/getColorsFromTheme";

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
  pageName,
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
  pageName?: PageNames;
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
  let colors = {
    textColor: "var(--unremarkable-dark-gray)",
    backgroundColor: "var(--transparent-white)",
  };

  if (pageName) {
    const { textColor, backgroundColor } = getColorsFromTheme(pageName);
    colors = { textColor, backgroundColor };
  }

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
        Boolean(className) && className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      disabled={disabled}
      style={
        variant === "transparent" ||
        variant === "backdrop" ||
        variant === "danger"
          ? style
          : {
              color: colors.backgroundColor,
              backgroundColor: colors.textColor,
              ...style,
            }
      }
    >
      {children}
    </button>
  );
};

export default Button;
