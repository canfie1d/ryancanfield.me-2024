import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "../styles/card.module.scss";

const Card = ({
  title,
  href,
  opensInNewPage,
  className,
  children,
}: {
  title: string;
  href?: string;
  opensInNewPage?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={classNames(styles.card, className)}>
      {href ? (
        <Link to={href as string} target={opensInNewPage ? "_blank" : "_self"}>
          <h3 className={styles.h3}>{title}</h3>
          {children}
        </Link>
      ) : (
        <div>
          <h3 className={styles.h3}>{title}</h3>
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;
