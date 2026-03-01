import { PageNames } from "~/data/themeConfig";
import { useGameModeStore } from "~/stores/game-mode";
import { usePageContent } from "~/hooks/useSanityContent";

export const usePageMeta = (pageName: PageNames) => {
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive = activeGameModes[pageName as keyof typeof activeGameModes];

  const { data: pageContent } = usePageContent(pageName);

  const title = pageContent?.title ?? "";
  const subtitle = pageContent?.subtitle ?? "";
  const icon = pageContent?.icon ?? "";
  const gameTitle = pageContent?.gameTitle ?? "";
  const gameSubtitle = pageContent?.gameSubtitle ?? "";
  const gameIcon = pageContent?.gameIcon ?? "";

  const useGame = gameModeActive;

  return {
    title: useGame ? gameTitle : title,
    subtitle: useGame ? gameSubtitle : subtitle,
    icon: useGame ? gameIcon : icon,
  };
};
