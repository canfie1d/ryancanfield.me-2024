"use client";

import { useLocation } from "react-router-dom";
import { useWindowSize } from "./useWindowSize";
import { caseStudies } from "../data/caseStudies";

export const useAnimate = () => {
  const { pathname } = useLocation();

  const size = useWindowSize();
  const isSmall = size.width < 769;

  const slide = (pageName: string) => {
    const isCurrent = pathname === `/${pageName}`;
    const isCaseStudy = pageName === "work" && caseStudies.includes(pathname);

    if (pathname === "/") {
      if (isSmall) {
        return { height: "calc(20% - 20px)" };
      }
      return { width: "calc(20% - 20px)" };
    } else if (isCurrent || isCaseStudy) {
      if (isSmall) {
        return { height: "100%" };
      }
      return { width: "100%" };
    } else {
      if (isSmall) {
        return { height: "1%" };
      }
      return { width: "1%" };
    }
  };

  return { slide };
};
