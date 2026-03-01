import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const About = lazy(() => import("~/pages/About"));

export const Route = createFileRoute("/_app/about")({
  component: About,
});
