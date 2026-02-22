import { useEffect, useRef, memo } from "react";

declare global {
  interface Window {
    wait: (ms: number) => Promise<void>;
    lore: () => string;
    yes: () => void;
    no: () => string;
    help: () => void;
    achievements: () => void;
    look: () => string;
    go: () => string;
    inventory: () => string;
  }
}

import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useJewelDiscoveryStore, hasUsedAllConsoleCommands } from "~/stores/jewel-discovery";
import { useAbout, useUiStrings } from "~/hooks/useSanityContent";
import { textFallOff } from "~/helpers/textFallOff";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import Tabs from "~/components/Tabs";
import PortableText from "~/components/PortableText";

type AboutData = {
  meBio?: unknown[] | null;
  siteBio?: unknown[] | null;
  metaText?: string | null;
  metaCodeHint?: string | null;
  resumeUrl?: string | null;
  tabLabelMe?: string | null;
  tabLabelSite?: string | null;
  lorePrompt?: string | null;
  loreYes?: string | null;
  loreLook?: string | null;
  loreGo?: string | null;
  loreNo?: string | null;
  loreInventoryEmpty?: string | null;
  loreInventoryKey?: string | null;
  loreInventoryList?: string | null;
};

const AboutContent = () => {
  const codeRef = useRef<HTMLDivElement>(null);
  const viewed = useRef<boolean>(false);

  const inView = useIntersectionObserver(codeRef?.current);

  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const addItem = useInventoryStore((store) => store.addItem);
  const hasItem = useInventoryStore((store) => store.hasItem);
  const consoleCommandsUsed = useJewelDiscoveryStore((store) => store.consoleCommandsUsed);

  const { data, isLoading } = useAbout();
  const { data: ui } = useUiStrings();
  const about = data as AboutData | undefined;

  useEffect(() => {
    const lore = {
      prompt: about?.lorePrompt ?? "",
      yes: about?.loreYes ?? "",
      look: about?.loreLook ?? "",
      go: about?.loreGo ?? "",
      no: about?.loreNo ?? "",
      inventoryEmpty: about?.loreInventoryEmpty ?? "",
      inventoryKey: about?.loreInventoryKey ?? "",
      inventoryList: about?.loreInventoryList ?? "",
    };

    // Console functions for curious visitors.
    window.lore = () => {
      window.yes = () => {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
        window.look = () => {
          useJewelDiscoveryStore.getState().markConsoleCommand("look");
          return lore.look;
        };
        window.go = () => {
          useJewelDiscoveryStore.getState().markConsoleCommand("go");
          if (!hasAchievement("wanderer")) {
            addAchievement("wanderer");
          }
          return lore.go;
        };
        window.inventory = () => {
          useJewelDiscoveryStore.getState().markConsoleCommand("inventory");
          const { addItem, hasItem } = useInventoryStore.getState();
          if (!hasItem("key")) {
            addItem("key");
            return lore.inventoryKey;
          }
          const { items, getItem } = useInventoryStore.getState();
          if (items.length === 0) return lore.inventoryEmpty;
          const names = items.map((id) => getItem(id)?.name ?? id).join(", ");
          return lore.inventoryList.replace("{names}", names);
        };
        return lore.yes;
      };
      window.no = () => lore.no;
      return lore.prompt;
    };

    window.help = () => {
      useJewelDiscoveryStore.getState().markConsoleCommand("help");
      if (!hasAchievement("finders_keepers")) {
        addAchievement("finders_keepers");
      }
    };

    window.achievements = () => {
      useJewelDiscoveryStore.getState().markConsoleCommand("achievements");
      if (!hasAchievement("finders_keepers")) {
        addAchievement("finders_keepers");
      }
    };

    window.wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  }, [hasAchievement, addAchievement, about]);

  useEffect(() => {
    if (codeRef.current) {
      if (inView && !viewed.current) {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
      }
    }
  }, [inView, addAchievement, hasAchievement]);

  useEffect(() => {
    if (!hasAchievement("about_face")) {
      addAchievement("about_face");
    }
  }, [addAchievement, hasAchievement]);

  useEffect(() => {
    if (
      hasAchievement("the_journey_begins") &&
      hasUsedAllConsoleCommands() &&
      !hasItem("jewel-about")
    ) {
      addItem("jewel-about");
    }
  }, [
    hasAchievement,
    hasItem,
    addItem,
    consoleCommandsUsed.look,
    consoleCommandsUsed.go,
    consoleCommandsUsed.inventory,
    consoleCommandsUsed.help,
    consoleCommandsUsed.achievements,
  ]);

  const options = [
    { id: "me", label: about?.tabLabelMe ?? "" },
    { id: "site", label: about?.tabLabelSite ?? "" },
  ];

  if (isLoading || !about) {
    return (
      <div className="contentBody">
        <p>{ui?.loadingText ?? ""}</p>
      </div>
    );
  }

  return (
    <div className="contentBody">
      <Tabs
        pageName="about"
        options={options}
      >
        <div id="me">
          <PortableText
            value={about.meBio}
            resumeUrl={about.resumeUrl}
          />
        </div>
        <div id="site">
          <PortableText
            value={about.siteBio}
            resumeUrl={about.resumeUrl}
          />
          {(about.metaText || about.metaCodeHint) && (
            <>
              <h2>{ui?.aboutSectionMeta ?? ""}</h2>
              {about.metaText && <p>{textFallOff(about.metaText, 9)}</p>}
              {about.metaCodeHint && (
                <div ref={codeRef}>
                  <code className="inlineBlock">{about.metaCodeHint}</code>
                </div>
              )}
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default memo(AboutContent);
