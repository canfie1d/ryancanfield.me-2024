import { ReactNode } from "react";
import { Suspense } from "react";
import { Outlet } from "@tanstack/react-router";
import PagePreview from "~/components/Preview/PagePreview";
import type { PageNames } from "~/data/themeConfig";

const PageContentArea = ({ pageName, fallback }: { pageName: PageNames; fallback?: ReactNode }) => {
  return (
    <div
      style={{
        minHeight: "100%",
      }}
    >
      <Suspense
        fallback={
          fallback ?? (
            <PagePreview
              key={pageName}
              pageName={pageName}
              hideAll
            />
          )
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PageContentArea;
