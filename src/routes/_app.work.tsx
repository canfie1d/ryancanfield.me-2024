import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const Work = lazy(() => import("~/pages/Work"));

export const Route = createFileRoute("/_app/work")({
  component: Work,
});
