import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useUiStrings } from "~/hooks/useSanityContent";
import { useWindowSize } from "~/hooks/useWindowSize";
import SettingsPanel from "~/components/SettingsModal";
import IconMenu from "~/components/IconMenu";
import ThemeModal from "~/components/ThemeModal";
import ThemePanel from "~/components/ThemePanel";
import InventoryModal from "~/components/InventoryModal";
import { useGameModeStore } from "~/stores/game-mode";
import styles from "./PageTitle.module.scss";

const PageTitle = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const { data: ui } = useUiStrings();
  const isSmallScreen = width <= 768;
  const username = "user_name";
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const allGameModesActive = useGameModeStore((store) => store.allGameModesActive);

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);

  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const addItem = useInventoryStore((store) => store.addItem);
  const hasItem = useInventoryStore((store) => store.hasItem);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("first_timer")) {
      addAchievement("first_timer");
    }
  }, [loadingAchievements, hasAchievement, addAchievement]);

  const renderPageLinks = () => {
    const pageLinks = [
      {
        icon: "github",
        label: String(ui?.linkGithub ?? ""),
        href: "https://github.com/canfie1d/ryancanfield.me-2024",
        onClick: () => {
          if (!hasAchievement("octocat_abides")) {
            addAchievement("octocat_abides");
          }
          if (!hasItem("code")) {
            addItem("code");
          }
        },
      },
      {
        icon: "linkedin",
        label: String(ui?.linkLinkedIn ?? ""),
        href: "https://www.linkedin.com/in/ryanmcanfield",
        onClick: () => {
          if (!hasAchievement("link_up")) {
            addAchievement("link_up");
          }
        },
      },
      {
        icon: "spray",
        label: String(ui?.linkThemes ?? ""),
        active: pathname === "/" && !isSmallScreen, // whether the buttons state appears active visually
        disabled: pathname === "/" && !isSmallScreen,
        onClick: () => {
          setThemeModalOpen(true);
        },
      },
      Object.values(activeGameModes).some((mode) => mode) && {
        icon: "backpack",
        label: String(ui?.linkInventory ?? ""),
        onClick: () => {
          if (!loadingAchievements && !hasAchievement("gatherer")) {
            addAchievement("gatherer");
          }
          setInventoryModalOpen(true);
        },
      },
    ].filter((link) => typeof link === "object" && link !== null);

    if (!loadingAchievements && hasAchievement("the_journey_begins")) {
      pageLinks.push({
        icon: "gamepad",
        label: String(ui?.linkSettings ?? ""),
        active: false, // whether the buttons state appears active visually
        disabled: false,
        onClick: () => {
          setSettingsModalOpen(true);
        },
      });
    }

    return (
      <IconMenu
        align={pathname !== "/" ? "right" : undefined}
        justify="start"
        actions={pageLinks}
        reverse={pathname !== "/" && !isSmallScreen}
      />
    );
  };

  return (
    <>
      {/* {Object.values(activeGameModes).some((mode) => mode) && (
        <IconMenu
          align={pathname !== "/" ? "right" : undefined}
          justify="center"
          actions={[
            {
              icon: "backpack",
              label: "Inventory",
              onClick: () => {
                if (!loadingAchievements && !hasAchievement("gatherer")) {
                  addAchievement("gatherer");
                }
                setInventoryModalOpen(true);
              },
            },
          ]}
          reverse={pathname !== "/" && !isSmallScreen}
        />
      )} */}
      <InventoryModal
        open={inventoryModalOpen}
        handleCloseClick={() => setInventoryModalOpen(false)}
      />
      {pathname === "/" ?
        <main className={styles.pageWrapper}>
          <h1 className={styles.pageTitle}>{ui?.siteName ?? ""}</h1>
          {renderPageLinks()}
          {isSmallScreen ?
            <ThemeModal
              open={themeModalOpen}
              handleCloseClick={() => setThemeModalOpen(false)}
            />
          : <ThemePanel />}
        </main>
      : <header className={styles.pageHeader}>
          {/*
            @todo when in game mode, use username,
            allow for username to be changed with
            a tiny pencil icon
          */}
          {allGameModesActive ?
            <h1 className={styles.pageTitle}>{username}</h1>
          : <Link
              to="/"
              className={styles.pageTitle}
              aria-label={ui?.ariaHome ?? ""}
            >
              {ui?.siteName ?? ""}
            </Link>
          }
          {renderPageLinks()}
          <ThemeModal
            open={themeModalOpen}
            handleCloseClick={() => setThemeModalOpen(false)}
          />
        </header>
      }
      {!loadingAchievements && hasAchievement("the_journey_begins") && (
        <SettingsPanel
          open={settingsModalOpen}
          handleCloseClick={() => setSettingsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PageTitle;
