import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

const SecretRoute = lazy(() => import("~/pages/SecretRoute"));

export const Route = createFileRoute("/_app/6374")({
  component: () => (
    <Suspense fallback={null}>
      <SecretRoute achievementId="number_cruncher" />
    </Suspense>
  ),
});
