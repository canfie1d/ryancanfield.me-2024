import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

const SecretRoute = lazy(() => import("~/pages/SecretRoute"));

export const Route = createFileRoute("/_app/⓺⓷⓻⓸")({
  component: () => (
    <Suspense fallback={null}>
      <SecretRoute achievementId="circle_around" />
    </Suspense>
  ),
});
