import { createFileRoute } from "@tanstack/react-router";
import CaseStudy from "~/pages/CaseStudy";

export const Route = createFileRoute("/_app/work/$id")({
  component: CaseStudyRoute,
});

function CaseStudyRoute() {
  const { id } = Route.useParams();
  return <CaseStudy id={id} />;
}
