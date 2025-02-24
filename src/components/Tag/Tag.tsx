import { ReactNode } from "react";
import { opacity } from "~/helpers/opacity";
import styles from "./Tag.module.scss";

const Tag = ({
  url,
  textColor,
  backgroundColor,
  children,
}: {
  url?: string;
  textColor: string;
  backgroundColor: string;
  children: ReactNode;
}) => {
  if (url) {
    return (
      <div
        className={styles.tag}
        style={{
          color: textColor,
          backgroundColor: backgroundColor,
        }}
      >
        <a
          className={styles.tagLink}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      </div>
    );
  }
  return (
    <div
      className={styles.tag}
      style={{
        color: textColor,
        backgroundColor: opacity(backgroundColor, 0.5),
      }}
    >
      {children}
    </div>
  );
};

export default Tag;
