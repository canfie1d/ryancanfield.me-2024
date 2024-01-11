import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import PageContent from "../components/PageContent";
import WorkContent from "../content/WorkContent";
import CodeCircle from "../icons/code-circle.svg?react";
import CircleX from "../icons/circle-x.svg?react";
import { caseStudies } from "../data/caseStudies";
import { Suspense } from "react";
import Loader from "../components/Loader";

const WorkCurrent = () => {
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const isCaseStudy = caseStudies.includes(pathname);
  const caseStudy = pathname.split("/")[2];

  return (
    <>
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
            isCaseStudy
              ? {
                  meta: (
                    <Link to="/work">
                      <CircleX />
                      <span className="sr-only">Close</span>
                    </Link>
                  ),
                  title: caseStudy,
                }
              : {
                  meta: "②",
                  title: "Work",
                  icon: <CodeCircle />,
                }
          }
        >
          <Suspense fallback={<Loader />}>
            {isCaseStudy ? <Outlet /> : <WorkContent />}
          </Suspense>
        </PageContent>
      </motion.div>
    </>
  );
};

export default WorkCurrent;
