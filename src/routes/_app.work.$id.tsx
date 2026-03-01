import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

const CaseStudy = lazy(() => import("~/pages/CaseStudy"));

export const Route = createFileRoute("/_app/work/$id")({
  component: CaseStudyRoute,
});

function CaseStudyRoute() {
  const { id } = Route.useParams();
  return (
    <Suspense fallback={null}>
      <CaseStudy id={id} />
    </Suspense>
  );
}
