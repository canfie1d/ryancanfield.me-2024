import { Suspense, useEffect } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  useCaseStudies,
  usePageContent,
  useProjects,
  useUiStrings,
} from "~/hooks/useSanityContent";
import { useAchievementStore } from "~/stores/achievements";
import { useGameModeStore } from "~/stores/game-mode";
import { usePageMeta } from "~/hooks/usePageMeta";
import PageContent from "~/content/PageContent";
import WorkContent from "~/content/WorkContent";
import WorkGameContent from "~/content/WorkGameContent";
import Icon from "~/components/Icon";
import Loader from "~/components/Loader";

const Work = () => {
  const { data: ui } = useUiStrings();
  const metaData = usePageMeta("work");
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive = activeGameModes?.work;

  const loadingAchievements = useAchievementStore((store) => store.loadingAchievements);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!loadingAchievements && !hasAchievement("all_work_no_play")) {
      addAchievement("all_work_no_play");
    }
  }, [loadingAchievements, addAchievement, hasAchievement]);

  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();

  const { data: caseStudies } = useCaseStudies();
  const { isLoading: pageContentLoading } = usePageContent("work");
  const { isLoading: projectsLoading } = useProjects();
  const { isLoading: caseStudiesLoading } = useCaseStudies();

  const caseStudy = caseStudies?.find((caseStudy) => `/work/${caseStudy.id}` === pathname);
  const isCaseStudyView = pathname.startsWith("/work/") && pathname !== "/work";
  const contentLoading =
    isCaseStudyView ? caseStudiesLoading : pageContentLoading || projectsLoading;

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
          caseStudy ?
            {
              meta: (
                <Link to="/work">
                  <Icon name="circle-x" />
                  <span className="visually-hidden">{ui?.ariaClose ?? ""}</span>
                </Link>
              ),
              title: caseStudy.title ?? "",
              subtitle: caseStudy.subtitle ?? "",
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
          {contentLoading ?
            <Loader />
          : caseStudy ?
            <Outlet />
          : gameModeActive ?
            <WorkGameContent />
          : <WorkContent />}
        </Suspense>
      </PageContent>
    </motion.div>
  );
};

export default Work;
