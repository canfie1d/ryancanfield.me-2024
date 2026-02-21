import { PageNames } from "~/data/themeConfig";
import { useGameModeStore } from "~/stores/game-mode";

export const usePageMeta = (pageName: PageNames) => {
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive =
    activeGameModes[pageName as keyof typeof activeGameModes];

  switch (pageName) {
    case "about":
      return {
        title: gameModeActive ? "welcome to Eryndor" : "about",
        subtitle: gameModeActive ? "" : "",
        icon: gameModeActive ? "map" : "signs",
      };
    case "work":
      return {
        title: gameModeActive ? "the hall of triumphs" : "work",
        subtitle: gameModeActive ? "" : "case studies",
        icon: gameModeActive ? "hall" : "apps",
      };
    case "writing":
      return {
        title: gameModeActive ? "progress log" : "writing",
        subtitle: gameModeActive ? "" : "selected articles",
        icon: gameModeActive ? "bow" : "writing",
      };
    case "contact":
      return {
        title: gameModeActive ? "send word back home" : "contact",
        subtitle: gameModeActive ? "" : "get in touch",
        icon: gameModeActive ? "scroll" : "satellite",
      };
    default:
      return {
        title: "",
        subtitle: "",
        icon: "",
      };
  }
};
