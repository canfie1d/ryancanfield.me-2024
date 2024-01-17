import { Suspense, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useScroll } from "react-use";
import { caseStudies } from "../data/caseStudies";
import PageContent from "../components/PageContent";
import WorkContent from "../content/WorkContent";
import CodeCircle from "../icons/code-circle.svg?react";
import CircleX from "../icons/circle-x.svg?react";
import Loader from "../components/Loader";

const Work = () => {
  const { scrolled, setScrolled } = usePageScrollContext();

  const ref = useRef(null);
  const { y } = useScroll(ref);
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const isCaseStudy = caseStudies.includes(pathname);
  const caseStudy = pathname.split("/")[2];

  if (ref.current) {
    if ((scrolled === false || scrolled === undefined) && y > 100) {
      setScrolled(true);
    } else if (scrolled === true && y <= 100) {
      setScrolled(false);
    }
  }

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
        ref={ref}
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
  );
};

export default Work;
