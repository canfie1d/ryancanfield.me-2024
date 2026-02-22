"use client";

import { useLocation } from "@tanstack/react-router";
import { useWindowSize } from "~/hooks/useWindowSize";
import { useCaseStudies } from "~/hooks/useSanityContent";

export const useAnimate = () => {
  const { pathname } = useLocation();
  const { data: caseStudies } = useCaseStudies();
  const caseStudyPaths = caseStudies?.map((c) => `/work/${c.id}`) ?? [];

  const size = useWindowSize();
  const isSmallScreen = size.width <= 768;

  const slide = (pageName: string) => {
    const isCurrent = pathname === `/${pageName}`;
    const caseStudy = pageName === "work" && caseStudyPaths.includes(pathname);

    if (pathname === "/") {
      if (isSmallScreen) {
        return { height: "20%" };
      }
      return { width: "calc(20% - 24px)" };
    } else if (isCurrent || caseStudy) {
      if (isSmallScreen) {
        return { height: "100%" };
      }
      return { width: "100%" };
    } else {
      if (isSmallScreen) {
        return { width: "100%" };
      }
      return { height: "100%" };
    }
  };

  return { slide };
};
