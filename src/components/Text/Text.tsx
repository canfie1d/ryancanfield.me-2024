import { CSSProperties, ReactNode } from "react";
import cn from "classnames";
import styles from "./Text.module.scss";

const Text = ({
  as = "p",
  size = "medium",
  color,
  children,
  className,
  style,
}: {
  as?: "p" | "span";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  color?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) => {
  const Element = as;

  const classNames = cn([styles.text, styles[size], className]);

  return (
    <Element className={classNames} style={{ ...style, color }}>
      {children}
    </Element>
  );
};

export default Text;
