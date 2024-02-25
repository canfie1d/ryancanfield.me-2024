import { Link, useLocation } from "react-router-dom";
import { useAchievementContext } from "../../contexts/AchievementProvider";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import SettingsPanel from "../SettingsModal";
import IconMenu from "../IconMenu";
import ThemeModal from "../ThemeModal";
import ThemePanel from "../ThemePanel";
import styles from "./PageTitle.module.scss";

const PageTitle = () => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 768;
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("first_timer")) {
      addAchievement("first_timer");
    }
  }, [loadingAchievements]);

  const renderPageLinks = (rotated?: boolean) => {
    const pageLinks = [];

    pageLinks.push({
      icon: "github",
      label: "Website's Github Profile",
      href: "https://github.com/canfie1d/ryancanfield.me-2024",
      onClick: () => {
        if (!hasAchievement("octocat_abides")) {
          addAchievement("octocat_abides");
        }
      },
    });

    pageLinks.push({
      icon: "linkedin",
      label: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/ryanmcanfield",
      onClick: () => {
        if (!hasAchievement("link_up")) {
          addAchievement("link_up");
        }
      },
    });

    pageLinks.push({
      icon: "palette",
      label: "Themes",
      active: pathname === "/" && !isSmallScreen,
      disabled: pathname === "/" && !isSmallScreen,
      onClick: () => {
        setThemeModalOpen(true);
      },
    });

    !loadingAchievements &&
      hasAchievement("the_journey_begins") &&
      pageLinks.push({
        icon: "gear",
        label: "Settings",
        onClick: () => {
          setSettingsModalOpen(true);
        },
      });

    return (
      <IconMenu
        align={pathname !== "/" ? "right" : undefined}
        justify="start"
        actions={pageLinks}
        iconsRotated={rotated}
      />
    );
  };

  return (
    <>
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
          <Link to="/" className={styles.pageTitle} aria-label="Home">
            ryan canfield
          </Link>
          {renderPageLinks(!isSmallScreen)}
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
