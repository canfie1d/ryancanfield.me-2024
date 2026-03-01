import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import styles from "./Icon.module.scss";

export type LazyLoadSVGProps = {
  name: string;
  size?: "x-small" | "small" | "medium" | "large";
  color?: string;
  className?: string;
};

const isCssColor = (c: string) =>
  c?.startsWith("#") || c?.startsWith("rgb") || c?.startsWith("hsl");

const Icon: React.FC<LazyLoadSVGProps> = ({ name, size = "medium", color = "currentColor" }) => {
  const ref = useRef<React.ComponentType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasValidName = Boolean(name?.trim());

  useEffect(() => {
    setLoading(true);
  }, [name]);

  useEffect(() => {
    if (!hasValidName) {
      ref.current = null;
      setLoading(false);
      return;
    }
    const getSvg = async () => {
      try {
        const icon = await import(`./icons/${name}.svg?react`);
        ref.current = icon.default as React.ComponentType;
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
  }, [name, loading, hasValidName]);

  if (!hasValidName || !ref.current) {
    return null;
  }

  const SVG = ref.current;
  const useInlineColor = isCssColor(color);
  return (
    <div
      className={classNames(
        styles.icon,
        styles[`icon-${size}`],
        !useInlineColor && styles[`icon-${color}`],
      )}
      style={useInlineColor ? { color } : undefined}
    >
      <SVG key={name} />
    </div>
  );
};

export default Icon;
