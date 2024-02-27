import { ChangeEventHandler, MouseEventHandler } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./IconMenu.module.scss";
import { useWindowSize } from "../../hooks/useWindowSize";

const IconMenu = ({
  vertical,
  reverse,
  align,
  actions,
  justify,
}: {
  vertical?: boolean;
  reverse?: boolean;
  align?: "left" | "right";
  justify?: "start" | "end" | "center";
  actions: {
    icon: string;
    label: string;
    href?: string;
    checked?: boolean;
    active?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    target?: string;
  }[];
}) => {
  const isHome = useLocation().pathname === "/";
  const isSmallScreen = useWindowSize().width <= 768;

  const renderColumns = () => {
    return actions.map((action, i) => {
      return (
        <div
          key={i}
          className={classNames(
            styles.iconMenuAction,
            action.active && styles.iconMenuActionActive
          )}
        >
          {action.href ? (
            <Link
              to={action.href}
              aria-label={action.label}
              target={action.target || "_self"}
              className={classNames(
                styles.iconMenuLink,
                reverse && !isHome && !isSmallScreen && styles.iconMenuLinkHome
              )}
              onClick={action.onClick && action.onClick}
            >
              <Icon name={action.icon} size="small" />
            </Link>
          ) : action.onClick ? (
            <Button
              onClick={action.onClick}
              variant="transparent"
              className={classNames(
                styles.iconMenuButton,
                reverse &&
                  !isHome &&
                  !isSmallScreen &&
                  styles.iconMenuButtonHome
              )}
              ariaLabel={action.label}
              disabled={action.disabled}
            >
              <Icon name={action.icon} size="small" />
            </Button>
          ) : (
            <label
              className={classNames(
                styles.iconMenuCheckbox,
                reverse &&
                  !isHome &&
                  !isSmallScreen &&
                  styles.iconMenuCheckboxHome
              )}
            >
              <input
                id={`checkbox-${i + 1}`}
                type="checkbox"
                className="visually-hidden"
                checked={action.checked || false}
                aria-label="Lock color"
                onChange={action.onChange}
                disabled={action.disabled}
              />
              <Icon name={action.checked ? "lock" : "unlock"} size="small" />
            </label>
          )}
        </div>
      );
    });
  };
  return (
    <div
      className={classNames(
        styles.iconMenu,
        align === "left" && styles.iconMenuLeft,
        align === "right" && styles.iconMenuRight,
        justify === "start" && styles.iconMenuStart,
        justify === "end" && styles.iconMenuEnd,
        justify === "center" && styles.iconMenuCenter,
        reverse && styles.iconMenuReverse,
        vertical && styles.iconMenuVertical
      )}
    >
      {renderColumns()}
    </div>
  );
};

export default IconMenu;
