import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useAnimate } from "../hooks/useAnimate";
import PagePreview from "../components/PagePreview";
import PageContent from "../components/PageContent";
import WorkContent from "../content/WorkContent";
import CodeCircle from "../icons/code-circle.svg?react";
import CircleX from "../icons/circle-x.svg?react";
import styles from "../styles/page.module.scss";
import classNames from "classnames";
import { caseStudies } from "../data/caseStudies";

const Work = () => {
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const pageName = "work";
  const isCurrent = pathname === `/${pageName}`;
  const isCaseStudy = caseStudies.includes(pathname);
  const { slide } = useAnimate();
  const caseStudy = pathname.split("/")[2];

  return (
    <motion.div
      key={pageName}
      animate={!prefersReducedMotion && slide(pageName)}
      className={classNames(
        styles.pageWrapper,
        pathname === "/" && styles.pageWrapperHome
      )}
    >
      {isCurrent || isCaseStudy ? (
        <motion.div
          key={pathname}
          initial={!prefersReducedMotion ? { opacity: 0 } : {}}
          animate={!prefersReducedMotion ? { opacity: 1 } : {}}
          exit={!prefersReducedMotion ? { opacity: 0 } : {}}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          <PageContent
            pageName={pageName}
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
                    // icon: <CodeCircle />,
                  }
                : {
                    meta: "②",
                    title: "Work",
                    icon: <CodeCircle />,
                  }
            }
          >
            {isCaseStudy ? <Outlet /> : <WorkContent />}
          </PageContent>
        </motion.div>
      ) : (
        <PagePreview pageName={pageName} />
      )}
    </motion.div>
  );
};

export default Work;
