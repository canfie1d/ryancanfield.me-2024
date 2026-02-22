import { Suspense, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const StudioPage = lazy(() => import("~/pages/Studio"));

export const Route = createFileRoute("/studio/$")({
  component: StudioRoute,
});

function StudioRoute() {
  return (
    <Suspense fallback={null}>
      <StudioPage />
    </Suspense>
  );
}
