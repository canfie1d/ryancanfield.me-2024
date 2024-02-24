import { ReactNode } from "react";
import styles from "./Tag.module.scss";

const Tag = ({ url, children }: { url?: string; children: ReactNode }) => {
  if (url) {
    return (
      <div className={styles.tag}>
        <a className={styles.tagLink} href={url} target="_blank">
          {children}
        </a>
      </div>
    );
  }
  return <div className={styles.tag}>{children}</div>;
};

export default Tag;
