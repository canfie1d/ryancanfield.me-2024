import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, metaKey, ctrlKey } = e;
      if (metaKey && ctrlKey) {
        switch (key) {
          case "0":
            navigate("/");
            break;
          case "1":
            navigate("/about");
            break;
          case "2":
            navigate("/work");
            break;
          case "3":
            navigate("/writing");
            break;
          case "4":
            navigate("/contact");
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
