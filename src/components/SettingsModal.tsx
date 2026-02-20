import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useAchievementStore } from "~/stores/achievements";

import { useWindowSize } from "~/hooks/useWindowSize";
import Toggle from "~/components/Toggle";
import Modal from "~/components/Modal";
// import LogInButton from "~/components/LogInButton";
import Button from "~/components/Button";
import { useGameModeStore } from "~/stores/game-mode";

const SettingsModal = ({
  open,
  handleCloseClick,
}: {
  open: boolean;
  handleCloseClick: () => void;
}) => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();

  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const setGameMode = useGameModeStore((store) => store.setGameMode);
  const loadingAchievements = useAchievementStore(
    (store) => store.loadingAchievements
  );
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const resetAchievements = useAchievementStore(
    (store) => store.resetAchievements
  );
  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    if (open && !loadingAchievements && !hasAchievement("picky_picky")) {
      addAchievement("picky_picky");
    }
  }, [open]);

  const handleSetSettings = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    switch (type) {
      case "gameMode":
        const name = e.target.name;
        const value = e.target.checked;
        setGameMode({ [name]: value } as any);
        break;
    }
  };

  const getTriggerLocation = () => {
    if (width <= 768) {
      if (pathname === "/") {
        return "23% 108%";
      }
      return "107% 115%";
    }
    if (pathname === "/") {
      return "170% 0";
    }
    return "180% 5%";
  };

  const handleResetAchievements = () => {
    resetAchievements();
    setDeletePending(false);
    handleCloseClick();
  };

  const handleSetDeletePending = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeletePending(e.target.checked);
    if (!loadingAchievements && !hasAchievement("chalice")) {
      addAchievement("chalice");
    }
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
              title="settings"
              icon="gamepad"
              onClose={handleCloseClick}
            />
          }
        >
          {/* <LogInButton className="mb-2" /> */}
          <Toggle
            id="about-game-panel"
            name="about"
            label="About Page Game Mode"
            description="Replaces the about content with game GUI"
            checked={activeGameModes?.about || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="work-game-panel"
            name="work"
            label="Work Page Game Mode"
            description="Replaces the work content with game GUI"
            checked={activeGameModes?.work || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="writing-game-panel"
            name="writing"
            label="Writing Page Game Mode"
            description="Replaces the writing content with game GUI"
            checked={activeGameModes?.writing || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="contact-game-panel"
            name="contact"
            label="Contact Page Game Mode"
            description="Replaces the contact content with game GUI"
            checked={activeGameModes?.contact || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="delete-progress"
            name="deleteProgress"
            label="Delete All Progress"
            description="Deletes all achievements and progress"
            checked={deletePending}
            onChange={handleSetDeletePending}
            style={{ marginBottom: "var(--spacing-unit-half)" }}
          />
          {deletePending && (
            <div
              style={{
                display: "inline-flex",
                gap: "var(--spacing-unit-half)",
                marginLeft: "var(--spacing-unit-quad)",
              }}
            >
              <Button onClick={() => setDeletePending(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleResetAchievements}>
                Delete
              </Button>
            </div>
          )}
        </Modal>,
        document.body,
        "settings-modal"
      )}
    </>
  );
};

export default SettingsModal;
