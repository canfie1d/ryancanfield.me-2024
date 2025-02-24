import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAchievementStore } from "~/stores/achievements";
import { useWindowSize } from "~/hooks/useWindowSize";
import SettingsPanel from "~/components/SettingsModal";
import IconMenu from "~/components/IconMenu";
import ThemeModal from "~/components/ThemeModal";
import ThemePanel from "~/components/ThemePanel";
import styles from "./PageTitle.module.scss";
import { useGameModeStore } from "~/stores/game-mode";

const PageTitle = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;

  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const allGameModesActive = useGameModeStore(
    (store) => store.allGameModesActive
  );

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  const loadingAchievements = useAchievementStore(
    (store) => store.loadingAchievements
  );
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("first_timer")) {
      addAchievement("first_timer");
    }
  }, [loadingAchievements, hasAchievement, addAchievement]);

  const renderPageLinks = () => {
    const pageLinks = [
      {
        icon: "github",
        label: "Website's Github Profile",
        href: "https://github.com/canfie1d/ryancanfield.me-2024",
        onClick: () => {
          if (!hasAchievement("octocat_abides")) {
            addAchievement("octocat_abides");
          }
        },
      },
      {
        icon: "linkedin",
        label: "LinkedIn Profile",
        href: "https://www.linkedin.com/in/ryanmcanfield",
        onClick: () => {
          if (!hasAchievement("link_up")) {
            addAchievement("link_up");
          }
        },
      },
      {
        icon: "spray",
        label: "Themes",
        active: pathname === "/" && !isSmallScreen, // whether the buttons state appears active visually
        disabled: pathname === "/" && !isSmallScreen,
        onClick: () => {
          setThemeModalOpen(true);
        },
      },
    ];

    if (!loadingAchievements && hasAchievement("the_journey_begins")) {
      pageLinks.push({
        icon: "gamepad",
        label: "Settings",
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
      {/* @note Inventory Location */}
      {Object.values(activeGameModes).some((mode) => mode) && (
        <IconMenu
          align={pathname !== "/" ? "right" : undefined}
          justify="start"
          actions={[
            {
              icon: "github",
              label: "Inventory Item",
              onClick: () => {
                if (!hasAchievement("inventory")) {
                  addAchievement("inventory");
                }
              },
            },
          ]}
          reverse={pathname !== "/" && !isSmallScreen}
        />
      )}
      {pathname === "/" ? (
        <main className={styles.pageWrapper}>
          <h1 className={styles.pageTitle}>ryan canfield</h1>
          {renderPageLinks()}
          {isSmallScreen ? (
            <ThemeModal
              open={themeModalOpen}
              handleCloseClick={() => setThemeModalOpen(false)}
            />
          ) : (
            <ThemePanel />
          )}
        </main>
      ) : (
        <header className={styles.pageHeader}>
          {/*
            @todo when in game mode, use username,
            allow for username to be changed with
            a tiny pencil icon
          */}
          {allGameModesActive ? (
            <h1 className={styles.pageTitle}>user_name</h1>
          ) : (
            <Link to="/" className={styles.pageTitle} aria-label="Home">
              ryan canfield
            </Link>
          )}
          {renderPageLinks()}
          <ThemeModal
            open={themeModalOpen}
            handleCloseClick={() => setThemeModalOpen(false)}
          />
        </header>
      )}
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
