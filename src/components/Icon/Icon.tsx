import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import styles from "./Icon.module.scss";

export type LazyLoadSVGProps = {
  name: string;
  size?: "x-small" | "small" | "medium" | "large";
  color?: string;
  className?: string;
};

const Icon: React.FC<LazyLoadSVGProps> = ({
  name,
  size = "medium",
  color = "currentColor",
}) => {
  const ref = useRef<React.JSXElementConstructor<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  }, [name]);

  useEffect(() => {
    const getSvg = async () => {
      try {
        const icon = await import(`./icons/${name}.svg?react`);
        ref.current =
          icon.default as unknown as React.JSXElementConstructor<any>;
        setLoading(false);
      } catch (error) {
        console.error(error);
        ref.current = null;
        setLoading(false);
      }
    };
    if (loading) {
      getSvg();
    }
  }, [name, loading]);

  if (ref.current) {
    const SVG = ref.current;

    return (
      <div
        className={classNames(
          styles.icon,
          styles[`icon-${size}`],
          styles[`icon-${color}`]
        )}
      >
        <SVG />
      </div>
    );
  }

  return null;
};

export default Icon;
