import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const JourneysEnd = lazy(() => import("~/pages/JourneysEnd"));

export const Route = createFileRoute("/_app/journey-to-eryndor")({
  component: JourneysEnd,
});
