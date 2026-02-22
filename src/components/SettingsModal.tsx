import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useUiStrings } from "~/hooks/useSanityContent";
import { useJewelSocketStore } from "~/stores/jewel-sockets";
import { useJewelDiscoveryStore } from "~/stores/jewel-discovery";
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Toggle from "~/components/Toggle";
import { JEWEL_SOCKET_PAGES, JEWEL_FOR_PAGE, INVENTORY_ITEMS } from "~/data/inventory";
import classNames from "classnames";
import styles from "./SettingsModal.module.scss";

const SettingsModal = ({
  open,
  handleCloseClick,
}: {
  open: boolean;
  handleCloseClick: () => void;
}) => {
  const { pathname } = useLocation();
  const { data: ui } = useUiStrings();

  const placeJewel = useJewelSocketStore((store) => store.placeJewel);
  const removeJewel = useJewelSocketStore((store) => store.removeJewel);
  const isJewelPlaced = useJewelSocketStore((store) => store.isJewelPlaced);
  const resetJewelSockets = useJewelSocketStore((store) => store.resetJewelSockets);

  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const resetAchievements = useAchievementStore((store) => store.resetAchievements);
  const resetInventory = useInventoryStore((store) => store.resetInventory);
  const hasItem = useInventoryStore((store) => store.hasItem);

  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    if (open && !loadingAchievements && !hasAchievement("picky_picky")) {
      addAchievement("picky_picky");
    }
  }, [open, addAchievement, hasAchievement, loadingAchievements]);

  const getTriggerLocation = () => {
    if (pathname === "/") return "23% 108%";
    return "107% 115%";
  };

  const resetJewelDiscovery = useJewelDiscoveryStore((store) => store.reset);

  const handleDeleteProgress = async () => {
    resetJewelSockets();
    resetJewelDiscovery();
    await resetAchievements();
    resetInventory();
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
          wide
          bottomSheet
          header={
            <div className={styles.modalHeader}>
              <span
                className={styles.modalHeaderIcon}
                aria-hidden
              >
                <Icon
                  name="gamepad"
                  size="medium"
                />
              </span>
              <div className={styles.modalHeaderText}>
                <h2 className={styles.modalHeaderTitle}>{ui?.settingsTitle ?? ""}</h2>
                <h3 className={styles.modalHeaderSubtitle}>
                  {ui?.settingsSubtitle ?? "Place jewels in their sockets to reveal new paths"}
                </h3>
              </div>
              <Button
                variant="transparent"
                onClick={handleCloseClick}
                ariaLabel={ui?.ariaCloseModal ?? ""}
              >
                <Icon name="circle-x" />
              </Button>
            </div>
          }
        >
          <div className={styles.socketList}>
            {JEWEL_SOCKET_PAGES.map((page) => {
              const jewelId = JEWEL_FOR_PAGE[page];
              const placed = isJewelPlaced(page);
              const hasJewel = hasItem(jewelId);
              const label =
                page === "about" ? (ui?.settingsToggleAbout ?? "About")
                : page === "work" ? (ui?.settingsToggleWork ?? "Work")
                : page === "writing" ? (ui?.settingsToggleWriting ?? "Writing")
                : (ui?.settingsToggleContact ?? "Contact");
              const jewel = INVENTORY_ITEMS[jewelId];
              const jewelName = jewel?.name ?? "jewel";
              const desc = `Place the ${jewelName} to reveal this path`;

              return (
                <div
                  key={page}
                  className={classNames(
                    styles.socketRow,
                    placed && styles.socketRowFilled,
                    hasJewel && !placed && styles.socketRowAvailable,
                  )}
                >
                  <div className={styles.socketInfo}>
                    <span className={styles.socketLabel}>{label}</span>
                    <span className={styles.socketDesc}>{desc}</span>
                  </div>
                  <div className={styles.socketSlot}>
                    {placed ?
                      <button
                        type="button"
                        className={styles.socketButton}
                        onClick={() => removeJewel(page)}
                        aria-label={`Remove jewel from ${label} socket`}
                        title="Click to remove jewel"
                      >
                        <Icon
                          name="jewel"
                          size="small"
                        />
                      </button>
                    : hasJewel ?
                      <button
                        type="button"
                        className={styles.socketButton}
                        onClick={() => placeJewel(page)}
                        aria-label={`Place jewel in ${label} socket`}
                        title="Click to place jewel"
                      >
                        <span className={styles.socketEmpty}>+</span>
                      </button>
                    : <span
                        className={styles.socketEmpty}
                        aria-hidden
                        title="Find the jewel to unlock this mode"
                      >
                        ◇
                      </span>
                    }
                  </div>
                </div>
              );
            })}
            <div
              className={classNames(styles.toggleRow, styles.toggleRowFull, styles.toggleRowDanger)}
            >
              <Toggle
                id="delete-progress"
                name="deleteProgress"
                label={String(ui?.settingsToggleDelete ?? "")}
                description={String(ui?.settingsToggleDeleteDesc ?? "")}
                danger
                checked={deletePending}
                onChange={(e) => {
                  setDeletePending(e.target.checked);
                  if (e.target.checked && !hasAchievement("chalice")) {
                    addAchievement("chalice");
                  }
                }}
              />
              {deletePending && (
                <div className={styles.deleteActions}>
                  <Button onClick={() => setDeletePending(false)}>
                    {String(ui?.settingsButtonCancel ?? "")}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      await handleDeleteProgress();
                      setDeletePending(false);
                    }}
                  >
                    {String(ui?.settingsButtonDelete ?? "")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Modal>,
        document.body,
        "settings-modal",
      )}
    </>
  );
};

export default SettingsModal;
