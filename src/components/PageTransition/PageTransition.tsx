import { ReactNode, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useGetColorsFromTheme } from "~/helpers/getColorsFromTheme";
import type { PageNames } from "~/data/themeConfig";
import styles from "./PageTransition.module.scss";

const FADE_DURATION = 0.18;
const LOADING_DELAY_MS = 200;

export function PageTransition({
  children,
  pageName,
}: {
  children: ReactNode;
  pageName: PageNames;
}) {
  const isTransitioning = useRouterState({
    select: (state) => state.isTransitioning || state.status === "pending",
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { backgroundColor } = useGetColorsFromTheme(pageName);
  const duration = prefersReducedMotion ? 0 : FADE_DURATION;

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setShowOverlay(true), LOADING_DELAY_MS);
      return () => clearTimeout(timer);
    }
    setShowOverlay(false);
  }, [isTransitioning]);

  return (
    <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}>
      {children}
      <motion.div
        className={styles.overlay}
        style={{ backgroundColor }}
        initial={false}
        animate={{
          opacity: showOverlay ? 1 : 0,
          pointerEvents: showOverlay ? "auto" : "none",
        }}
        transition={{ duration, ease: "easeOut" }}
        aria-hidden={!showOverlay}
      >
        <div
          className={styles.skeleton}
          aria-label="Loading page"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={styles.skeletonLine}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
