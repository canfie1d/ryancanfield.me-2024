import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAchievementContext } from "../contexts/AchievementProvider";
import {
  GameModePayload,
  useGameModeContext,
} from "../contexts/GameModeProvider";
import Toggle from "./Toggle/Toggle";
import Modal from "./Modal";
import LogInButton from "./LogInButton";
import { useWindowSize } from "../hooks/useWindowSize";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const SettingsModal = ({
  open,
  handleCloseClick,
}: {
  open: boolean;
  handleCloseClick: () => void;
}) => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const { activeGameModes, setGameMode } = useGameModeContext();
  const {
    loadingAchievements,
    hasAchievement,
    addAchievement,
    resetAchievements,
  } = useAchievementContext();
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
        // @todo typings are wrong here
        // const val: GameModePayload = { [name]: value };
        setGameMode({ [name]: value } as GameModePayload);
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
          <LogInButton className="mb-2" />
          <Toggle
            id="about-game-panel"
            name="about"
            label="About Page Game Mode"
            description="Replaces the about content with character GUI"
            checked={activeGameModes?.about || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="work-game-panel"
            name="work"
            label="Work Page Game Mode"
            description="Replaces the work content with achievements GUI"
            checked={activeGameModes?.work || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="writing-game-panel"
            name="writing"
            label="Writing Page Game Mode"
            description="Replaces the writing content with progress/activity log GUI"
            checked={activeGameModes?.writing || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="contact-game-panel"
            name="contact"
            label="Contact Page Game Mode"
            description="Replaces the contact content with feedback/bug report GUI"
            checked={activeGameModes?.contact || false}
            onChange={(e) => handleSetSettings(e, "gameMode")}
          />
          <Toggle
            id="delete-progress"
            name="deleteProgress"
            label="Delete All Progress"
            description="Deletes all achievements and progress"
            checked={deletePending}
            onChange={(e) => setDeletePending(e.target.checked)}
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
              <Button variant="danger" onClick={resetAchievements}>
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
