import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAchievementStore } from "~/stores/achievements";

export const useShortcuts = () => {
  const navigate = useNavigate();
  const [kCode, setKCode] = useState<string>("");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (kCode.toLowerCase() === "↑↑↓↓←→←→ba") {
      addAchievement("konami_code");
    } else if (!"↑↑↓↓←→←→ba".startsWith(kCode.toLowerCase())) {
      setKCode("");
    }
  }, [kCode, addAchievement]);

  useEffect(() => {
    const shortcutPressed = () => {
      if (!hasAchievement("power_user")) {
        addAchievement("power_user");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const formFocused = Array.from(document.forms).some((form) => {
        return form.contains(document.activeElement);
      });
      if (formFocused) return;

      if (e.ctrlKey || e.metaKey) return;
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
          navigate({ to: "/" });
          break;
        case "1":
          shortcutPressed();
          navigate({ to: "/about" });
          break;
        case "2":
          shortcutPressed();
          navigate({ to: "/work" });
          break;
        case "3":
          shortcutPressed();
          navigate({ to: "/writing" });
          break;
        case "4":
          shortcutPressed();
          navigate({ to: "/contact" });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addAchievement, hasAchievement, navigate]);
};
