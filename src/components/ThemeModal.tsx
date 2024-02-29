import { createPortal } from "react-dom";
import { useWindowSize } from "../hooks/useWindowSize";
import ThemeMenu from "./ThemePanel/ThemeMenu";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";

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

  const getTriggerLocation = () => {
    if (isSmallScreen) {
      if (pathname === "/") {
        return "10% 180%";
      }
      return "100% 190%";
    }
    return "180% -65%";
  };

  return (
    <>
      {createPortal(
        <Modal
          show={open}
          onClose={handleCloseClick}
          transformOrigin={getTriggerLocation()}
          small
          header={
            <Modal.Header
              title="themes"
              icon="spray"
              onClose={handleCloseClick}
            />
          }
        >
          <ThemeMenu showHeader={false} />
        </Modal>,
        document.body,
        "theme-modal"
      )}
    </>
  );
};

export default ThemeModal;
