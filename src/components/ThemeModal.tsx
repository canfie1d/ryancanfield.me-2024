import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import { useWindowSize } from "~/hooks/useWindowSize";
import { useUiStrings } from "~/hooks/useSanityContent";
import ThemeMenu from "~/components/ThemePanel/ThemeMenu";
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import styles from "./ThemeModal.module.scss";

const ThemeModal = ({
  open,
  handleCloseClick,
}: {
  open: boolean;
  handleCloseClick: () => void;
}) => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const { data: ui } = useUiStrings();
  const themeTitle = ui?.themeModalTitle ?? "";
  const ariaCloseModal = ui?.ariaCloseModal ?? "";

  const getTriggerLocation = () => {
    if (isSmallScreen) {
      if (pathname === "/") {
        return "10% 180%";
      }
      return "100% 190%";
    }
    return "180% -65%";
  };

  if (typeof document === "undefined") return null;

  return (
    <>
      {createPortal(
        <Modal
          show={open}
          onClose={handleCloseClick}
          transformOrigin={getTriggerLocation()}
          small
          bottomSheet
          header={
            <div className={styles.modalHeader}>
              <span
                className={styles.modalHeaderIcon}
                aria-hidden
              >
                <Icon
                  name="spray"
                  size="medium"
                />
              </span>
              <div className={styles.modalHeaderText}>
                <h2 className={styles.modalHeaderTitle}>{themeTitle}</h2>
              </div>
              <Button
                variant="transparent"
                onClick={handleCloseClick}
                ariaLabel={ariaCloseModal}
              >
                <Icon name="circle-x" />
              </Button>
            </div>
          }
        >
          <ThemeMenu showHeader={false} />
        </Modal>,
        document.body,
        "theme-modal",
      )}
    </>
  );
};

export default ThemeModal;
