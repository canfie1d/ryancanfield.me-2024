import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button from "../Button";
import styles from "./Card.module.scss";

const Card = ({
  type,
  variant,
  title,
  href,
  onClick,
  opensInNewPage,
  className,
  smallTitle,
  centerTitle,
  footer,
  children,
}: {
  title: string;
  type?: "achievement" | "article";
  variant?: "disabled";
  href?: string;
  onClick?: () => void;
  opensInNewPage?: boolean;
  className?: string;
  smallTitle?: boolean;
  centerTitle?: boolean;
  footer?: ReactNode;
  children: ReactNode;
}) => {
  const headerStyles = classNames(
    styles.h3,
    smallTitle && styles.smallTitle,
    centerTitle && styles.centerTitle
  );

  const body = (
    <div className={styles.body}>
      <h3 className={headerStyles}>{title}</h3>
      <div>{children}</div>
      {footer}
    </div>
  );

  return (
    <div
      className={classNames(
        styles.card,
        type && styles[`${type}Card`],
        variant && styles[`${variant}Card`],
        className
      )}
    >
      {href ? (
        <Link
          to={href as string}
          className={styles.cardContent}
          target={opensInNewPage ? "_blank" : "_self"}
          onClick={onClick}
        >
          {body}
        </Link>
      ) : onClick ? (
        <Button
          variant="transparent"
          onClick={onClick}
          className={styles.cardContent}
        >
          {body}
        </Button>
      ) : (
        <div className={styles.cardContent}>{body}</div>
      )}
    </div>
  );
};

const CardWrapper = ({
  columns,
  children,
}: {
  columns?: number;
  children: ReactNode;
}) => {
  return (
    <div
      className={classNames(
        styles.cardWrapper,
        columns && styles[`cardWrapper-${columns}col`]
      )}
    >
      {children}
    </div>
  );
};

Card.Wrapper = CardWrapper;

export default Card;
