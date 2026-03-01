import { useEffect, useRef, memo } from "react";

declare global {
  interface Window {
    wait: (ms: number) => Promise<void>;
    lore: () => string;
    yes: () => void;
    no: () => string;
  }
}

import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useAbout, useUiStrings } from "~/hooks/useSanityContent";
import { textFallOff } from "~/helpers/textFallOff";
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
  loreNo?: string | null;
};

const AboutContent = () => {
  const codeRef = useRef<HTMLDivElement>(null);

  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const addItem = useInventoryStore((store) => store.addItem);

  const { data, isLoading } = useAbout();
  const { data: ui } = useUiStrings();
  const about = data as AboutData | undefined;

  useEffect(() => {
    const lore = {
      prompt: about?.lorePrompt ?? "",
      yes: about?.loreYes ?? "",
      no: about?.loreNo ?? "",
    };

    // Console functions for curious visitors.
    window.lore = () => {
      // First call: give achievement + key + note
      if (!hasAchievement("lore_discovered")) {
        addAchievement("lore_discovered");
        addItem("key");
        addItem("note");
      }

      window.yes = () => {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
        return lore.yes;
      };
      window.no = () => lore.no;
      return lore.prompt;
    };

    window.wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  }, [hasAchievement, addAchievement, addItem, about]);

  // the_journey_begins now comes only from yes() in the lore flow

  useEffect(() => {
    if (!hasAchievement("about_face")) {
      addAchievement("about_face");
    }
  }, [addAchievement, hasAchievement]);

  // jewel-about is now unlocked via key on the journey page, not here

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
