import { ChangeEventHandler, MouseEventHandler } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import classNames from "classnames";
import { useWindowSize } from "~/hooks/useWindowSize";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { useUiStrings } from "~/hooks/useSanityContent";
import styles from "./IconMenu.module.scss";

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
  const { data: ui } = useUiStrings();
  const ariaLockColor = ui?.ariaLockColor ?? "";

  const renderColumns = () => {
    return actions.map((action, i) => {
      return (
        <div
          key={i}
          className={classNames(
            styles.iconMenuAction,
            action.active && styles.iconMenuActionActive,
          )}
        >
          {action.href ?
            action.href.startsWith("http") ?
              <a
                href={action.href}
                aria-label={action.label}
                target={action.target || "_blank"}
                rel="noreferrer"
                className={classNames(
                  styles.iconMenuLink,
                  reverse && !isHome && !isSmallScreen && styles.iconMenuLinkHome,
                )}
                onClick={action.onClick ? action.onClick : undefined}
              >
                <Icon
                  name={action.icon}
                  size="small"
                />
              </a>
            : <Link
                to={action.href as string}
                aria-label={action.label}
                target={action.target || "_self"}
                className={classNames(
                  styles.iconMenuLink,
                  reverse && !isHome && !isSmallScreen && styles.iconMenuLinkHome,
                )}
                onClick={action.onClick ? action.onClick : undefined}
              >
                <Icon
                  name={action.icon}
                  size="small"
                />
              </Link>

          : action.onClick ?
            <Button
              onClick={action.onClick}
              variant="transparent"
              className={classNames(
                styles.iconMenuButton,
                reverse && !isHome && !isSmallScreen && styles.iconMenuButtonHome,
              )}
              ariaLabel={action.label}
              disabled={action.disabled}
            >
              <Icon
                name={action.icon}
                size="small"
              />
            </Button>
          : <label
              className={classNames(
                styles.iconMenuCheckbox,
                reverse && !isHome && !isSmallScreen && styles.iconMenuCheckboxHome,
              )}
            >
              <input
                id={`checkbox-${i + 1}`}
                type="checkbox"
                className="visually-hidden"
                checked={action.checked || false}
                aria-label={action.label || ariaLockColor}
                onChange={action.onChange}
                disabled={action.disabled}
              />
              <Icon
                name={action.checked ? "lock" : "unlock"}
                size="small"
              />
            </label>
          }
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
        vertical && styles.iconMenuVertical,
      )}
    >
      {renderColumns()}
    </div>
  );
};

export default IconMenu;
