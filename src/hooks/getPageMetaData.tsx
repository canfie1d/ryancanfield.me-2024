import { PageNames } from "~/data/themeConfig";
import { useGameModeStore } from "~/stores/game-mode";

export const useGetPageMeta = (pageName: PageNames) => {
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive =
    activeGameModes[pageName as keyof typeof activeGameModes];

  switch (pageName) {
    case "about":
      return {
        title: gameModeActive ? "character" : "about",
        subtitle: gameModeActive ? "" : "",
        icon: gameModeActive ? "user" : "signs",
      };
    case "work":
      return {
        title: gameModeActive ? "achievements" : "work",
        subtitle: gameModeActive ? "" : "case studies",
        icon: gameModeActive ? "cert" : "apps",
      };
    case "writing":
      return {
        title: gameModeActive ? "activity log" : "writing",
        subtitle: gameModeActive ? "" : "selected articles",
        icon: gameModeActive ? "bow" : "writing",
      };
    case "contact":
      return {
        title: gameModeActive ? "feedback" : "contact",
        subtitle: gameModeActive ? "" : "get in touch",
        icon: gameModeActive ? "adjustments" : "satellite",
      };
    default:
      return {
        title: "",
        subtitle: "",
        icon: "",
      };
  }
};
