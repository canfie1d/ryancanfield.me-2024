"use client";

import { useLocation } from "react-router-dom";
import { useWindowSize } from "./useWindowSize";
import { CASE_STUDIES } from "../data/caseStudies";

export const useAnimate = () => {
  const { pathname } = useLocation();

  const size = useWindowSize();
  const isSmallScreen = size.width <= 768;

  const slide = (pageName: string) => {
    const isCurrent = pathname === `/${pageName}`;
    const caseStudy =
      pageName === "work" &&
      CASE_STUDIES.find((caseStudy) => caseStudy.path === pathname);

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
