import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAchievementContext } from "../contexts/AchievementProvider";

export const useShortcuts = () => {
  const navigate = useNavigate();
  const [kCode, setKCode] = useState<string>("");
  const { hasAchievement, addAchievement } = useAchievementContext();

  useEffect(() => {
    if (kCode.toLowerCase() === "↑↑↓↓←→←→ba") {
      addAchievement("konami_code");
    }
  }, [kCode]);

  const shortcutPressed = () => {
    if (!hasAchievement("power_user")) {
      addAchievement("power_user");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasAchievement("konami_code")) {
        setKCode((prevCode) => {
          let key = e.key;

          switch (key) {
            case "ArrowLeft":
              key = "←";
              break;
            case "ArrowRight":
              key = "→";
              break;
            case "ArrowDown":
              key = "↓";
              break;
            case "ArrowUp":
              key = "↑";
              break;
            case "b":
            case "a":
              break;
            default:
              return "";
          }

          return prevCode.concat(key);
        });
      }

      switch (e.key) {
        case "0":
          shortcutPressed();
          navigate("/");
          break;
        case "1":
          shortcutPressed();
          navigate("/about");
          break;
        case "2":
          shortcutPressed();
          navigate("/work");
          break;
        case "3":
          shortcutPressed();
          navigate("/writing");
          break;
        case "4":
          shortcutPressed();
          navigate("/contact");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
