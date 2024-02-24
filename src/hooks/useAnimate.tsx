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
        return { height: "calc(20% - 20px)" };
      }
      return { width: "calc(20% - 20px)" };
    } else if (isCurrent || caseStudy) {
      if (isSmallScreen) {
        return { height: "100%" };
      }
      return { width: "100%" };
    } else {
      if (isSmallScreen) {
        return { height: "1%" };
      }
      return { width: "1%" };
    }
  };

  return { slide };
};
