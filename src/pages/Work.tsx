import { Suspense, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useGameModeContext } from "../contexts/GameModeProvider";
import { useGetPageMeta } from "../hooks/getPageMetaData";
import { CASE_STUDIES } from "../data/caseStudies";
import PageContent from "../content/PageContent";
import WorkContent from "../content/WorkContent";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import WorkGameContent from "../content/WorkGameContent";

const Work = () => {
  const metaData = useGetPageMeta("work");
  const { activeGameModes } = useGameModeContext();
  const gameModeActive = activeGameModes?.work;

  const { loadingAchievements, hasAchievement, addAchievement } =
    useAchievementContext();

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("all_work_no_play")) {
      addAchievement("all_work_no_play");
    }
  }, [loadingAchievements]);

  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();

  const caseStudy = CASE_STUDIES.find(
    (caseStudy) => caseStudy.path === pathname
  );

  return (
    <motion.div
      key={pathname}
      initial={!prefersReducedMotion ? { opacity: 0 } : {}}
      animate={!prefersReducedMotion ? { opacity: 1 } : {}}
      exit={!prefersReducedMotion ? { opacity: 0 } : {}}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="h-full"
    >
      <PageContent
        pageName="work"
        header={
          caseStudy
            ? {
                meta: (
                  <Link to="/work">
                    <Icon name="circle-x" />
                    <span className="visually-hidden">Close</span>
                  </Link>
                ),
                title: caseStudy.title,
                subtitle: caseStudy.subtitle,
              }
            : {
                meta: "②",
                title: metaData.title,
                subtitle: metaData.subtitle,
                icon: metaData.icon,
              }
        }
      >
        <Suspense fallback={<Loader />}>
          {caseStudy ? (
            <Outlet />
          ) : gameModeActive ? (
            <WorkGameContent />
          ) : (
            <WorkContent />
          )}
        </Suspense>
      </PageContent>
    </motion.div>
  );
};

export default Work;
