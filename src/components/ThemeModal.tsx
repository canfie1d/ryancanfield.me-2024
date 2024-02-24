import { createPortal } from "react-dom";
import { useWindowSize } from "../hooks/useWindowSize";
import ThemeMenu from "./ThemePanel/ThemeMenu";
import Modal from "./Modal";

const ThemeModal = ({
  open,
  handleCloseClick,
}: {
  open: boolean;
  handleCloseClick: () => void;
}) => {
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;

  return (
    <>
      {createPortal(
        <Modal
          show={open}
          onClose={handleCloseClick}
          transformOrigin={
            isSmallScreen ? "50% 250%" : "calc(200% - 75px) calc(-100% + 75px)"
          }
          small
          header={
            <Modal.Header
              title="themes"
              icon="palette"
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
