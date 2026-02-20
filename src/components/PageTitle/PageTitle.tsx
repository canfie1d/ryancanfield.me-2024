import cn from "classnames";
import { generateUsername } from "unique-username-generator";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAchievementStore } from "~/stores/achievements";
import { useThemeStore } from "~/stores/theme";
import { useWindowSize } from "~/hooks/useWindowSize";
import SettingsPanel from "~/components/SettingsModal";
import IconMenu from "~/components/IconMenu";
import ThemeModal from "~/components/ThemeModal";
import ThemePanel from "~/components/ThemePanel";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import styles from "./PageTitle.module.scss";

const PageTitle = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;

  const themeName = useThemeStore((store) => store.name);
  const username = useAchievementStore((store) => store.username);
  const setUsername = useAchievementStore((store) => store.setUsername);
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
    if (username === "") {
      setUsername(generateUsername("-"));
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

  const renderEditUsernameButton = () => {
    return (
      <Button
        onClick={() => setUsername(generateUsername("-"))}
        variant="transparent"
      >
        <Icon color="" name="pencil" size="x-small" />
      </Button>
    );
  };

  return (
    <>
      {/* @note Inventory Location */}
      {/* {Object.values(activeGameModes).some((mode) => mode) && (
        <IconMenu
          align={pathname !== "/" ? "right" : undefined}
          justify="start"
          actions={[
            {
              icon: "backpack",
              label: "Inventory Items",
              onClick: () => {
                if (!hasAchievement("gatherer")) {
                  addAchievement("gatherer");
                }
              },
            },
          ]}
          reverse={pathname !== "/" && !isSmallScreen}
          vertical
          rotate
        />
      )} */}
      {pathname === "/" ? (
        <main className={styles.pageWrapper}>
          <h1
            className={cn(
              styles.pageTitle,
              themeName === "eryndor" && styles.pageTitleUsername
            )}
          >
            {themeName === "eryndor"
              ? username.replace(/-/g, " ")
              : "ryan canfield"}
            {themeName === "eryndor" && renderEditUsernameButton()}
          </h1>
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
          {themeName === "eryndor" ? (
            <h1 className={cn(styles.pageTitle, styles.pageTitleUsername)}>
              {username.replace(/-/g, " ")}
              {renderEditUsernameButton()}
            </h1>
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
