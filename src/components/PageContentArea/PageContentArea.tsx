import { ReactNode } from "react";
import { Suspense } from "react";
import { Outlet } from "@tanstack/react-router";
import DelayedFallback from "~/components/DelayedFallback";
import PagePreview from "~/components/Preview/PagePreview";
import { PageTransition } from "~/components/PageTransition/PageTransition";
import type { PageNames } from "~/data/themeConfig";

const PageContentArea = ({ pageName, fallback }: { pageName: PageNames; fallback?: ReactNode }) => {
  return (
    <div
      style={{
        minHeight: "100%",
      }}
    >
      <PageTransition pageName={pageName}>
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <Suspense
            fallback={
              <DelayedFallback>
                {fallback ?? (
                  <PagePreview
                    key={pageName}
                    pageName={pageName}
                    hideAll
                  />
                )}
              </DelayedFallback>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </PageTransition>
    </div>
  );
};

export default PageContentArea;
