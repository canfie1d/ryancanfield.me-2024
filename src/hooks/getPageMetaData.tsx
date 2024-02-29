import { useGameModeContext } from "../contexts/GameModeProvider";

import { PageNames } from "../data/themeConfig";

export const useGetPageMeta = (pageName: PageNames) => {
  const { activeGameModes } = useGameModeContext();
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
