import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import Toggle from "~/components/Toggle";
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { useGameModeStore } from "~/stores/game-mode";
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

  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const setGameMode = useGameModeStore((store) => store.setGameMode);
  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const resetAchievements = useAchievementStore((store) => store.resetAchievements);
  const resetInventory = useInventoryStore((store) => store.resetInventory);
  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    if (open && !loadingAchievements && !hasAchievement("picky_picky")) {
      addAchievement("picky_picky");
    }
  }, [open]);

  const handleSetSettings = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    switch (type) {
      case "gameMode":
        const name = e.target.name;
        const value = e.target.checked;
        setGameMode({ [name]: value } as any);
        // Check if all modes will be active after this toggle
        const updatedModes = { ...activeGameModes, [name]: value };
        if (Object.values(updatedModes).every(Boolean)) {
          if (!hasAchievement("wield")) {
            addAchievement("wield");
          }
        }
        break;
    }
  };

  const getTriggerLocation = () => {
    if (pathname === "/") return "23% 108%";
    return "107% 115%";
  };

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
                <h2 className={styles.modalHeaderTitle}>settings</h2>
                <h3 className={styles.modalHeaderSubtitle}>Game modes</h3>
              </div>
              <Button
                variant="transparent"
                onClick={handleCloseClick}
                ariaLabel="Close modal"
              >
                <Icon name="circle-x" />
              </Button>
            </div>
          }
        >
          <div className={styles.toggleList}>
            <div className={styles.toggleRow}>
              <Toggle
                id="about-game-panel"
                name="about"
                label="About Page Game Mode"
                description="Replaces the about content with character GUI"
                checked={activeGameModes?.about || false}
                onChange={(e) => handleSetSettings(e, "gameMode")}
              />
            </div>
            <div className={styles.toggleRow}>
              <Toggle
                id="work-game-panel"
                name="work"
                label="Work Page Game Mode"
                description="Replaces the work content with achievements GUI"
                checked={activeGameModes?.work || false}
                onChange={(e) => handleSetSettings(e, "gameMode")}
              />
            </div>
            <div className={styles.toggleRow}>
              <Toggle
                id="writing-game-panel"
                name="writing"
                label="Writing Page Game Mode"
                description="Replaces the writing content with progress/activity log GUI"
                checked={activeGameModes?.writing || false}
                onChange={(e) => handleSetSettings(e, "gameMode")}
              />
            </div>
            <div className={styles.toggleRow}>
              <Toggle
                id="contact-game-panel"
                name="contact"
                label="Contact Page Game Mode"
                description="Replaces the contact content with feedback/bug report GUI"
                checked={activeGameModes?.contact || false}
                onChange={(e) => handleSetSettings(e, "gameMode")}
              />
            </div>
            <div
              className={classNames(styles.toggleRow, styles.toggleRowFull, styles.toggleRowDanger)}
            >
              <Toggle
                id="delete-progress"
                name="deleteProgress"
                label="Delete All Progress"
                description="Deletes all achievements and progress"
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
                  <Button onClick={() => setDeletePending(false)}>Cancel</Button>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      await resetAchievements();
                      resetInventory();
                    }}
                  >
                    Delete
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
